var express = require('express');
var router = express.Router();

router.use('/configuraciones', require('./ConfigController'));
router.use('/usuarios', require('./UsersController'));
router.use('/candidatos', require('./CandController'));
router.use('/votaciones', require('./VotacionController'));
router.use('/aspiraciones', require('./AspiraController'));
router.use('/votos', require('./VotController'));
router.use('/votar', require('./VotarController'));
router.use('/resultado', require('./ResultController'));
router.use('/welcome', require('./WelcomeController'));
router.use('/login', require('./LoginController'));

module.exports = router;