const Taller = require('../../models/Taller')

async function getAllTalleres(req, res) {
  const talleres = await Taller.find()
  res.send(talleres)
}

module.exports = getAllTalleres
