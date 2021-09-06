const express = require("express");
const cors = require("cors");
const Axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/compile", (req, res) => {
    var code = req.body.code;
    var language = req.body.language;
    var input = req.body.input;

    if (language === "python") {
        language="py"
    }

    var data = ({
        "code": code,
        "language": language,
        "input": input
    });
    var config = {
        method: 'post',
        url: 'https://codexweb.netlify.app/.netlify/functions/enforceCode',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    Axios(config)
        .then((response)=>{
            res.send(response.data)
            console.log(response.data)
        }).catch((error)=>{
            console.log(error);
        });
})

app.listen(8000, () => {
    console.log("Server started at port 8000");
});
