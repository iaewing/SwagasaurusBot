/* File Name: diceRoller.js
 * Purpose: implementation of a basic dice roller for a discord bot
 * RevHistory:
 *      Created 2021-1-13
 *      Timothy Nigh
 *  TODO: Implement keeping the highest
 *          
 */

module.exports = {
    name: 'r',
    description: 'roll a die',
    execute(message, args) {
        if(!args.length){
            message.channel.send('Bad args homie!');
        } else {
            let result = [];
            args.forEach(element => {
                result.push(rollDice(parseDiceInput(element, diceRegex,diceRegexKeepHighest)));
            });
            message.channel.send(result);
        }
  },
};

/************************************
 * THis is where dice roller functionality is going! 
 * 
 * 
 ************************************/

//This is a basic dice regex that handles the case x'd'y 
//where x is the number of dice and y is the sides of each die

 const diceRegex = /\dd\d/

 const diceRegexKeepHighest = /\dd\dk\d/
//Functions to roll some dice

/* Function Name: parseDiceInput
 * Purpose: Parse the input of a user
 * input: string
 * ouput: 
 *        if TRUE: an array containing the number of and sides of the dice
 *                 OR an array containing the above, plus the number of highest results to keep
 *        if False: a string stating that the args were bad
 */

const parseDiceInput = (element, diceRegex,diceRegexKeepHighest) => 
    diceRegex.test(element)?
        diceRegexKeepHighest.test(element)?element.split(/d|k/):element.split('d')
        :"Bad args bud";


/* Function Name: Roll Dice
 * Purpose: Simulate the rolling of x dice with y sides
 * input: array with n elements: 
 *          the number of dice at index 0,2,4.....n
 *          The number of sides each die has at index 1,3,5.....n 
 * ouput: an aray of the results, or the args if the args are bad
 * 
 *      !NOTE: in the current implementation, this should only process one pair of args at a time 
 *             However, it has been made extendible so it *COULD* process an array  of n args
 */

function rollDice(arg){
    let result =[];
    const min = 1
    if(arg.length >= 2){
        //Sexy new logic
        //Roll that many dice
        for(let i = 0; i < parseInt(arg[0]); i++){
            //Grab the digit in the index+1 slot to get the number of sides of dice
            result.push(getRndInteger(min,parseInt(arg[1])));
        }
    } else{
        result = arg;
    }

    if(arg.length === 3){
        result.sort((a,b)=>b-a);
        result = result.slice(0,arg[2])
    }
    return result;
}

/* Function Name: getRndInteger
 * Purpose: Gets a random integer between min and max (inclusive)
 * input: min value, max value
 * ouput: Random integer between and including max and min 
 *       
 */

const getRndInteger = (min, max) =>
   Math.floor(Math.random() * (max - min+1) ) + min;
