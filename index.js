const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
app.use(express.static('.'));
app.use(favicon(path.join(__dirname, 'img', 'favicon.ico')))

app.get('/', function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    console.log(_url);
    console.log(queryData);
    console.log(pathname);
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
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    console.log(_url);
    console.log(queryData);
    console.log(pathname);
    if(pathname === '/test'){
        fs.readFile('./public/find.html', 'utf8', function(err, HTML){
            response.writeHead(200);
            response.end(HTML);
        })
    } else {
        response.writeHeadg(404);
        response.end('Not found');
    }
});
 app.listen(3000);