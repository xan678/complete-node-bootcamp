// const hello = "Hello World!";
// console.log(hello);

//---------------------------------------------------------------------------------------------------//

//Synchronous
// const fs = require('fs');
// const textIn = fs.readFileSync('./txt/input.txt','utf-8');

// console.log(textIn);

// const textOut = `This is what we know about the avacados: ${textIn}.\n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);

// console.log('File has been written!');

//---------------------------------------------------------------------------------------------------//

//Asynchronous
// const fs = require('fs');

// fs.readFile('./txt/start.txt','utf-8', (err, data1) =>{
//     fs.readFile(`./txt/${data1}.txt`,'utf-8', (err, data2) =>{
//         //console.log(data2);
//         fs.readFile('./txt/append.txt','utf-8', (err, data3) =>{
//             //console.log(data3);
//             fs.writeFile("./txt/final.txt",`${data2}\n${data3}` ,'utf-8', err => {
//                 console.log("File has been written")
//             })
//         })
//     })
// });
// console.log('Reading file');

//--------------------------------------------------------------------------------------------------//

//Server
// const http = require('http');
// const server = http.createServer((req, res)=>{
//     res.end('Hello from the server!!');
// })

// server.listen(8000,()=>{
//     console.log('Listening to the server');
// })

//---------------------------------------------------------------------------------------------------//

//Routing

const http = require('http');
const url = require('url');
const fs = require('fs');
const replaceTemplate =  require('./modules/replaceTemplate');

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
const dataObj = JSON.parse(data);



const server = http.createServer((req, res) => {

    const { query, pathname } = url.parse(req.url, true);

    console.log(req.url);
    //const pathName = req.url;

    //overview page
    if (pathname === '/overview' || pathname === '/') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        const cardsHTML = dataObj.map(el => replaceTemplate(templateCard, el)).join('');
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHTML);
        //console.log(cardsHTML);
        res.end(output);
    }

    //product page 
    else if (pathname === '/product') {
        console.log(query);
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const product = dataObj[query.id];

        const output = replaceTemplate(templateProduct, product);
        res.end(output);
    }

    //api
    else if (pathname === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);
    }

    //not found
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'madeupheader': 'Hello world'
        });
        res.end("<h1>Page was not found</h1>");
    }
});

server.listen(8000, () => {
    console.log('Listening to the server');
});