const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json());

app.listen(PORT, (error) => {
    if(error){
        console.log(`Error`);
    } else {
        console.log(`API is running on port ${PORT}`);
    }
})