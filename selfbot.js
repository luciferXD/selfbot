const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
    console.log('___________________________________________________________________');
	console.log('Prefix: ' + config.prefix);
	console.log('___________________________________________________________________');
	console.log('Ping: ' + client.ping + 'ms');
	console.log('___________________________________________________________________');
	console.log('Guilds: ' + client.guilds.size);
	console.log('___________________________________________________________________');

});


client.on('message', message => {



    if (message.author !== client.user) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const messageArray = message.content.split(/\s+/g);
    const params = messageArray.slice(1);




    if (command === "help") {
        message.delete();
        const embed = new Discord.RichEmbed()
            .setThumbnail("https://cdn.discordapp.com/attachments/411336896049053703/413885722307592203/tumblr_oeunmc9nBq1ufw8o4o1_540.gif ")
            .setColor('0xffffff')
            .setTitle("help")
            .setFooter("venom", "https://i.imgur.com/CmeZ8dh.png")
            .setDescription("the command prefix is `$`\n\n**help** > displays all commands\n**ping** > displays the bot ping\n**cl** > purges all messages\n**game** > sets custom playing game\n**stream** > sets custom stream\n**nick** > sets nicname\n**cycle** > cycle through nicknames");
        message.channel.send({
            embed: embed
        });
    }


    if (command === "ping") {
        message.delete();
        message.channel.send("Pong!").then(msg => {
            msg.edit(`Pong | \`${msg.createdTimestamp - message.createdTimestamp}ms\``);
        });
    }


    if (command === "cl") {

        let messagecount = parseInt(params[0]);

        message.channel.fetchMessages({
                limit: 100
            })
            .then(messages => {
                let msg_array = messages.array();
                msg_array = msg_array.filter(m => m.author.id === client.user.id);
                msg_array.length = messagecount + 1;
                msg_array.map(m => m.delete().catch(console.error));

            });
    }
    if (command === "game") {
        if (!params[0]) return message.edit("Provide a game to set.");
        client.user.setPresence({
            game: {
                name: params.slice(0).join(' '),

            }
        }).then(() => {
            message.edit('`Game set as` ' +  params.slice(0).join(' '))
                .catch(error => message.channel.send("`Command Failed`"));
        })
    }




    if (command === "stream") {
        if (!params[0]) return message.edit("Provide a stream to set.");
        client.user.setPresence({
            game: {
                name: params.slice(0).join(' '),
                url: 'https://twitch.tv/xx',
                type: 1
            }
        }).then(() => {
            message.channel.send('`Stream set as` ' +  params.slice(0).join(' '))
                .catch(error => message.channel.send("`Command Failed`"));
        })
    }
    if (command === "nick") {
        if (!params[0]) return message.edit("Provide a nick to set");
        message.guild.me.setNickname(params.slice(0).join(' ')).then(() => {
            message.edit('`Nick in guild ' + message.guild.name + ' set to` ' + params.slice(0).join(' '))
                .catch(error => message.channel.send("`Command Failed`"));
        })
    }
    if (command === "dm") {
        message.delete();
        let member = message.mentions.members.first();
        let content = args.join(" ")
        member.send(content)
            .catch(error => message.channel.send("`Command Failed`"));

    }
});




client.login(config.token);