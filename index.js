const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const express = require('express');
const app = express();
app.use(express.static('.'));

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
}); app.listen(3000);