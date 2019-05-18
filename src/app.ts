import * as express from "express";
import * as handlebars from "express-handlebars";
import * as bodyParser from "body-parser";
import { router } from "@base/oauth-controller";

/**
 * main class which wraps the Express App object
 */
export class App {
    private _app: express.App;

    constructor() { 
        /**
         * instantiate App
         */
        this._app = express();
        this._app.enable('trust proxy');
        const hbs = handlebars.create({ defaultLayout: "main" });        

        /**
         * configure bodyParser and handlebars
         */
        this._app.use(bodyParser.json());
        this._app.use("/", router);
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({extended: false}));
        this._app.set("port", (process.env.PORT || 8080));
        this._app.engine("handlebars", hbs.engine);
        this._app.set("view engine", "handlebars");
    }    

    /**
     * start app listening on port
     */
    public async start(): Promise<any> {
        const PORT = process.env.PORT || 8080;
        this._app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
            console.log(`Press Ctrl+C to quit`);
        });
    }
}