//Imports and sets up express
const express = require('express');
const app = require('../app');

//Changes the standard app.get and app.use calls to refer to the router
const router = express.Router();

//Imports the project data in data.json
const {projects} = require('../data/data.json');

//Renders the root route
router.get('/', (req, res) => {
    res.render('index', {projects});
});

//Renders the about route
router.get('/about', (req, res) => {
    res.render('about', projects);
});

//Renders individual project pages by looking for a project whose ID matches the url parameter string
router.get('/projects/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );

    //Checks to see if the url contains a valid project ID. 
    //If not, throws 404 error and passes it to the global error handler.
    if (project) { //Changed these param to 'test' to check the 500 error handler.
        return res.render('project', { project });
      } else {
            const err = new Error();
            err.status = 404;
            err.message = `The project you requested doesn't exist (yet)!`;
            next(err);
        }
});


//404 Error Handler
router.use('/', (req, res, next) => {
     const err = new Error();
     err.status = 404;
     err.message = "This page does not exist.";
     res.render('page-not-found', {err} );
     console.log(`${err.status} error handler called. ${err.message}`);
 });

//Global Error Handler
router.use((err, req, res, next) => {
    if(err.status === 404) {
        res.status(404).render('page-not-found', {err});
        console.log('404 error handler called - This page does not exist.')
    } else {
        console.log('500 error handler called - Something went wrong on the server.')
        err.message = `Uh-oh! Something went wrong on the server.`;
        err.status = 500;
        res.render('error', {err});
    }

});

//Exports the router to be used by app.js
module.exports = router;