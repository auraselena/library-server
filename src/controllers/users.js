const db = require("../../models/index");
const users = db.users;
const bcrypt = require("bcrypt");
const handlebars = require("handlebars");
const fs = require("fs").promises;
const transporter = require("../../config/nodemailer");
const { createToken } = require("../../config/encript");

module.exports = {
  signUp: async (req, res) => {
    try {
      const { email } = req.body;

      const findEmail = await users.findAll({
        where: { email },
        raw: true,
      });

      if (findEmail.length > 0) {
        return res.status(403).send({
          success: false,
          message: "E-mail address has been used.",
        });
      } else {
        const userData = await users.create({ email });

        const template = await fs.readFile("./src/template/sign-up.html", "utf-8");

        const compiledTemplate = handlebars.compile(template);
        const signUpTemplate = compiledTemplate({
          registrationLink: `http://localhost:8000/users/verify`,
          email,
          token: createToken({ id: userData.id }),
        });

        await transporter.sendMail({
          from: `LEXICON <"sasageyawn@gmail.com">`,
          to: email,
          subject: "Confirm Your E-mail Address",
          html: signUpTemplate,
        });

        return res.send({
          success: true,
          message: "Account created.",
          data: userData,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Something is wrong.",
      });
    }
  },
  //   signIn: async (req, res) => {
  //     try {
  //     let { email, password } = req.body;
  //       let data = await users.findOne({
  //         where: { email },
  //         raw: true,
  //       });
  //     //   console.log("data", data);

  //       if (!data) {
  //         res.status(406).send({
  //           success: false,
  //           message: "E-mail not found.",
  //         });
  //       } else {
  //         let checkPassword = bcrypt.compareSync(password, data.password);
  //         if (checkPassword) {
  //           let token = createToken({ ...data });
  //           console.log("token", token);
  //           return res.send({
  //             success: "True",
  //             data,
  //           });
  //         } else {
  //           return res.status(200).send({
  //             success: false,
  //             message: "Password incorrect.",
  //           });
  //         }
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       return res.status(500).send(error);
  //     }
  //   },
};
