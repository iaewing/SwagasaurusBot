/* File:      dadjoke.js
Description:  Receives a !dadjoke command and returns a dad joke from an online API
Inputs:       message, args
Created:      July 8, 2021
Author:       DanWritesCode / Dan
*/
module.exports = {
      name: 'dadjoke',
      description: 'Prints a dad joke',
      execute(message, args) {
        const request = require("request");

        request({ 
                uri: "https://icanhazdadjoke.com/", 
                headers: {
                    "Accept": "text/plain", 
                    "User-Agent": "SwagasaurusBot Discord Bot (https://github.com/iaewing/SwagasaurusBot)"
                }
            },
            function(error, response, body) {
                if(error) {
                    message.channel.send("Unfortunately, dad is unwell at the moment and cannot tell a joke :(");
                    console.log(error);
                    return;
                }
                message.channel.send(body);
            }
        );
	  },
};
