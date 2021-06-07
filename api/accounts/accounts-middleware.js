const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { name, budget } = req.body
  if (!name || !budget ) {
    next({ status: 400, message: "name and budget are required"})
  } else if (typeof name !== 'string') {
    next({ status: 400, message: "name of account must be a string" })
  } else if (typeof budget !== 'number') {
    next({ status: 400, message: "budget of account must be number"})
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    next({ status: 400, message: "name of account must be between 3 and 100"})
  } else if (budget < 0 || budget > 1000000) {
    next({ status: 400, message: "budget of account is too large or too small"})
  } else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Account.getByName(req.body.name.trim());
    if (!account) {
      next();
    } else {
      next({ status: 400, message: 'that name is taken' });
    }
  } catch (err) {
    next(err);
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id
  try {
    const account = await Account.getById(id);
      if(account) {
        req.account = account;
        next();
      } else {
        next({ status: 404, message: "account not found" });
      }
  } catch (err) {
    next(err);
  }
}
