const Discord = require('discord.js');
const client = new Discord.Client();
const talkedRecently = new Set();
// const GoogleImages = require("google-images");
// const { Client, Attachment } = require("discord.js");
// const googleImages = new GoogleImages("", "");
const prefix = '!';




client.once('ready', () =>{
    console.log('the frog council has awoken');
    // var tomfooleryChannel = client.channels.fetch('651409906603261956');
    // tomfooleryChannel.send("the frog council has awoken");

});

function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max));
}

// function pass(){
//     const x = getRandomInt(2);
//     if (x == 1)
//         return '*passed*' 
//     else return '*failed*'
// }

// client.on("disconnect", function(shardDisconnect){
//     message.channel.send(`the current frog council session will now cease`);
// });

function getResults(){
    var results = [];
    for (i = 0; i< 6; i++){
        results.push(getRandomInt(6));
    }
    return results;

}
// async function onMessage(message) {
//     if (message.content !== "judge") return;
//     try {
//       const results = await googleImages.search("funny frog");
//       const reply = !results.length ?
//         "No results" :
//         new Attachment(results[Math.floor(Math.random() * results.length)].url);
//       message.channel.send(reply);
//     }
//     catch (e) {
//       console.error(e);
//       message.channel.send("Error happened, see the console");
//     }
//   }

function vibeCheck(){
    var check = '';
    var sum = 0;
    const results = getResults();
    var dict = {
        0: 'baby: ',
        1: 'cursed: ',
        2: 'feral: ',
        3: 'clown: ',
        4: 'gremlin: ',
        5: 'soft: '
      };
    for(i = 0; i < 6; i++){
        // check = check.concat(dict[i], getRandomInt(6), '\n');
        x = results[i];
        sum += x;
        check += dict[i] + x + '\n';
    }
    check += "\nvibe check "
    if (sum >= 13 ){
        check += "*passed*";
    }
    else{
        check += "*failed*"
    }
    return check
}


client.on('message', message =>{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let user = message.author;
    if(!message.content.startsWith(prefix) || message.author.bot) 
        return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        message.channel.send('the frog council has been summoned')
    }
    
    else if(command === 'vibecheck'){
        if (talkedRecently.has(message.author.id)) {
            message.channel.send("once the frog council has spoken they cannot check again for another hour, <@" + message.member+ '>');
        } 
        else {
           // the user can type the command ... your command code goes here :)
           message.channel.send("the frog council will now commence a vibe check on <@"+ message.member + '>\n' + vibeCheck() + "\n*the frog council has spoken*" );

           // Adds the user to the set so that they can't talk for an hour
            talkedRecently.add(message.author.id);
            setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently.delete(message.author.id);
            }, 60000 * 60);
    }
        
    }
    else if(command === 'date'){
        message.channel.send(date);
    }
    else if(command === 'me'){
        message.channel.send(user.id + " " + user.username);
    }
    else if(command === 'help') {
        message.author.send('suq diq');
    }
    else if(command === 'scores'){
        message.channel.send(getResults());
    }
    // else if(command === 'judge'){

    // }
})
client.login('NzQyNzMwMjY1ODY0MDQ0NTk1.XzKXdg.QL3w-mWwJrM-35NY-WSh5Lmxk1Q');
