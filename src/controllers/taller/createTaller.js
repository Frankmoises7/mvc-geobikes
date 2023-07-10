const Taller = require('../../models/Taller')
//const { tallerCreationSchema } = require('../../validators/tallerSchema')

async function createTaller(req, res) {
  const payload = req.body

  //todo: REVISAR ESTE PROBLEMA DE VALIDACION
/*   try {
    await tallerCreationSchema.validateAsync(payload)
  } catch (err) {
    res.status(400).send(err.message)
    return
  }  */

  try {
    const taller = await Taller.create({ ...payload})
    res.status(201).send(taller)
  } catch(err) {
    console.log(err)
  }
}

module.exports = createTaller
