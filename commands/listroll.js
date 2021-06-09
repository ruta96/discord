const RollModel = require('../db/model.js')
const { MessageEmbed } = require('discord.js')
const formatDate = require('../functions/formatDate.js')

module.exports = {
  aliases: ['lr'],
  description: 'Pokaż wszystkie moje predefiniowane rzuty.',
  cooldown: '1m',
  callback: async ({ message }) => {
    const embed = new MessageEmbed().setTitle('Dostępne predefiniowane rzuty')
    const guildRolls = await RollModel.find({ guildId: message.guild.id })
    if (guildRolls.length === 0) {
      embed.setDescription('Na tym serwerze nie ma zdefiniowanych rzutów.')
    } else {
      guildRolls.forEach(roll => embed.addField(`nazwa rzutu: ${roll.name}`, `notacja rzutu: ${roll.notation}`))
    }
    embed.setFooter(message.author.username + ' | ' + formatDate(message.createdAt))
    message.reply('', { embed })
    message.delete()
  }
}
