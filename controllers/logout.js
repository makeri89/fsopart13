const router = require('express').Router()
const { Session } = require('../models')

router.delete('/', async (req, res) => {
  await Session.destroy({
    where: {
      sid: req.cookies.sid
    }
  })
  res.clearCookie('sid').status(204).end()
})

module.exports = router