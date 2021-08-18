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

app.use(express.static('.'));

app.get('/', function (request, response) {
    db.read();
    db.chain = lodash.chain(db.data);
    var visitors = db.chain.get('visitors').value();
    var _url = request.url;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
        fs.readFile('./public/index.html', 'utf8', function(err, HTML){
            response.writeHead(200);
            response.end(HTML);
        })
    } else {
        response.writeHeadg(404);
        response.end('Not found');
    }
});
app.get('/test', function (request, response) {
    var _url = request.url;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/test'){
        fs.readFile('./public/find_page.html', 'utf8', function(err, HTML){
            response.writeHead(200);
            response.end(HTML);
        })
    } else {
        response.writeHeadg(404);
        response.end('Not found');
    }
});
app.get('/result', function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/result'){
        fs.readFile('./public/result_page.html', 'utf8', function(err, HTML){
            response.writeHead(200);
            response.end(HTML);
        })
    } else {
        response.writeHeadg(404);
        response.end('Not found');
    }
});
app.get('/result', function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/result'){
        fs.readFile('./public/result_page.html', 'utf8', function(err, HTML){
            response.writeHead(200);
            response.end(HTML);
        })
    } else {
        response.writeHeadg(404);
        response.end('Not found');
    }
});
app.post('/result', function (request, response) {

    response.writeHead(200);
    response.end();
});
app.listen(3000);