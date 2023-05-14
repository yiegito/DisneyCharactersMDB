const superagent = require('superagent');
const base = 'https://api.disneyapi.dev';

const getWithQuery = async (characterName) => {
    // https://api.disneyapi.dev/character?name=Mickey%20Mouse
    try {
        const charUrl = `${base}/character?name=${characterName}`;
        const res = await superagent.get(charUrl);
        
        // returns array of all searches that match query
        return res.body;
    } catch (error) {
        console.log(error);
    }
};

// new api update is not "character" not "characters"
const getWithId = async (id) => {
    // https://api.disneyapi.dev/character/308
    try {
        const charUrl = `${base}/character/${id}`;
        const res = await superagent.get(charUrl);

        // returns character object with all detailed info
        return res.body.data;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getWithId,
    getWithQuery
};