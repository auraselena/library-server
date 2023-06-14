const db = require("../../models/index");
const users = db.users;
const bcrypt = require("bcrypt");

module.exports = {
  signUp: async (req, res) => {
    try {
      const { email } = req.body;

      const findEmail = await users.findAll({
        where: { email },
        raw: true,
      });
      console.log("findEmail", findEmail);

      if (findEmail.length > 0) {
        return res.status(403).send({
          success: false,
          message: "E-mail address has been used. Please use another email.",
        });
      } else {
        const userData = await users.create({ email });
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
