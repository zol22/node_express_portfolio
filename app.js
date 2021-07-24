const express = require('express'); // Creates an express application.
const app = express(); // Top level function exported by the express module


// Built-in Static middleware function
app.use('/static',express.static('public'));// Use a static route and the express.static method to serve the static files located in the public folder.
 
app.set('view engine', 'pug'); // To use the pug template engine

const routes = require("./routes"); //variable routes will get whatever is being exported from the module in index.js. Require a module (module is the global scope variable inside a file)
app.use(routes);// to run middleware in response to request in a specific route


 /*ERROR HANDLERS */

 // 404 handler to catch undefined or non-existent route requests- Middleware for 404 not found error
 //This is the best place to put this 404 middleware: after all the other routes have been declared
 app.use((req, res, next) => {
    console.log('404 error handler called');
    const err = new Error();
    err.status = 404;
    err.message = "Oops! It looks like the page you're looking for does not exist."
    //next(err);
    res.render('not-found', { err });
})

// Global error handler */
app.use((err,req,res,next) => {

    if (err){
        console.log('Global error handler called', err);
    }
    
    if (err.status === 404){
        console.log('404 error handler called');
        res.status(404).render('not-found',{ err });
    } else{
        console.log('500 error handler called');
        err.message = err.message || `Oops!  It looks like something wen wrong on the server. `;
        res.status(err.status || 500).render('error', { err });
    }

});


app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});