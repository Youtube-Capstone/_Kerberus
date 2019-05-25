let express = require('express')
let path = require('path')
let cors = require('cors')
let fs = require('fs')

let dbApiRouter = require('./routes/dbApiRouter')
let dbApiRouter_help = require('./routes/dbApiRouter_help')
let app = express()

app.set('port', process.env.PORT || 3000);

app.use(cors())
app.use('/dbApi',dbApiRouter)
app.use('/dbApi_help',dbApiRouter_help)
app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res) => {

    res.sendFile(`public/index.html`,{root : __dirname}, (err) => {
        if (err){
            return res.status(500).send('index.html response error')
        }
    })

});

app.listen(app.get('port'), ()=>{
    console.log('Express server listening on port ' + app.get('port'));
})