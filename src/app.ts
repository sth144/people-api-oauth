import * as express from "express";
import * as handlebars from "express-handlebars";
import * as bodyParser from "body-parser";
import { router } from "@base/oauth-controller";

export class App {
    private _app: express.App;

    constructor() { 
        this._app = express();
        this._app.enable('trust proxy');
        const hbs = handlebars.create({ defaultLayout: "main" });        

        this._app.use(bodyParser.json());
        this._app.use("/", router);
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({extended: false}));
        this._app.set("port", (process.env.PORT || 8080));
        this._app.engine("handlebars", hbs.engine);
        this._app.set("view engine", "handlebars");
    }    

    public async start(): Promise<any> {
        const PORT = process.env.PORT || 8080;
        this._app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
            console.log(`Press Ctrl+C to quit`);
        });
    }
}