const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { urlencoded } = require("body-parser");
const mailchimp = require('@mailchimp/mailchimp_marketing');
const { response } = require("express");
const PORT = process.env.PORT || 3000;

mailchimp.setConfig({

    apiKey : "9f22b136b2cd256d6240b73e6fc8169e-us21",
    server : "us21"
})

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "//signup.html");
   // res.send();
});

app.post('/', (req, res) => {
    var firstName = req.body.fName;
    var lname = req.body.lName;
    var email = req.body.email;
    const listId = 'd15a0924f0';

    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lname
            }
        });
        console.log(`Sucess ${response.id}.`);
    }

    run();
});



app.listen(PORT, function () {
    console.log("server up");
});

//list_id
//d15a0924f0

