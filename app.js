const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter');

//middlewares
app.use(express.urlencoded({extended: false}));//sets form data to the req.body

app.set('view engine', 'ejs');
app.use('/', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));