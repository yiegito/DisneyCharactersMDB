const router = require('express').Router(); 

const database = require('../server.js'); 
const api = require('../../disney-api/api.js'); 


const _selectCharacterPrompt = async (characters) => {
    if(characters.info.count === 1 ){
        return {display : `${characters.data.name}`, id: characters.data._id}
    }
    else {
        const displayCharacter = characters.data.map((character) => {
            return {display : `${character.name}`, id: character._id}
        });
    // console.log(characters.length); 
        return displayCharacter; 
    }
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

        const result = {
            searchTerm: character, 
            results:[...selected] }

        console.log(result); 

        // gets the search results and responds with json
        res.json(result); 

        // create the search history object in MongoDB
        // number 2

    }
    catch(error){
        res.status(500).json(error.toString()); 
    }

});



router.get('/:id/details', async(req, res) => {
    try{

        const {params} = req;

        const{id} = params; 

        const background = await api.getWithId(id); 

        // this is good 
        res.json(background); 
    }
    catch(error){
        res.status(500).json(error.toString()); 
    }

});

module.exports = router; 