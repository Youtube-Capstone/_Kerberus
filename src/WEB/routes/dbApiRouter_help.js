let express = require('express')
let dbApiRouter_temp = express.Router()
let mysql = require('mysql')
let ChartMaker = require('./ChartMaker.js')
let async = require('async')
//test :  /dbApi_help/getSentimental

let pool = mysql.createPool({
    host     : 'youtube-db-plz.chrss0yvchv7.ap-northeast-1.rds.amazonaws.com',
    user     : 'kbrs',
    password : 'tjdwns12!!',
    port     : 3306,
    database : 'kbrs_db',
    connectionLimit: 100, 
    connectTimeout: 10000,
    waitForConnections: true,
    queueLimit: 0
})

dbApiRouter_temp.get('/getSentimental', (req, res) => {
    let model_name = req.query.model_name
    let num_of_model = 1
    // console.log(rows['MODEL_NAME'])
    let good_array = new Array(num_of_model).fill(0)
    let bad_array = new Array(num_of_model).fill(0)

    let attribute_reply_table_name = "REPLY_REF_TABLE"
    let attribute_sentimential = "SENTIMENTAL"
    for (let index = 0; index < num_of_model; index++) {
        // let model_name = rows[index]['MODEL_NAME']
        QUERY_GET_TABLE_NAME_BY_MODEL = `select ${attribute_reply_table_name} from MEDIA_INFO where MODEL_NAME='${model_name}'`
        pool.query(QUERY_GET_TABLE_NAME_BY_MODEL, (err2, rows2, fields2) => {
            if(err2) {
                console.log(err2)
                return res.status(500).send(err2)
            }
            else {
                let function_array = []
                for (let table_name_idx=0; table_name_idx < rows2.length; table_name_idx++) {
                    function_array.push(
                        function(callback){
                            reply_table_name = rows2[table_name_idx][attribute_reply_table_name]
                            QUERY_GET_SETIMENTIAL = `select ${attribute_sentimential} from ${reply_table_name}`
                            pool.query(QUERY_GET_SETIMENTIAL, (err_, rows_, fields_) => {
                                if (err_) {
                                    console.log(err_)
                                    return res.status(500).send(err_)
                                }
                                else {
                                    for (let sentimental_idx=0; sentimental_idx < rows_.length; sentimental_idx++) {
                                        let sentimental = rows_[sentimental_idx][attribute_sentimential]
                                        if (sentimental == null) {continue}
                                        else if(sentimental < 0) {
                                            bad_array[index] = bad_array[index] + sentimental
                                        }
                                        else if(sentimental > 0) {
                                            good_array[index] = good_array[index] + sentimental
                                        }
                                    }
                                    callback(null, 1)
                                }
                            })
                        })
                    }
                    async.parallel(function_array, function(err, results){
                        if(err) {
                            console.log(err)
                            return res.status(500).send(err)
                        }
                        console.log(model_name, good_array[index], bad_array[index])
                        result = {
                            model_name : model_name, 
                            good : good_array[index],
                            bad : bad_array[index]
                        }
                        res.json(result)
                        res.end()
                        
                    })
                }
            })
        }
})

dbApiRouter_temp.get('/getModel.json', (req, res) => {
    QUERY_GET_MODEL_NAME = `select distinct MODEL_NAME from MEDIA_INFO`
    pool.query(QUERY_GET_MODEL_NAME, (err, rows, fields) => {
        if(err) {
            console.log(err)
            return res.status(500).send(err)
        }
        else {
            console.log(QUERY_GET_MODEL_NAME + "\n")
            console.log(rows)
            res.json(rows)
            res.end()


        }
    })
    
    QUERY_MODEL_TABLE = 'select * from MODEL_INFO'
    pool.query(QUERY_MODEL_TABLE, (err, rows, fields) => {
        if(err) {
            console.log(err)
            return res.status(500).send(err)
        }
        else {
            console.log(QUERY_MODEL_TABLE + "\n")
            console.log(rows)
            res.json(rows)
            res.end()


        }
    })
})

dbApiRouter_temp.get('/getModelPictureURL.json', (req, res) => {
    QUERY_MODEL_N_PICTURE = `select MODEL_NAME, PICTURE_URL from MODEL_INFO`
    pool.query(QUERY_MODEL_N_PICTURE, (err, rows, fields) => {
        if(err) {
            console.log(err)
            return res.status(500).send(err)
        }
        else {
            console.log(rows)
            res.json(rows)
            res.end()

        }
    })
})

dbApiRouter_temp.get('/getTotalRows2.json', (req,res) => {

    let TIME_PARTITION = req.query.time
    let QUERY_TOTAL_TABLE_ROWS = `SELECT WHOLE_DATA_COUNT, CRAWLED_DATE FROM LOG_INFO LIMIT ${TIME_PARTITION}`
    
    pool.query(QUERY_TOTAL_TABLE_ROWS, (err, rows, fields) => {

        if(err){

            console.log(err)
            return res.status(500).send(err)

        }
        else{
            
            let PROCESSED_CHART_DATA = new ChartMaker("splineArea")

            let dataArray = []

            for (let index = 0; index < rows.length; index++) {
                
                let dataPoint = {}

                dataPoint.x = rows[index]["CRAWLED_DATE"]
                dataPoint.y = rows[index]["WHOLE_DATA_COUNT"]

                dataArray.push(dataPoint)

            }
            
            PROCESSED_CHART_DATA.set_Data_dataPoints(dataArray)
            PROCESSED_CHART_DATA.set_Data_Color("hsl(225, 6%, 13%)")
            PROCESSED_CHART_DATA.set_AxisX_interLacedColor("hsl(0, 0%, 100%)")
            PROCESSED_CHART_DATA.set_Data_MarkerSize(6)
            PROCESSED_CHART_DATA.set_AxisX_lineColor("hsl(0, 0%, 26%)")
            PROCESSED_CHART_DATA.set_AxisX_lineThickness(2)
            PROCESSED_CHART_DATA.set_AxisY_lineThickness(2)
            PROCESSED_CHART_DATA.set_AxisY_lineColor("hsl(0, 0%, 26%)")
            PROCESSED_CHART_DATA.set_Data_fillOpacity(0.85)

            if(TIME_PARTITION === '7'){
                PROCESSED_CHART_DATA._ChartStruct.timePartition = "1주"
            }
            else if(TIME_PARTITION === '14'){
                PROCESSED_CHART_DATA._ChartStruct.timePartition = "2주"
            }
            else{
                PROCESSED_CHART_DATA._ChartStruct.timePartition = "한달"
            }

            PROCESSED_CHART_DATA._ChartStruct.status = 1

            res.json(PROCESSED_CHART_DATA.get_ChartStruct())
            res.end()
            
        }

    })

})

module.exports = dbApiRouter_temp 