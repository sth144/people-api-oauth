// TODO: implement routes
import * as express from "express";

export class OauthController {

    constructor() { }

    public static getTest = async (req, res) => {
        const context = {
            hey: "hi"
        }
        res.render("index", context);
    }
}

export const router: express.Router = express.Router();

router.use("/", OauthController.getTest);