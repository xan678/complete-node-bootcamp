const fs = require('fs');
const superagent = require('superagent');

//Custom Promise
const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) =>{
            if(err) reject('I could not find that file. Biatch!!!!');
            resolve(data);
        });
    });
}

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err=>{
            if(err) reject('Could not write a file');
            resolve('sucess');
        });
    });
};

//call backs inside of callbacks inside of callbacks : Welcome to Callback Hell!!!!!

// fs.readFile(`${__dirname}/dog.txt`, (err,data) => {
//     console.log(`Breed : ${data}`);

//     superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//         .end((err, res) =>{
//             if(err) return console.log(err);
//             console.log(res.body.message);

//             fs.writeFile('dog-img.txt',res.body.message, err => {
//                 console.log('Random dog image is saved');
//             })
//         });
// });


// Custom Promise
// readFilePro(`${__dirname}/dog.txt`).then(data =>{
//     console.log(`Breed : ${data}`);

//      return superagent
//         .get(`https://dog.ceo/api/breed/${data}/images/random`) 
//         })
//         .then(res => {
//                 return writeFilePro('dog-img.txt',res.body.message)
//                 // fs.writeFile('dog-img.txt',res.body.message, err => {
//                 //     console.log('Random dog image is saved');
//                 // })
//         })
//         .then(() => console.log('Random dog image saved to file!'))
//         .catch(err => {
//             console.log(err);
//         });


//Asyc Await

// const getDogPic= async () =>{

//     try{
//         const data = await readFilePro(`${__dirname}/dog.txt`);
//         console.log(`Breed : ${data}`);
//         const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//         console.log(res.body.message);

//         await writeFilePro('dog-img.txt',res.body.message);
//         console.log('Random dog image saved to file!!!!');
//     } catch (err){
//         console.log(err);    
//     }
// }

// getDogPic();

//Multiple awaits

(async () =>{

    try{
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed : ${data}`);
        const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const all = await Promise.all([res1Pro,res2Pro, res3Pro]);
        //console.log(all);
        const imgs = all.map(el =>el.body.message)
        console.log(imgs);
        //console.log(res.body.message);

        await writeFilePro('dog-img.txt',imgs.join('\n'));
        console.log('Random dog image saved to file!!!!');
    } catch (err){
        console.log('Some error occured');    
    }
})();

