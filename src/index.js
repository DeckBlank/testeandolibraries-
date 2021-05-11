const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const compression = require('compression');
const log4js = require('log4js');


const app = express();
const app2 = express();

log4js.configure({
    appenders: {
        miLoggerConsole: {type:"console"},
        miLoggerFile: {type:"file",filename:'info.log'}
    },
    categories:{
        log:{ appenders:['miLoggerConsole'],level:process.env.NODE_ENV=='production'?'fatal':'debug'},
        default:{ appenders:['miLoggerFile'],level:'error'}
    }
});
const logger = log4js.getLogger()



app.use(compression());

let respuesta = []
for (let index = 0; index < 10000; index++) {
    respuesta.push({valor:index})
}
logger.debug()

const testeo = (req,res,next) => {
        res.json(respuesta);
}
app.get('/saludo',testeo);
app2.get('/saludo',testeo);

app.get('/error',(req,res)=>{
    try {
        res.json(nodefined)
    } catch (error) {
        logger.fatal(error)
        res.json('algo salio mal')
    }
});

const PORT = process.env.PORT|3000;
const PORT2 = process.env.PORT2|4000;

app.listen(PORT,()=>{
    console.log(`app con compression en ${PORT}`);
})

app2.listen(PORT2,()=>{
    console.log(`app sin compression en ${PORT2}`);
})