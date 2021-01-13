/* File Name: diceRoller.js
 * Purpose: implementation of a basic dice roller for a discord bot
 * RevHistory:
 *      Created 2021-1-13
 *      Timothy Nigh
 *  TODO: Implement rolling multiple kinds of dice
 *          
 */

module.exports = {
    name: 'r',
    description: 'roll a die',
    execute(message, args) {
        if(!args.length){
            message.channel.send('Bad args homie!');
        } else {
            rollDice(parseDiceInput(args, diceRegex));
        }
  },
};

/************************************
 * THis is where dice roller functionality is going! 
 * 
 * 
 ************************************/
const diceRegex = /\dd\d/
 //Functions to roll some dice

 /* Function Name: parseDiceInput
 * Purpose: Parse the input of a user
 * input: string
 * ouput: 
 *        if TRUE: an array containing the number of and sides of the dice
 *        if False: a string stating that the args were bad
 *  !NOTE: This will only evaluate the FIRST argument passed in.
 */
const parseDiceInput = (args, diceRegex) => diceRegex.test(args)?args[0].split('d'):"Bad Args";


/* Function Name: Roll Dice
 * Purpose: Simulate the rolling of x dice with y sides
 * input: array with 2 elements: 
 *          the number of dice at index 0
 *          The number of sides each die has at index 1 
 * ouput: an aray of the results, or the args if the args are bad
 */
function rollDice(args){
    let result =[];
    const min = 1
    if(args.length == 2){
        for(let i = 0; i<args[0]; i++){
            result.push(getRndInteger(min, args[1]))
        }
    }
    else
    {
        result = args;
    }
    return result;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min+1) ) + min;
}