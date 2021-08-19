import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { LowSync, JSONFileSync } from "lowdb";
import lodash from 'lodash'
import fs from 'fs';
import url from 'url';
import qs from 'querystring';
import express from 'express';
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json')
const adapter = new JSONFileSync(file)
const db = new LowSync(adapter)

app.set('view engine','ejs');
app.set('views',__dirname);
app.use(express.static('.'));

app.get('/', function (request, response) {
    db.read();
    db.chain = lodash.chain(db.data);
    var visitors = db.chain.get('visitors').value();
    var players = db.chain.get('players').value();
    console.log(players);
    var _url = request.url;
    var pathname = url.parse(_url, true).pathname;
    response.render('./public/index.ejs',{'players': players, mostClass: '레인저', mostclassImg:'/img/02_레인저.jpg'});
});
app.get('/test', function (request, response) {
    var _url = request.url;
    var pathname = url.parse(_url, true).pathname;
    response.render('./public/find_page.ejs')
});
app.get('/result', function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
});

app.post('/result', function (request, response) {

    response.writeHead(200);
    response.end();
});
app.listen(3000);