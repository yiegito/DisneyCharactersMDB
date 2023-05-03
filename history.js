const fs = require('fs');

const saveSearch = (searchName, results) => {

    const resultCount = results.length;
    const initData = {};
    initData[searchName] = resultCount;
    const initArr = [initData];

    const saveJSON = async(inData) => {
        try {
            await fs.promises.writeFile("./data.json", inData)
    
            console.log("File written successfully");
    
        } catch (err) {
            console.error(err);
        }
    };

    fs.promises.readFile("./data.json")
    .then((success) => {
        // parse data, then send to saveJson
        const adjustArray = JSON.parse(success);
        adjustArray.push(initData);
        saveJSON(JSON.stringify(adjustArray, null, 2));

    }).catch((err) => {
        // if no exisiting file, create new file
        saveJSON(JSON.stringify(initArr, null, 2));
    });
};

module.exports = {
    saveSearch
};