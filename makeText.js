/** Command-line tool to generate Markov text. */
const fs = require("fs");
const axios = require("axios")
const markov = require("./markov")
const process = require("process")

function generateText(text) {
    let machine = new markov.MarkovMachine(text);
    console.log(machine.makeText());
}

function textFromFile(path){
    fs.readFile(path, 'utf8', function cb(err,data){
        if(err) {
            console.error(`Error Reading file: ${path} - ${err}`);
            process.exit(1);
            }
        else {
            generateText(data);
        }
    });
    }
    
    async function textFromURL(url) {
        let response;
        try {
        response = await axios.get(url);
        } 
        catch(err) {
        console.error(`Error fetching data from ${url} : ${err}`);
        process.exit(1);
    }
    generateText(response.data);
    }

    let [method, path ] = process.argv.slice(2);

    if(method ==="file"){
        textFromFile(path);
    }

    else if(method === "url") {
        textFromURL(path);
    }
    
    else {
        console.error(`Unknown method: ${method}`);
        process.exit(1);
    }