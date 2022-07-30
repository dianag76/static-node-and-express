const express = require('express');
const app = express();
const { projects } = require("./data.json")
const router = express.Router();
const port = 3000;


// middleware 
app.set('view engine', 'pug');
app.use('/static', express.static('public'));


// Routes 
app.get('/', function(req, res, next) {
  res.render('index', { projects });
});

app.get('/about', (req, res) => {
    res.render('about');
});
// 
// 
app.get('/projects/:id', function(req, res, next) {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId);

    if (project) {
        res.render('project', { project });
    } else {
        // res.sendStatus(404);
        const err = new Error("Oops.Project not found")
        err.status = 404;
        console.log(err);
        next(err);
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});

// Handling errors
app.use((err, req, res, next) => {
    if(err){
        const err = new Error("Oops.Page not found")
        err.status = 404;
        console.log(err);
        next(err);
    }
});

module.exports = router;