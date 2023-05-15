const router = require('express').Router(); 

const database = require('../db/database.js');
const api = require('../../disney-api/api.js'); 

router.get('/', async(req, res) => {
    try {
        const {query} = req;

        const {searchTerm} = query;

        if(searchTerm === undefined) {
            const presentHistory = await database.find('searchHistory');
            res.json(presentHistory);
        } else {
            const presentSearch = await database.find('searchHistory', searchTerm);
            res.json(presentSearch);
        }

    } catch (error) {
        res.status(500).json(error.toString()); 
    }
});

module.exports = router; 