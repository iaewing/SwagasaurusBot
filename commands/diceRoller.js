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
            let result = [];
            args.forEach(element => {
                result.push(rollDice(parseDiceInput(element, diceRegex)));
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
 //Functions to roll some dice

/* Function Name: parseDiceInput
 * Purpose: Parse the input of a user
 * input: string
 * ouput: 
 *        if TRUE: an array containing the number of and sides of the dice
 *        if False: a string stating that the args were bad
 *  !NOTE: This will only evaluate the FIRST argument passed in.
 */
const parseDiceInput = (element, diceRegex) => diceRegex.test(element)?element.split('d'):"Bad Args";


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
function rollDice(args){
    let result =[];
    const min = 1
    if(args.length >= 2){
        //Sexy new logic
        args.forEach(element => {
            let index = args.indexOf(element);
            //Checking digits in the even indicies to get the number of dice to be rolled
            if(index%2 === 0){
                //Roll that many dice
                for(let i = 0; i < parseInt(element); i++){
                    //Grab the digit in the index+1 slot to get the number of sides of dice
                    result.push(getRndInteger(min,parseInt(args[index+1])));
                }
            }
        });

        /*
        Unsexy logic, refactored out 
        for(let i = 0; i< args.length; i+=2){

             
            for(let j = 0; j<args[i]; j++){
                
                result.push(getRndInteger(min, args[i+1]))
            }
        }
         */
        
    }
    else
    {
        result = args;
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
