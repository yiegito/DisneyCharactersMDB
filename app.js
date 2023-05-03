const prompts = require('prompts'); 
const api = require('./api.js'); 
const history = require("./history.js");

//gets character names based on argument, runs a prompt after searching to select character.
// main function being called by cli.js
const characterInformation = async(args) => {
    const characterName = args; 
    const findChar = await api.getWithQuery(characterName);
    // stored the data of the selected character in const
    const selectedChar = await _selectCharacterPrompt(findChar);
    // neatly displays data of selected character
    
    filterData(selectedChar);

     
    // call history function with key = characterName, value = count of how many in search result
    history.saveSearch(characterName, findChar);
}; 

// Gets character information by id and returns information
const dataInformation = async(args) => {
    const characterData = args;
    const findData = await api.getWithId(characterData);
    return findData; 
}

// method neatly displays passed in data
const filterData = async (data) => {
    const name = data.name;
    console.log("\nName: " + name);
    // films
    const film = data.films; 
    if(film[0] == null){
        console.log("\nFilms: None ")
    }
    else{
        console.log("\nFilms: ")
        film.forEach((f) => {
        console.log("•" + f); 
    }) 
    }
    // short films
    const shorts = data.shortFilms; 
    if(shorts[0] == null){
        console.log("\nShort Films: None ")
    }
    else{
        console.log("\nShort Films: ")
        shorts.forEach((f) => {
        console.log("•" + f); 
    }) 
    }
    // tv shows
    const shows = data.films; 
    if(shows[0] == null){
        console.log("\nTV Shows: None ")
    }
    else{
        console.log("\nTV Shows: ")
        shows.forEach((f) => {
        console.log("•" + f); 
    }) 
    }
    // video games
    const games = data.videoGames; 
    if(games[0] == null){
        console.log("\nVideo Games: None ")
    }
    else{
        console.log("\nVideo Games: ")
        games.forEach((f) => {
        console.log("•" + f); 
    }) 
    }
    // park attractions
    const park = data.parkAttractions; 
    if(park[0] == null){
        console.log("\nPark Attractions: None ")
    }
    else{
        console.log("\nPark Attractions: ")
        park.forEach((f) => {
        console.log("•" + f); 
    }) 
    }
    // allies
    const allies = data.allies; 
    if(allies[0] == null){
        console.log("\nAllies: None ")
    }
    else{
        console.log("\nAllies: ")
        allies.forEach((f) => {
        console.log("•" + f); 
    }) 
    }
    // enemies
    const enemies = data.enemies; 
    if(enemies[0] == null){
        console.log("\nEnemies: None ")
    }
    else{
        console.log("\nEnemies: ")
        enemies.forEach((f) => {
        console.log("•" + f); 
    }) 
    }
}; 
// search prompt
// select from the list of characters based on their input
const _selectCharacterPrompt = async (characters) => {
    const displayCharacter = characters.map((character) => {
        return {title : `${character.name}`, value: character._id}
    });
    const response = await prompts([
        {
            type: 'select',
            name: 'characters',
            message: 'Select character',
            choices: displayCharacter,
        }
    ]);
    //returns character data information from prompt response
    return dataInformation(response.characters); 
};

module.exports = {
    characterInformation
};