/** Command-line tool to generate Markov text. */
const fs = require("fs");
const axios = require("axios")
const markov = require("./markov")
const process = require("process")

function generateTxt(text) {
    let machine = new markov.MarkovMachine(text);
    console.log(machine.makeText());
}

function textFromFile(path){
    fs.readFile(path, 'utf8', function(err,data){
        if(err) {
            console.error(`Error Reading file: ${path} - ${err}`)
            process.exit(1);
            }
        else {
            generateTxt(data);
        }
    });
    }
    


    async function textFromURL(url) {
        let response;
        try {
        response = await axios.get(url);
        } 
        catch(err) {
        console.error(`Error fetching data from ${url} : ${err}`)
        process.exit(1);
    }
    generateTxt(response.data);
    }

    let [method, path ] = process.argv.slice(2);

    if(method === "url") {
        textFromURL(path);
    }
    else if(method ==="file"){
        textFromFile(path);
    }
    else {
        console.error(`Unknown method: ${method}`);
        process.exit(1);
    }