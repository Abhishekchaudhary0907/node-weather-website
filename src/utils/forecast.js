const request = require('postman-request');

const forecast =(latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=721b844d8ed758156006731e8a315700&query='+latitude+','+longitude+'&units=m'

    request({ url, json:true},(error,{body}) => {
        if(error){
            callback('unable to connect to the weather services',undefined);
        }else if(body.error){
            callback('unable to fine location',undefined);
        }else{
            callback(undefined,
                body.current.weather_descriptions[0]+" ."+" Current temparature is "
                +body.current.temperature + " and Feels like temparature is "+
                body.current.feelslike+". Humidity is "+body.current.humidity+"."
            )
        }
    })
}

module.exports = forecast;