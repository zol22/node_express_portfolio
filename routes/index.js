const express = require('express');
const router = express.Router();
const { projects } = require("../data.json");

/* Index route (/) to render the "Home" page with the local set to data.projects.
    Locals variables('projects') -> This is the name for variables we want the view to have access
    to when it's being rendered.
*/
router.get('/', (req, res) => {
   
    res.render('index',{ projects });
    
});

/* About route (/about) to render the "About page. */
router.get('/about', (req, res) => {
   
    res.render('about');
    
});

/* Dynamic "project" routes (/projects/:id) based on the id of the project that render
   a customized version of the pug project template to show off each project. Which means
   adding data or "locals", as an object that contains data to be passed to the pug template.
*/
router.get('/projects/:id', (req, res, next) => {
    const { id } = req.params; // const id = req.params.id
    console.log("id: ", id);
    const currentProject =  projects[id];
    console.log(currentProject);


    if (currentProject){
          res.render('project',{ project: currentProject});
    } else{
        const err = new Error('Project file doesnt not exist');
        console.log('Project not found');
        err.status = 505;
        next(err);
    }
  
    
});


module.exports = router; 
// Mapping a router and all logic that's is required to map /index.
// Its basically what you export when a file is required