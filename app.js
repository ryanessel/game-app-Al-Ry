// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');



// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

const app = express();
require('./config/session.config')(app)
// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
const projectName = 'game-forum-app';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;
//makes it so that you can access the current USER avaialibe in all the HBS files
app.use((req, res, next) => {
    res.locals.currentUser = req.session.currentUser;
    next();
});
// 👇 Start handling routes here

//--------- this can be whaterver. its when you call the local host -- this is about 
//         |
app.use('/', require('./routes/index'));
app.use('/', require(`./routes/comments.routes`));
app.use('/', require(`./routes/threads.route`));
app.use(`/`, require(`./routes/auth.routes`))


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
