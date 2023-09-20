const router = require('express').Router();
const routerUsers = require('./users');
const auth = require('../middlewares/auth');
const { unknownLink, createUser, login } = require('../controllers/users');
const { signupValidator, signinValidator } = require('../utils/userValidationJoi');

router.post('/signup', signupValidator, createUser);
router.post('/signin', signinValidator, login);
router.use('/users', auth, routerUsers);
router.use('*', auth, unknownLink);

module.exports = router;
