const EventEmitter = require('events');

const myEmitter = new EventEmitter();

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

