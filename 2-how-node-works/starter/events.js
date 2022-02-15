const EventEmitter = require('events');
const http = require('http');
const { serialize } = require('v8');
class Sales extends EventEmitter {
    constructor(){
        super();
    }
}

const myEmitter = new Sales();

//Observers that have subscribed to the event and are listening to them
myEmitter.on('newSale',() => {
    console.log('New Sale is live biatch!');
});

myEmitter.on('newSale', ()=> {
    console.log('Customer name is Ankush Ojha');
})

myEmitter.on('newStock', stock => {
    console.log(`The amount of new stock received is ${stock}`);
})

//emits an events
myEmitter.emit('newSale');

myEmitter.emit('newStock', 9)

/////////////////////////////////////////////////////////////////////////////

const server = http.createServer();

server.on('request', (req, res) => {
    console.log('Request recieved');
    console.log(req.url);
    res.end('Request received');
});

server.on('request', (req, res) => {
    console.log('Another request');
});

server.on('close', ()=> {
    console.log('Server is closed');
})

server.listen(80, ()=> {
    console.log('Waiting for request');
});