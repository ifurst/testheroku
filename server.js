const express = require('express')
const hbs = require('hbs')

const app = express()

const port = process.env.PORT || 3000

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getYear', () => new Date().getFullYear() )
hbs.registerHelper('screamit', (text) => text.toUpperCase() )

app.get('/about', (q, r) => {
    r.render('about.hbs', {
        title: 'About Page',
        desc: 'This is an awesome page!',
        year: new Date().getFullYear()
    })
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'Home Page',
        desc: 'Welcome to home page!',
        year: new Date().getFullYear()
    })
})

app.get('/j', (q, r) => {
    return r.send( {
        name: 'hello',
        age: 23,
        properties: [ {
            name: 'house',
            address: 'heaven'
        }, {
            name: 'car',
            address: 'former'
        }
    ]
    })
})

app.get('/bad', (q, r) => {
    r.send({
        errorMessage: "Unable to handle request"
    })
})

app.get('/errorMessage', (q, r) => {
    return r.send("Not found --- Error message")
})


app.listen(port, () => {
    console.log(`App listening in port ${port}!`)
})