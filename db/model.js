const mongoose = require('mongoose')
const RollModel = mongoose.model('Roll', new mongoose.Schema({
  name: String,
  notation: String,
  guildId: String
}))
module.exports = RollModel
