/** Textual markov chain generator */
class MarkovMachine {

  /** build markov machine; read in text.*/
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let myChains = new Map();
    for(let x=0; x < this.words.length; x++){
      let currWord = this.words[x];
      let nextWord = this.words[x + 1] || null;

      if(myChains.has(currWord)) myChains.get(currWord).push(nextWord);
      else myChains.set(currWord, [nextWord]);
          
    }
    this.chains = myChains;
  }
/** return random text from chains */
static getRandomChoice(choice) {
  return choice[Math.floor(Math.random() * choice.length)]
  }


  makeText(numWords = 100) {
    let keyArr = Array.from(this.chains.keys());
    let output = [];
    let key = MarkovMachine.getRandomChoice(keyArr);

    while(output.length < numWords && key !==  null) {
      output.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }
    return output.join(" ");
  }


}

module.exports = { MarkovMachine };
