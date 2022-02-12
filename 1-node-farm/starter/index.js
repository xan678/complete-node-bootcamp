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

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    console.log(req.url);
    const pathName = req.url;

    if (pathName === '/overview' || pathName === '/') {
        res.end('This the overview');
    } else if (pathName === '/product') {
        res.end('This is the product');
    } else if (pathName === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);
    }
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