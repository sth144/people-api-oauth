import * as https from "https";
import * as request from "request";
import * as express from "express";
import { API_URL, AUTH_REDIRECT_URL, CLIENT_ID, APP_URL, CLIENT_SECRET } from "./constants";
import { IPersonInfo } from "./interface";

/**
 * controller which handles endpoints for the oauth app
 */
export class OauthController {
    /**
     * singleton instance
     */
    private static _instance: OauthController;
    private token: string;

    public static get Instance(): OauthController {
        if (!this._instance) this._instance = new OauthController();
        return this._instance;
    }

    private state: string;

    private constructor() { }

    /**
     * homepage endpoint
     */
    public getHome = async (req, res) => {
        res.render("home");
    }

    /**
     * consent endpoint
     *  - generate and store state
     *  - redirect user to google consent screen
     */
    public getConsent = async (req, res) => {
        this.state = Math.random().toString(32).substring(2,10);
        res.redirect(
            `${AUTH_REDIRECT_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${APP_URL}/token&scope=email+profile&state=${this.state}`);
    }

    /**
     * token endpoint
     *  - exchange access code for token
     */
    public getToken = async (req, res) => {
        /** ensure states match */
        if (req.query.state == this.state) {
            const fetchTokenRequest = {
                "code": req.query.code,
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "redirect_uri": `${APP_URL}/token`,
                "grant_type": "authorization_code",
            }
            /** post to google apis endpoint to retrieve token */
            request.post({
                url: `https://www.googleapis.com/oauth2/v4/token`,
                formData: fetchTokenRequest
            }, (err, reply, body) => {
                if (err) {
                    res.status(500).end();
                } else {
                    /** grab the token and redirect to info page */
                    this.token = JSON.parse(body).access_token;
                    res.redirect("info");
                }
            });
        } else {
            res.status(500).end();
        }
    }

    /**
     * info endpoint, use token to retrieve info from Google People API
     *  - render user firstname and last name
     */
    public getInfo = async (req, res) => {
        request.get({
            url: API_URL,
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        }, (err, reply, body) => {
            const person = JSON.parse(body);
            const context: Partial<IPersonInfo> = {};
            context.firstname = person.names[0].givenName;
            context.lastname = person.names[0].familyName;
            context.state = this.state;
            res.render("info", context);
        });
    }
}

export const router: express.Router = express.Router();

/**
 * routing
 */
router.get("/", OauthController.Instance.getHome);
router.get("/consent", OauthController.Instance.getConsent);
router.get("/token", OauthController.Instance.getToken);
router.get("/info", OauthController.Instance.getInfo);