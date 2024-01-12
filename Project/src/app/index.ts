import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { routesConfig } from './users/routes-config';



admin.initializeApp();

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true }));
routesConfig(app)

const uid = 'user-uid';

export const api = functions.https.onRequest(app);
export const Register = functions.auth.user().onCreate((user) => {
    const customClaims = {
        "id": user.uid,
        "userType" : "Patient"
    }
    return admin.auth().setCustomUserClaims(user.uid, customClaims);
})
