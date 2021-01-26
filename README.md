# SwagasaurusBot
Implementation of a Discord Bot using Node.js and Discord.js

Hosted on AWS EC2 for 24/7 uptime.

Created January 12, 2021. 

First deployment to SET Discord server January 18, 2021.

Current functionality of the bot is limited. There are a series of commands which, when paired with the command character "!", will prompt 
Swagbot to return some text. There is also limited character/word recognition, without the command character, that will prompt a bot response.
The final key piece of current functionality is role assignment for new users. Swagbot will greet new users to the server by name, display
a series of emojis corresponding to student year (first, second, third, co-op, and alumnus) and will assign the role to the user that 
corresponds with their emoji selection.

Some commands:

    !beep
    !magic
    !ping
    !server
    !user-info

Dice roller syntax:

    !r 1d6 rolls 1 six sided die
    !r 2d8 rolls 2 8 sided dice
    
    NOTE: The following two commands are not in the production build
    !r 2d20k1 rolls 2 20 sided dice, and returns the highest result
    !r 6d6k3 rolls 6 6 sided dice, and returns the highest 3
    More dice rolling functionality on the way!

