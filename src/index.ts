// TODO: A page that has a link a user clicks to visit the Google 
//      OAuth 2.0 endpoint

// TODO: A page that handles the user getting redirect back to your 
//      website from Google's endpoint and handles the exchanging 
//      of the access code for a token

// TODO: A page (which could use the same handler as the page they 
//      were redirected to) which uses that token to access and 
//      display  the following information: The users first and 
//      last name. It should also print out the value of the state 
//      variable that was used to secure the original redirect.
//       - The only scope you are allowed to request is "profile email". 
//         If your application requests additional permissions beyond 
//         that, we are not going to give them to you and your 
//         assignment will not be graded. 

// TODO: You should implement a randomly generated state variable 
//      and display it along with the users name. This state variable 
//      must change when we run it multiple times.

// TODO: You should also make sure to include a description of your 
//      project on both the initial page and the page users are 
//      redirect to explaining the purpose of the page and that it 
//      will display their name.

require("module-alias/register");
// TODO: can I use dotenv on gcloud?
const config = require("dotenv").config();

import * as express from "express";
import * as handlebars from "express-handlebars";
import * as bodyParser from "body-parser";

// TODO: determine urls
const url: string = "";
const url_redirected: string = ""; 
// TODO: determine how to set client id
const client_id: string = "";
// TODO: determine how to set state
const state: string = "";
// TODO: determine what scope should be
const scope: string = "email";

const app = express();
const hbs = handlebars.create({ defaultLayout: "main" });

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("port", (process.env.PORT || 8080));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.listen(app.get("port"), () => {
    console.log("App is listening on port", app.get("port"));
});

// TODO: implement controller 
app.get("/", (req, res) => {
    res.render("index", res);
});
