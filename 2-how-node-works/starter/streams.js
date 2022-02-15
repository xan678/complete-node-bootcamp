const fs = require('fs');
const server = require('http').createServer();


server.on('request', (req, res) => {
    // Solution 1
    // fs.readFile('test-file.txt', (err, data) => {
    //     if(err) console.log(err);
    //     res.end(data);
    // });

    //Solution 2 : Streams
    // const readalbe = fs.createReadStream('test-file.txt');

    // readalbe.on('data', chunk => {
    //     res.write(chunk);
    // });

    // readalbe.on('end', () => {
    //     res.end();
    // });

    // readalbe.on('error', err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end('File not found');
    // })

    //Solution 3
    //Solves the problem of back pressure
    const readalbe = fs.createReadStream('test-file.txt');
    readalbe.pipe(res);

});



server.listen(80, () => {
    console.log('Listening...');
})