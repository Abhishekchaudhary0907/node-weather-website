const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const path = require('path');
const hbs = require('hbs');

const app = express();
// const publicDirectoryPath = path.join(__dirname,'../public');
// app.use(express.static(publicDirectoryPath));

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname,'../public'));
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

app.set('view engine','hbs');
app.set('views',viewsPath);

hbs.registerPartials(partialsPath);

app.get('',(req,res) => {
    res.render('index',{
        title:'weather app',
        name : 'abhishek'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'about me',
        name : 'abhishek chaudhary'
    })
})

// app.get('*',(req,res) => {
//     res.render('404',{
//         title: '404',
//         name : 'abhis',
//         errorMessage:"page not found"
//     })
// })

app.get('/help',(req, res) => {
    res.render('help',{
        title:'help',
        msg:"how can i help you"
    })
})

app.get('/product',(req,res) => {
    if(!req.query.search){
        return res.send({
            error:"provide search query"
        })
    }
    console.log(req.query);
    res.send({
        result:[]
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:"please provide address"
        });
    }

    geocode(req.query.address,(error, {latitude,longitude,location} = {}) => {

        if(error){
          return res.send({
              error:error
          })
        }
          
          forecast(latitude, longitude, (error, forecast) => {
      
            if(error){
              return res.send({
                  error:error
              })
            }
            
            res.send({
                location:location,
                forecast:forecast
            })
          })
      
      })
})

app.listen(3000,() => {
    console.log("express server is running at port number 3000");
})