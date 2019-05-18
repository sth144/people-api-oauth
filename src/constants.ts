/**
 * constants used in the application
 */

export const API_URL: string = "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses";
export const AUTH_REDIRECT_URL: string = "https://accounts.google.com/o/oauth2/v2/auth"; 
export let APP_URL: string;
if (process.env.GOOGLE_CLOUD_PROJECT == "hindss-assign6") {
    APP_URL = "https://hindss-assign6.appspot.com";
} else {
    APP_URL = "https://localhost:8080" 
}
/**
 * normally these would be stored in environment, but there is no particular security concern with this app
 */
export const CLIENT_ID: string = "663515894259-va2afmv42ejal2iaqq7hoqoi32669r8r.apps.googleusercontent.com";
export const CLIENT_SECRET: string = "dup82UXi4un2z9VnfaBQ1LzB";