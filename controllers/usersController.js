const userStorage = require('../storages/userStorage');
const { body, validationRelax } = require('express-validator');

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

exports.userCreatePost = (req, res) => {
    const {firstName, lastName} = req.body;
    userStorage.addUser({firstName, lastName});
    res.redirect('/')
};