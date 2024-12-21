const { params } = require('../routes/userRouter');
const userStorage = require('../storages/userStorage');
const { body, validationRelax, validationResult } = require('express-validator');

let alphaErr = "must only contain letters"
let legthErr ="must be between 1-10 characters"

const validateUser = [
    body('firstName').trim()
    .isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({min: 1, max: 10}).withMessage(`First name ${legthErr}`),

    body('lastName').trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({min: 1, max: 10}).withMessage(`Last name ${legthErr}`),

    body('email').trim()
    .isEmail().withMessage("Invaldi email adress"),

    body('age').trim()
    .optional()
    .isInt({min: 8, max: 120}).withMessage("Age must be between 18 and 120")
    .toInt(),//cpnverts to integer

    body('bio').trim()
    .optional()
    .isLength({ max: 200 }).withMessage(`Bio must not exceed 200 characters`),
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
            console.log("Validation Errors:", errors.array());
            return res.status(400).render("createUser", {
                title: "Create User",
                errors: errors.array()
            });
        }

        const {firstName, lastName,email, age, bio} = req.body;
        userStorage.addUser({firstName, lastName,email, age, bio});
        res.redirect('/')
    }
]

exports.usersUpdateGet = (req, res) => {
    const user = userStorage.getUser(req.params.id);
    res.render('updateUser', {
        title: "Update User",
        user: user
    });
};

exports.usersUpdatePost =[
    validateUser,
    (req, res) => {
        const user = userStorage.getUser(req.params.id);
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).render("updateUser", {
                title: "Update User",
                user: user,
                errors: errors.array()
            });
        }

        const {firstName, lastName} = req.body;
        userStorage.updateUser(req.params.id,{firstName, lastName});
        res.redirect('/')
    }
]

exports.usersDeletePost = (req, res) => {
    userStorage.deleteUser(req.params.id);
    res.redirect('/')
};

exports.searchUser = (req, res) => {
    //get query parameters from the request
    const { name, email} = req.query;
    //check if search parameters are provided
    if (!name && email) {
        return res.status(400).render('search', {
            title: 'Search Results',
            error: "Please provide a name or email to search"
        })
    }

    const users = Object.values(userStorage.storage);//converts storage object to array
    const results = users.filter((user) => {
        return(
            (name && user.firstName.toLowerCase().includes(name.toLowerCase)) || 
            (email && user.email && user.email.toLowerCase() === email.toLowerCase())
        )
    });

    res.render("search", {
        title: 'Search Results',
        error: results.length === 0 ? "No matching users found" : null,
        users: results
    })
};