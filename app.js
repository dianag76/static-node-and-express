const express = require('express');
const app = express();
const data = require('./data.json');
const port = 3000;


//middleware 
app.set('view engine', 'pug');
app.use("/static", express.static('public'));

//Routes 
app.get('/', (req, res) => {
  res.render('index');
});

// app.get('/about', (req, res) => {
    // res.render('about', { about })
// });
// 
// 
// app.get('/projects/:id', (req, res, next) => {
    // const projectId = +req.params.id;
    // const project = data[projectId]
// 
    // if (project) {
        // res.render('project', { project });
    // } else {
        // next();
    // }
// });
// 
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})


//Handling errors
app.use((req, res, next) => {
    const err = new Error('page not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log('Global error', err)
        if (err.status === 404) {
        res.status(404)

         } else {
        err.message = err.message || "Oh no! It looks like something went wrong with the server"
        res.status(err.status || 500)
         }
})




