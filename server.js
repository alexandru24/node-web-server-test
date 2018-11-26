// create instances for express and hbs(handlebars) in order to get access to their properties and methods
const express = require('express')
const hbs = require('hbs')
// initiate express
const app = express()
const fs = require('fs')

// use partials
hbs.registerPartials(__dirname + '/views/partials')
// tell express that i want to use template engines
app.set('view engine', 'hbs')


// method available through handlebars that allows me to insert functions in templates
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
})

hbs.registerHelper('makeItUpper', (text)=>{
    return text.toUpperCase()
})

// using express midleware
app.use((req, res, next)=>{
    let now = new Date().toString()
    let log = `time: ${now} - ${req.method} - ${req.path}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('There was an error in writing the data')
        }
    })
    next()
})

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs')
// })

// serve the contents of a static folder
app.use(express.static(__dirname + '/public'))

// use the get method to render the specified page and inject values
app.get('/', (req, res)=>{
    res.render('index.hbs', {
        titlePage: 'Welcome to the home page',
        text: 'Some text to show'
    })
})
// use the get method to render the specified page and inject values
app.get('/info', (req, res)=>{
   res.render('info.hbs', {
       titlePage: 'Welcome to the info page',
       bodyDescription: 'Some text to render'
   })
})


app.get('/error', (req, res)=>{
    res.send({
        error: 'NO_RESULT',
        message: 'Could not find that page'
    })
})


// use the listen method in order to keep the app live
app.listen(3000, ()=>{
    console.log('App is running on port 3000')
})