const rpgDiceRoller = require('rpg-dice-roller')
const { MessageEmbed } = require('discord.js')
const RollModel = require('../db/model.js')
const formatDate = require('../functions/formatDate.js')

const engines = rpgDiceRoller.NumberGenerator.engines
const generator = rpgDiceRoller.NumberGenerator.generator

generator.engine = engines.MersenneTwister19937.autoSeed()

function standardRoll (dices, name) {
  const roll = new rpgDiceRoller.DiceRoll(dices)
  const embed = new MessageEmbed()
  let rolls = `\`\`\` 🎲 ${roll.rolls.join(' ')}\`\`\``

  if (rolls.length > 2048) {
    rolls = rolls.slice(0, 2030) + '...]```'
  }
  if (name) {
    embed.title = `${name}\nWynik rzutu - (${roll.notation})`
  } else {
    embed.title = `Wynik rzutu - (${roll.notation})`
  }
  embed
    .setDescription(rolls)
    .addField('Wynik', roll.total)

  if ((roll.total === roll.maxTotal) && (roll.maxTotal !== roll.minTotal) && roll.averageTotal > 5) {
    embed.setImage('https://media.giphy.com/media/9y2rmR2dv7rLq/giphy.gif')
    embed.setColor('#00ff00')
  } else if ((roll.total === roll.minTotal) && (roll.maxTotal !== roll.minTotal) && roll.averageTotal > 5) {
    embed.setImage('https://media1.tenor.com/images/8474b0f567704b752354d6e5a589784b/tenor.gif?itemid=6118887')
    embed.setColor('#ff0000')
  }
  return embed
}

module.exports = {
  aliases: ['r'],
  cooldown: '10s',
  description: 'Rzuć kostką!',
  minArgs: 1,
  expectedArgs: '<dices> [repeat-or-name] [name]',
  callback: async ({ message, args }) => {
    const dformat = formatDate()
    try {
      if (args[0].charAt(0) === '&') {
        args[0] = args[0].substring(1)
        const guildRoll = await RollModel.findOne({ guildId: message.guild.id, name: args[0] })
        if (guildRoll) {
          args = guildRoll.notation.split(' ')
          args.pop()
        }
      }
      const [dices, repeat, name] = args
      if (repeat && !isNaN(parseInt(repeat))) {
        const parsedRepeat = parseInt(repeat)

        if (parsedRepeat < 1 || parsedRepeat > 20) {
          throw new Error('repeat argument must be a number between 1 and 20!')
        } else if (parsedRepeat === 1) {
          // pass
        } else {
          const embed = new MessageEmbed().setDescription(`liczba powtórzeń - ${repeat}`)
          embed.title = `Wynik rzutu - (${dices})`

          if (name) {
            let rollName = ''

            for (let i = 2; i < args.length; i++) {
              rollName += args[i] + ' '
            }

            embed.title = `${rollName}\nWynik rzutu - (${dices})`
            if (rollName.length > 64) {
              throw new Error('Roll name can\'t be longer than 64 characters.')
            }
          }

          let sum = 0

          for (let i = 0; i < parsedRepeat; i++) {
            const roll = new rpgDiceRoller.DiceRoll(dices)
            const rollResult = `\`\`\` 🎲 ${roll}\`\`\``

            if (rollResult.length > 1000) {
              throw new Error('roll result is too long for discord message standards.')
            }

            embed.addField(`Rzut #${i + 1}`, rollResult)
            sum += roll.total
          }

          embed.addField('Wynik', sum)

          if (embed.length > 6000) {
            throw new Error('roll result is too long for discord message standards.')
          }

          embed.setFooter(message.author.username + ' | ' + dformat)
          message.delete()
          message.reply('', { embed })

          return 0
        }
      } else {
        let rollName = ''

        for (let i = 1; i < args.length; i++) {
          rollName += args[i] + ' '
        }

        if (rollName.length > 64) {
          throw new Error('Roll name can\'t be longer than 64 characters.')
        }

        const embed = standardRoll(dices, rollName)

        embed.setFooter(message.author.username + ' | ' + dformat)
        message.delete()
        message.reply('', { embed })

        return 0
      }
      const embed = standardRoll(dices)

      embed.setFooter(message.author.username + ' | ' + dformat)
      message.delete()
      message.reply('', { embed })

      return 0
    } catch (e) {
      const embed = new MessageEmbed()
        .setTitle('Wynik rzutu - Błąd')
        .setColor('#ffff00')
        .setDescription(e)

      embed.setFooter(message.author.username + ' | ' + dformat)
      message.delete()
      message.reply('', { embed })

      return 0
    }
  }
}
