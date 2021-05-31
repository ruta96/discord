const RollModel = require('../db/model.js')
const { MessageEmbed } = require('discord.js')
const moment = require('moment')

module.exports = {
  aliases: ['nr'],
  description: 'Stwórz predefiniowany rzut kostką.',
  minArgs: 2,
  permissions: ['ADMINISTRATOR'],
  cooldown: '1m',
  callback: async ({ message, args }) => {
    const name = args[0]
    let notation = ''
    const embed = new MessageEmbed().setTitle('Tworzenie nowego rzutu predefinowanego')
    for (let i = 1; i < args.length; i++) {
      notation += args[i] + ' '
    }
    try {
      const currentRolls = await RollModel.find({ guildId: message.guild.id })
      if (currentRolls.length >= 20) {
        throw new Error('You can have only 20 predefined rolls.')
      }
      if (currentRolls.find(roll => roll.name === name)) {
        throw new Error(`You have predefined roll named "${name}".`)
      }
      if (name.length > 64) {
        throw new Error('Predefined roll name, can\'t be longer than 64 characters.')
      }
      if (notation.length > 256) {
        throw new Error('Your roll notation is too long.')
      }

      const definedRoll = new RollModel({ name: name, notation: notation, guildId: message.guild.id })
      embed.addField('Nazwa rzutu', name).addField('Notacja rzutu', notation).setColor('#00ff00')
      embed.title += ' - sukces'
      await definedRoll.save()
    } catch (e) {
      embed.setDescription(e).setColor('#ff0000')
      embed.title += ' - błąd'
    }
    embed.setFooter(message.author.username + ' | ' + moment(message.createdAt).format('DD/MM/YYYY HH:mm:ss'))
    message.reply('', { embed })
    message.delete()
  }
}
