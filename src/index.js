import express from 'express';
import {ParseServer} from 'parse-server';
import ParseDashboard from 'parse-dashboard'


const dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": process.env.PARSE_SERVER_URL,
            "appId": process.env.PARSE_APP_ID,
            "masterKey": process.env.PARSE_MASTER_KEY,
            "appName": process.env.PARSE_APP_NAME
        }
    ],
    "users": [
        {
            "user": process.env.PARSE_DASHBOARD_USER,
            "pass": process.env.PARSE_DASHBOARD_PASSWORD
        }
    ],
    "useEncryptedPasswords": true
},{ allowInsecureHTTP: true });

const api = new ParseServer({
    databaseURI: process.env.PARSE_MONGO_URL,
    appId: process.env.PARSE_APP_ID,
    masterKey: process.env.PARSE_MASTER_KEY,
    fileKey: process.env.PARSE_FILE_KEY,
    serverURL: process.env.PARSE_SERVER_URL,
    cloud: __dirname + '/cloud/main.js'
});

const app = express();

app.use('/api', api);
app.use('/dash', dashboard);

app.use(express.static(__dirname+'/public'));

app.listen(process.env.PORT, function () {
    console.log('parse-server-example running on port ' + process.env.PORT);
});