const rpgDiceRoller = require('rpg-dice-roller')
const { MessageEmbed } = require("discord.js")

const engines = rpgDiceRoller.NumberGenerator.engines
const generator = rpgDiceRoller.NumberGenerator.generator

generator.engine = engines.MersenneTwister19937.autoSeed()

module.exports = {
    slash: 'both',
    category: 'RPG',
    aliases: ['r'],
    testOnly: true,
    description: 'Rzuć kostką!',
    minArgs: 1,
    expectedArgs: '<dices> [repeat]',
    callback: ({ message, args }) => {
        let [dices, repeat] = args
        try {
            if (repeat) {
                const parsedRepeat = parseInt(repeat)
                if (isNaN(parsedRepeat)) {
                    throw 'repeat argument must be a number!'
                }
                else if (parsedRepeat < 1 || parsedRepeat > 20) {
                    throw 'repeat argument must be a number between 1 and 20!'
                }
                else if (parsedRepeat === 1) {
                    //pass
                }
                else {
                    const embed = new MessageEmbed().setTitle(`Wynik rzutu - (${dices})`).setDescription(`liczba powtórzeń - ${repeat}`)
                    let sum = 0

                    for (let i = 0; i < parsedRepeat; i++) {
                        const roll = new rpgDiceRoller.DiceRoll(dices)
                        let rollResult = `\`\`\` 🎲 ${roll}\`\`\``
                        if (rollResult.length > 1000) {
                            throw 'roll result is too long for discord message standards.'
                        }
                        embed.addField(`Rzut #${i + 1}`, rollResult)
                        sum += roll.total
                    }

                    embed.addField('Wynik', sum)

                    if (embed.length > 6000) {
                        throw 'roll result is too long for discord message standards.'
                    }

                    if (message) {
                        message.delete()
                        message.reply('', { embed })
                    }
                    return embed
                }
            }

            const roll = new rpgDiceRoller.DiceRoll(dices)
            const embed = new MessageEmbed()
            let rolls = `\`\`\` 🎲 ${roll.rolls.join(' ')}\`\`\``

            if (rolls.length > 2048) {
                rolls = rolls.slice(0, 2030) + '...]```'
            }

            embed
                .setTitle(`Wynik rzutu - (${roll.notation})`)
                .setDescription(rolls)
                .addField('Wynik', roll.total)

            if ((roll.total === roll.maxTotal) && (roll.maxTotal !== roll.minTotal) && roll.averageTotal > 5) {
                embed.setImage('https://media.giphy.com/media/9y2rmR2dv7rLq/giphy.gif')
                embed.setColor('#00ff00')
            }
            else if ((roll.total === roll.minTotal) && (roll.maxTotal !== roll.minTotal) && roll.averageTotal > 5) {
                embed.setImage('https://media1.tenor.com/images/8474b0f567704b752354d6e5a589784b/tenor.gif?itemid=6118887')
                embed.setColor('#ff0000')
            }

            if (message) {
                message.delete()
                message.reply('', { embed })
            }

            return embed
        }
        catch (e) {
            var embed = new MessageEmbed()
                .setTitle('Wynik rzutu - Błąd')
                .setColor('#ffff00')
                .setDescription(e)

            if (message) {
                message.delete()
                message.reply('', { embed })
            }
            return embed
        }
    },
}
