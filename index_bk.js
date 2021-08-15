const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const express = require('express');
const router = express.Router();
const app = express();
app.use(express.static('.'));

router.get('/', function (request, response, next) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    console.log(_url);
    console.log(queryData);
    console.log(pathname);
    if(pathname === '/'){
        console.log('in');
        // fs.readFile('./public/index.html', 'utf8', function(err, HTML){
        //     response.writeHead(200);
        //     response.end(HTML);
        // })
        response.render("public/index")
    }
});
//  app.listen(3000);