// TODO: implement routes
import * as express from "express";
import { API_URL } from "./constants";

export class OauthController {
    private static _instance: OauthController;

    public static get Instance(): OauthController {
        if (!this._instance) this._instance = new OauthController();
        return this._instance;
    }

    private state: string;

    private constructor() { }

    public getHome = async (req, res) => {
        const context = {
            api_url: API_URL
        }
        res.render("index", context);
    }

    public getConsent = async (req, res) => {
        this.state = Math.random().toString(32).substring(2,10);
        // TODO: where to redirect?
        res.redirect()
    }

    public getToken = async (req, res) => {
        // TODO: check state
        //  - if matches, success
        //      TODO: fetch access token from google API
        //          TODO: redirect to getTokenSuccess
        //            - or send back status 500 if fail
        //  - if doesn't match, send back status 500
    }

    public getInfo = async (req, res) => {
        // TODO: form a request for Google People API
        // TODO: get response, render page with info
    }
}

export const router: express.Router = express.Router();

router.get("/", OauthController.Instance.getHome);
router.get("/consent", OauthController.Instance.getConsent);
router.get("/token", OauthController.Instance.getToken);
router.get("/info", OauthController.Instance.getInfo)