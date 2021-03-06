import { Router } from 'express'
const router = new Router()

// Remove this
import fakeDB from '../fakeClientsDB.js'

router.get('/', (req, res) => {
  setTimeout(() => {
    res.status(200).json(fakeDB)
  }, 300)
})

router.get('/:slug', (req, res) => {
  const index = fakeDB.findIndex(el => el.name === req.params.slug)
  if (index < 0) {
    res.status(404).json({
      error: 'Client does not exist in db'
    })
  }

  setTimeout(() => {
    res.status(200).json(fakeDB[index])
  }, 300)
})

module.exports = router
