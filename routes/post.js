const express = require('express')
const { validate } = require('express-validation')
const router = express.Router()
const POST = require('../controllers/post')

const { isAuth } = require('../middlewares/authentication')

router.get('/:id',isAuth(['admin','user']),POST.showPosts)
router.post('/store',isAuth(['admin','user']),POST.postCreation)
router.put('/:id', isAuth(['admin', 'user']),  POST.editPost);
router.delete('/:id', isAuth(['admin', 'user']),POST.removePost);

module.exports = router