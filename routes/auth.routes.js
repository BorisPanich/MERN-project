// connecting
const {Router} = require('express')
const User = require('../models/User')  //models обычно с заглавной буквы
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = Router();


// api/auth/register
router.post(
    '/register',
    // validation
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'should be min 5 symbol').isLength({min: 5})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            // то, что отправляем на front
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'incorrect data when registering'
                })
            }

            //    то, что будем получать с front
            const {email, password} = req.body

            //    logic register
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: 'User already exists'})
            }
            //    зашифровка password
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})
            await user.save()

            res.status(201).json({message: 'User created'})

        } catch (e) {
            // error to 500
            res.status(500).json({message: 'Something went wrong'})
        }
    })

// api/auth/login
router.post('/login',
    [
        check('email', 'Input correct email').normalizeEmail().isEmail(),
        check('password', 'Input password').exists()    //password должен быть
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            // проверка на front
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'incorrect data when at login'
                })
            }

            const {email, password} = req.body
            //    logic find
            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({message: 'User not found'})
            }

            //    проверка password
            const isMatch = await bcrypt.compare(password, user.password)   // сверка данных паролей
            if (!isMatch) {
                return res.status(400).json({message: 'Error, please repeat input '})
            }

            //    create token
            const token = jwt.sign(
                {userId: user.id}, // можно еще user.name и user.email
                config.get('jwtSecret'), // secret key
                {expiresIn: '1h'}   // time live token (1 hour)
            )
            // status не указывается, т.к. он здесь поумолчанию 200
            res.json({token, userId: user.id})

        } catch (e) {
            // error to 500
            res.status(500).json({message: 'Something went wrong'})
        }
    })

module.exports = router;