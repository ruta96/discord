'use strict'

const Discord = require('discord.js')
const WOKCommands = require('wokcommands')
require('dotenv').config()

const client = new Discord.Client({
  partials: ['MESSAGE', 'REACTION']
})
// const guildId = '667814568172453919'

/* const getApp = (guildId) => {
    const app = client.api.applications(client.user.id)
    if (guildId) {
        app.guilds(guildId)
    }
    return app
} */
client.on('ready', async () => {
  // const commands = await getApp().commands.get()
  // console.log(commands)
  client.user.setActivity('Let\'s /roll', { type: 'PLAYING' })

  new WOKCommands(client, {
    commandsDir: 'commands',
    testServers: ['667814568172453919']
  })
    .setDefaultPrefix('/')
})

client.login(process.env.TOKEN)
