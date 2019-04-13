const express = require('express')
const router = express.Router()
const { middleware, handleEvent, handleError } = require('../utils/webhook')


router.post('/', middleware, async (req, res) => {
  const result = await Promise.all(req.body.events.map(handleEvent))
  res.send(result)
})

router.use(handleError)

module.exports = router