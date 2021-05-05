const { MessageEmbed } = require("discord.js")

module.exports = {
    slash: true,
    testOnly: true,
    description: 'Roll the dice',
    minArgs: 1,
    expectedArgs: '<number of sides> <number of dices>',
    callback: ({ args }) => {
        const [sides, dices] = args
        const embed = new MessageEmbed().setTitle('Dice roll').setDescription(Math.floor((Math.random() * parseInt(sides)) + 1))
        return embed
    }
}