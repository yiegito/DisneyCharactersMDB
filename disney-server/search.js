const router = require('express').Router(); 

const database = require('./server.js'); 
const api = require('../disney-api/api.js'); 


// middleware?
router.use((req, res, next) => {

    next(); 
}); 


// this is '/search'
router.get('/', async(req, res) => {
    try{
        console.log('ello world'); 

        // const {term} = req.query; 
        // console.log(term); 

    }
    catch(error){
        res.status(500).json(error.toString()); 
    }

});

// router.get('/:charactername', async(req, res) => {
//     try{

//     }
//     catch(error){
//         res.status(500).json(error.toString()); 
//     }

// }); 

module.exports = router; 