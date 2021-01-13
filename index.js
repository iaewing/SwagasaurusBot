//Grab Node.js' file system so we can grab commands
const fs = require('fs');
//Add my discord.js dependency
const Discord = require('discord.js');
//Adds the configuration JSON as a dependency
const { prefix, token } = require('./config.json');
//create my client
const client = new Discord.Client();
//Create a collection to hold all commands
client.commands = new Discord.Collection();
//Grab every file from the commands folder with the .js extension into an array
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//We're going to fill the client.commands collection dynamically with whatever
//comands are stored in ./commands. This will allow flexibility to add/remove
//commands as needed.
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

//Run this once at ready
client.once('ready', () => {
  console.log('Ready');
});

client.on('message', message => {
  //Check for prefix and to make sure its not from a bot
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  //Grab just the args into an array by slicing the prefix number of characters
  //and trimming whitepsace
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  //Grab the first arg and lowercase it
  const command = args.shift().toLowerCase();

  //Does the message contain a command from our collection? If no, return early.
  if (!client.commands.has(command)) {
    return;
  }

  try {
    //Try to execute the command entered, as pulled from our collection.
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('something broke while trying to do that!');
  }
});

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
 */
const parseDiceInput = (args, diceRegex) => diceRegex.test(args)?args.split('d'):"Bad Args";


/* Function Name: Roll Dice
 * Purpose: Simulate the rolling of x dice with y sides
 * input: array with 2 elements: 
 *          the number of dice at index 0
 *          The number of sides each die has at index 1 
 * ouput: an aray of the results
 */
function rollDice(args){
  let result =[];
  const min = 1
  for(let i = 0; i<args[0]; i++){
    result.push(getRndInteger(min, args[1]))
  }
  return result;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min+1) ) + min;
}

//Ignore this

//Log the bot into Discord using the token
client.login(token);
