const Discord = require('discord.js')
const WOKCommands = require('wokcommands')
const WOKcommands = require('wokcommands')
require('dotenv').config()

const client = new Discord.Client()
const guildId = '739970938929676410'

client.on('ready', () => {
    new WOKCommands(client, {
        commandsDir: 'commands',
        testServers: [guildId],
        showWarns: false,
    })
})

client.login(process.env.TOKEN);