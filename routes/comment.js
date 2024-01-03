const express = require('express')
const { validate } = require('express-validation')
const router = express.Router()
const COMMENT = require('../controllers/comment')

const { isAuth } = require('../middlewares/authentication')

router.post('/add',isAuth(['admin','user']),COMMENT.addComment)

module.exports = router