const userStorage = require('../storages/userStorage');
const { body, validationRelax, validationResult } = require('express-validator');

let alphaErr ="Must only contain letters"
let legthErr ="Must be between 1-10 characters"

const validateUser = [
    body('firstname').trim()
    .isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({min: 1, max: 10}).withMessage(`First name ${legthErr}`),

    body('lastname').trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({min: 1, max: 10}).withMessage(`Last name ${legthErr}`)
];

exports.userListGet = (req, res) => {
    res.render('index', {
        title : 'Users List',
        users : userStorage.getUsers()
    })
};
exports.userCreateGet  = (req, res) => {
    res.render('createUser', {
        title : 'Create User'
    });
};

exports.userCreatePost =[
    validateUser,
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).render("createUser", {
                title: "Create User",
                errors: errors.array()
            })
        };

        const {firstName, lastName} = req.body;
        userStorage.addUser({firstName, lastName});
        res.redirect('/')
    }
] 