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
    description: 'Rzuć kostką! (żeby uzyskać dodatkowe informacje podaj dowolny znak jako drugi argument)',
    minArgs: 1,
    expectedArgs: '<dices> [info]',
    callback: ({ message, args }) => {
        const [dices, info] = args
        try {
            const roll = new rpgDiceRoller.DiceRoll(dices)
            const embed = new MessageEmbed()
            let rolls = `🎲 ${roll.rolls}`
            if (rolls.length > 2048) {
                rolls = rolls.slice(0, 2044)
                rolls += '...]'
            }
            embed
                .setTitle(`Wynik rzutu - (${roll.notation})`)
                .setDescription(rolls)
                .addField('suma', roll.total)
            if (info) {
                embed
                    .addField('Wynik minimalny', `${roll.minTotal}`, true)
                    .addField('Wynik maksymalny', `${roll.maxTotal}`, true)
                    .addField('Wynik średni', `${roll.averageTotal}`, true)
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
                .setDescription(e)

            if (message) {
                message.delete()
                message.reply('', { embed })
            }
            return embed
        }
    },
}
