const router = require('express').Router()
const Account = require('./accounts-model')
const {
checkAccountId,
checkAccountNameUnique,
checkAccountPayload
} = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await Account.getAll()
    res.json(accounts)
  } catch (err) {
    next(err)
  }
});

router.get('/:id', checkAccountId, (req, res) => {
  // DO YOUR MAGIC
  res.json(req.account)
});

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const name = req.body.name.trim()
    const budget = req.body.budget
    const newAccount = await Account.create({name, budget})
    res.status(201).json(newAccount)
  } catch (err) {
    next(err)
  }
});

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const { id } = req.params
    const updatedAccount = await Account.updateById(id, req.body)
    res.json(updatedAccount)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const { id } = req.params
    const deletedAccount = await Account.deleteById(id)
    res.json(deletedAccount)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(500).json({
    message: err.message,
    stack: err.stack 
  })
})

module.exports = router;
