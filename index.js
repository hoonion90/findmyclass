import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { LowSync, JSONFileSync } from "lowdb";
import _ from 'lodash';
import url from 'url';
import express from 'express';
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');
const adapter = new JSONFileSync(file);
const db = new LowSync(adapter);
db.read();
db.chain = _.chain(db.data);
app.set('view engine','ejs');
app.set('views',__dirname);
app.use(express.static('.'));

app.get('/', function (request, response) {
    let visitors = db.chain.get('visitors').value();
    let players = db.chain.get('players').value();
    let hashClass = db.chain.get('class_count').value();
    let max = Object.keys(hashClass).reduce((a, v) => Math.max(a, hashClass[v]), -Infinity);
    let maxClass = Object.keys(hashClass).filter(v => hashClass[v] === max);
    let maxClassImg = _.get(db.chain.get('class_img').value(),maxClass[0]);
    let maxClassName = _.get(db.chain.get('class_name').value(),maxClass[0]);
    db.chain.update('visitors', n => n + 1).value();
    db.write();
    console.log(visitors);
    response.render('./public/index.ejs',{'players': numberWithCommas(players), mostClass: maxClassName, mostClassImg: maxClassImg});
});
app.get('/test', function (request, response) {
    response.render('./public/find_page.ejs')
});
app.get('/result', function (request, response) {
    let _url = request.url;
    let queryData = url.parse(_url, true).query;
    let resultClass = queryData.c;
    let resultObj = db.chain.get('result').value();
    let result = _.get(resultObj, resultClass);
    let className = _.get(db.chain.get('class_name').value(), resultClass);
    let classImg = _.get(db.chain.get('class_img').value(), resultClass);
    response.render('./public/result_page.ejs',{className: className, classImg: classImg ,resultmsg: result});
});

app.post('/result', function (request, response) {
    let _url = request.url;
    let queryData = url.parse(_url, true).query;
    response.writeHead(200);
    response.end();
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

app.listen(3000);
//const PORT = process.env.PORT;
// app.listen(PORT);