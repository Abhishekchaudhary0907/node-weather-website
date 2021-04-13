const { response } = require("express")

console.log("Js file runnig")

fetch('http://localhost:3000/weather?address=khalilabad').then((response) => {
    response.json.then((data) => {
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data.location);
            console.log(data.forecast);
        }
    })
})