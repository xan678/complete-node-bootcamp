
const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();

setTimeout(() => console.log('Timer 1 Finished'), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile('test-file.txt', ()=> {
    console.log('I/O finished');
    console.log('________________________________________________');

    setTimeout(() => console.log('Timer 1 Finished'), 0);
    setTimeout(() => console.log('Timer 2 Finished'), 3000);
    setImmediate(() => console.log("Immediate 1 finished"));

    process.nextTick(()=>console.log('Process next tick'));

    crypto.pbkdf2('password', 'salt', 100000, 1024,'sha512',() => {
        console.log(Date.now() - start,"Password encrypted");
    })
})

console.log('Hellow from the top level code');