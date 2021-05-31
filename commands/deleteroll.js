const RollModel = require('../db/model.js')
const { MessageEmbed } = require('discord.js')
const moment = require('moment')

module.exports = {
  description: 'Usuń rzut predefiniowany.',
  aliases: ['dr'],
  minArgs: 1,
  maxArgs: 1,
  permissions: ['ADMINISTRATOR'],
  cooldown: '1m',
  callback: async ({ message, args }) => {
    const [name] = args
    const embed = new MessageEmbed().setTitle(`Usuwanie rzutu "${name}"`)
    try {
      if (await RollModel.findOneAndDelete({ name: name, guildId: message.guild.id })) {
        embed.setDescription('Usuwanie rzutu powiodło się!').setColor('#00ff00')
      } else { embed.setDescription('Nie znaleziono rzutu o podanej nazwie!').setColor('#ff0000') }
    } catch (e) {
      embed.setDescription(`Usuwanie rzutu niepowiodło się!\n ${e}`).setColor('#ff0000')
    }
    embed.setFooter(message.author.username + ' | ' + moment(message.createdAt).format('DD/MM/YYYY HH:mm:ss'))
    message.reply('', { embed })
    message.delete()
  }
}
