const router = require('express').Router(); 

const database = require('./server.js'); 
const api = require('../disney-api/api.js'); 

const _selectCharacterPrompt = async (characters) => {
    const displayCharacter = characters.map((character) => {
        return {name : `${character.name}`, id: character._id}
    });
    return displayCharacter; 
};


// middleware?
router.use((req, res, next) => {

    next(); 
}); 


// this is '/search'
router.get('/', async(req, res) => {
    try{
        const {query} = req;

        // character is the query parameter
        // aka will return the character searched for
        const {character} = query;

        const char = await api.getWithQuery(character); 

        const selected = await _selectCharacterPrompt(char); 

        console.log(selected); 

        // error when only 1 object in array
        res.json(selected); 

    }
    catch(error){
        res.status(500).json(error.toString()); 
    }

});

router.get('/:charactername', async(req, res) => {
    try{

    }
    catch(error){
        res.status(500).json(error.toString()); 
    }

}); 

module.exports = router; 