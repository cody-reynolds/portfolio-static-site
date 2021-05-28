const express = require('express');
const app = require('../app');
const router = express.Router();
const {projects} = require('../data/data.json');


router.get('/', (req, res) => {
    res.render('index', {projects});
});

router.get('/about', (req, res) => {
    res.render('about', projects);
});

router.get('/projects/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );

    if (project) {
        return res.render('project', { project });
      } else {
            const err = new Error();
            err.status = 404;
            err.message = `The project you requested doesn't exist (yet)!`;
            next(err);
        }
});


//404 Error Handler
router.use((req, res, next) => {
     console.log('404 error handler called')
     const err = new Error();
     err.status = 404;
     err.message = "This page does not exist.";
     console.log(err.message);
     console.log(err.status);
     res.render('page-not-found', {err} );
 });

//Global Error Handler
router.use((err, req, res, next) => {
    if(err.status === 404) {
        res.status(404).render('page-not-found', {err});
    } else {
        console.log("Something broke!")
    }

});

module.exports = router;