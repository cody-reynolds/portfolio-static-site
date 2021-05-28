const express = require('express');
const router = express.Router();
const {projects} = require('../data/data.json');


router.get('/', (req, res) => {
    res.render('index', {projects});
});

router.get('/about', (req, res) => {
    res.render('about', projects);
});

router.get('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );

    if (project) {
        res.render('project', { project });
      } else {
        res.send('<h1>Not found</h1>');
      }
});

module.exports = router;