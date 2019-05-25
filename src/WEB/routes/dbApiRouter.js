/*
 * dpApiRouter.js
 * 특정 API 콜에 대한 REQUEST , RESPONSE로 이용.
 * 리액트 클라이언트는 해당 응답을 이용하여 필요한 UI를 구성한다. (with Redux)
 */

let express = require('express')
let dbApiRouter = express.Router()
let mysql = require('mysql')
let ChartMaker = require('./ChartMaker.js')
let bodyParser = require('body-parser')
let async = require('async')

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

dbApiRouter.use(bodyParser.urlencoded({ extended: false }))
dbApiRouter.use(bodyParser.json())

dbApiRouter.get('/getTotalRows.json', (req,res) => {

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

dbApiRouter.get('/userAccessed', (req,res) => {

    let ACCESSED_DATE = new Date().toJSON().slice(0,10)
    console.log(`ACCESSED_DATE : ${ACCESSED_DATE}`)
    let QUERY_EXISTING_DATE = `SELECT ACCESSED_DATE , ACCESSED_COUNT FROM DAY_COUNT;`
    
    pool.query(QUERY_EXISTING_DATE , (err, rows, fields) => {

        if(err){

            console.log(err)
            return res.status(500).send(err)
            
        }

        else{

            console.log(rows)

            if(rows.length == 0){

                let QUERY_INITIAL_ACCESSED_COUNT = `INSERT INTO DAY_COUNT VALUES (1, "${ACCESSED_DATE}");`
    
                pool.query(QUERY_INITIAL_ACCESSED_COUNT,(err, rows, fields) => {
    
                    if(err){

                        console.log(err)
                        return res.status(500).send(err)
                    }
    
                    else{
    
                        console.log("Successfully Inserted at New Date")
                        
                    }

                })

            }

            else{

                let slicedDates = [];

                for (let index = 0; index < rows.length; index++) {
                    let dayAfter = new Date(rows[index]["ACCESSED_DATE"])
                    dayAfter.setDate(dayAfter.getDate()+1)
                    dayAfter = dayAfter.toJSON().slice(0,10)
                    slicedDates.push(dayAfter)

                }

                console.log(slicedDates)

                let beforeDate = (new Date(ACCESSED_DATE).getDate())

                console.log(`beforeDate : ${beforeDate} type : ${typeof beforeDate.toString()}`)
                
                if(beforeDate.toString().length === 1){
                    beforeDate = ACCESSED_DATE.slice(0,8).concat(`0${beforeDate}`)
                }
                else{
                    beforeDate = ACCESSED_DATE.slice(0,8).concat(`${beforeDate}`)
                }
                console.log(`beforeDate_2 : ${beforeDate}`)

                let pos = slicedDates.indexOf(beforeDate)

                if(pos >= 0){

                    let QUERY_UPDATE_ACCESSED_COUNT = `UPDATE DAY_COUNT SET ACCESSED_COUNT=${(rows[pos]["ACCESSED_COUNT"]+1)} WHERE ACCESSED_DATE="${ACCESSED_DATE}"`

                    pool.query(QUERY_UPDATE_ACCESSED_COUNT,(err, rows, fields) => {

                        if(err){
                            
                            console.log(err)
                            return res.status(500).send(err)
                            
                        }
                        
                        console.log(`Successfully Updated at ${ACCESSED_DATE}`)
                        
                    })

                }
                else{

                    let QUERY_INSERT_ACCESSED_DATE = `INSERT INTO DAY_COUNT VALUES (1,"${ACCESSED_DATE}")`
        
                    pool.query(QUERY_INSERT_ACCESSED_DATE, (err, rows, fields) => {
                
                        if(err){

                            console.log(err)
                            return res.status(500).send(err)
                            
                        }
                       
                        console.log(`Successfully Inserted at ${ACCESSED_DATE}`)
                       
                    })
        
                   }
        
            }
            res.end()
        }

    })

})

dbApiRouter.get('/getDayCount.json' , (req, res) => {

    let TIME_PARTITION = req.query.time
    let QUERY_DAYCOUNT_TABLE_ROWS = `SELECT ACCESSED_COUNT, ACCESSED_DATE FROM DAY_COUNT ORDER BY ACCESSED_DATE desc LIMIT ${TIME_PARTITION}`
    
    pool.query(QUERY_DAYCOUNT_TABLE_ROWS, (err, rows, fields) => {

        if(err){

            console.log(err)
            return res.status(500).send(err)

        }

        else{
            
            let PROCESSED_CHART_DATA = new ChartMaker("column")

            let dataArray = []

            for (let index = 0; index < rows.length; index++) {
                
                let dataPoint = {}

                dataPoint.x = rows[index]["ACCESSED_DATE"]
                dataPoint.y = rows[index]["ACCESSED_COUNT"]

                dataArray.push(dataPoint)

            }
            
            PROCESSED_CHART_DATA.set_Data_dataPoints(dataArray)
            PROCESSED_CHART_DATA.set_Data_Color("hsl(207, 76%, 38%)")
            PROCESSED_CHART_DATA.set_AxisX_interLacedColor("hsl(0, 0%, 100%)")
            PROCESSED_CHART_DATA.set_Data_MarkerSize(6)
            PROCESSED_CHART_DATA.set_AxisX_lineColor("hsl(0, 0%, 26%)")
            PROCESSED_CHART_DATA.set_AxisX_lineThickness(1)
            PROCESSED_CHART_DATA.set_AxisY_lineThickness(1)
            PROCESSED_CHART_DATA.set_AxisY_lineColor("hsl(0, 0%, 26%)")
            PROCESSED_CHART_DATA.set_Data_fillOpacity(1)

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
            PROCESSED_CHART_DATA._ChartStruct.data[0].indexLabel = "{y}"
            PROCESSED_CHART_DATA._ChartStruct.data[0].indexLabelFontSize = 12
            PROCESSED_CHART_DATA._ChartStruct.data[0].indexLabelFontFamily = "NotoSansKR"
            PROCESSED_CHART_DATA._ChartStruct.data[0].indexLabelPlacement = "outside"
            PROCESSED_CHART_DATA._ChartStruct.data[0].indexLabelOrientation = "horizontal"
            PROCESSED_CHART_DATA._ChartStruct.data[0].bevelEnabled = true
            res.json(PROCESSED_CHART_DATA.get_ChartStruct())
            res.end()
        }
        
    })

})

dbApiRouter.get('/getModelNames.json',(req,res) => {

    const QUERY_MODEL_NAMES = `select distinct MODEL_NAME from MEDIA_INFO;`

    pool.query(QUERY_MODEL_NAMES , (err, rows, fields) => {

        if(err){

            console.log(err)
            return res.status(500).send(err)
            
        }
        else{

            console.log(rows)
            res.json(rows)
            res.end()
            
        }


    })

})

dbApiRouter.get('/getCategoryLists.json',(req , res) => {

    const QUERY_CATEGORY_LISTS = `SELECT DISTINCT DA_CATEGORY FROM MEDIA_INFO;`

    pool.query(QUERY_CATEGORY_LISTS, (err, rows, fields) => {

        if(err){

            console.log(err)
            return res.status(500).send(err)

        }
        else{

            console.log(rows)
            res.json(rows)
            res.end()

        }

    })

})

dbApiRouter.get('/getNumOfChannelCrawled.json',(req,res) => {

    const QUERY_NUM_CHANNEL_CRAWLED = `SELECT CATEGORY, COUNT(CATEGORY) FROM MEDIA_INFO GROUP BY CATEGORY;`

    pool.query(QUERY_NUM_CHANNEL_CRAWLED, (err, rows, fields) => {

        if(err){

            console.log(err)
            return res.status(500).send(err)

        }
        else{

            let dataArray = []

            let sumRows = 0

            for (let index = 0; index < rows.length; index++) {

                sumRows = sumRows + rows[index]["COUNT(CATEGORY)"]

            }

            for (let index = 0; index < rows.length; index++) {

                let dataObj = {}

                dataObj.label = rows[index]["CATEGORY"]
                dataObj.y = ((rows[index]["COUNT(CATEGORY)"] / sumRows) * 100).toFixed(2)

                dataArray.push(dataObj)

            }

            let pieChartStruct = {

                status : 1,
                animationEnabled : true,
                interactivityEnabled : true,
                animationDuration : 1000,
                height : 200,
                legend: {
                    fontFamily: "NotoSansKR",
                    fontSize: 10,
                },
                data : [{
                    type: "pie",
                    startAngle: 75,
                    toolTipContent: "<b>{label}: {y}%</b>",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 12,
                    indexLabelFontFamily : "NotoSansKR",
                    indexLabelFontWeight : "bold",
                    indexLabel: "{label} - {y}%",
                    dataPoints : dataArray
                }]

            }

            res.json(pieChartStruct)
            res.end()

        }

    })

})


dbApiRouter.get('/getProductFamilyData.json',(req,res) => {

    const QUERY_PRODUCT_FAMILY_DATA = `select COUNT(MODEL_NAME) , MODEL_NAME from MEDIA_INFO group by MODEL_NAME;`

    pool.query(QUERY_PRODUCT_FAMILY_DATA, (err, rows, fields) => {

        if(err){

            console.log(err)
            return res.status(500).send(err)

        }
        else{

            let dataArray = []
            console.log(rows)
            let sumRows = 0

            for (let index = 0; index < rows.length; index++) {

                sumRows = sumRows + rows[index]["COUNT(MODEL_NAME)"]

            }
            
        
            let notebook_Y = 0
            let tablet_Y = 0
            let cellPhone_Y = 0

            for (let index = 0; index < rows.length; index++) {

               if( /(갤럭시 S9|아이폰 XS|엘지 G7)/.test(rows[index]["MODEL_NAME"])){
                   cellPhone_Y = cellPhone_Y + rows[index]["COUNT(MODEL_NAME)"]
               }

               if(/(삼성 노트북 9 ALWAYS|엘지 그램)/.test(rows[index]["MODEL_NAME"])){
                    notebook_Y = notebook_Y + rows[index]["COUNT(MODEL_NAME)"]
               }
               
               if(/(갤럭시탭 S4|아이패드 6세대|아이패드 프로 3세대)/.test(rows[index]["MODEL_NAME"])){
                    tablet_Y = tablet_Y + rows[index]["COUNT(MODEL_NAME)"]
                }

            }

            console.log(notebook_Y)

            let dataObj = {
                y : (( notebook_Y / sumRows ) * 100).toFixed(2),
                label : "노트북",
                numof : notebook_Y 
            }
            let dataObj2 = {
                y : (( cellPhone_Y / sumRows ) * 100).toFixed(2),
                label : "휴대폰", 
                numof : cellPhone_Y
            }
            let dataObj3 = {
                y : (( tablet_Y / sumRows ) * 100).toFixed(2),
                label : "태블릿", 
                numof : tablet_Y
            }

            dataArray.push(dataObj,dataObj2,dataObj3)

            let doughnutChartStruct = {

                status : 1,
                animationEnabled : true,
                interactivityEnabled : true,
                animationDuration : 1000,
                height : 200,
                
                data : [{
                    startAngle: 75,
                    toolTipContent: "<b>{label}</b>: {numof}개의 영상을 수집 및 분석",
                    indexLabelFontSize: 12,
                    indexLabelFontFamily : "NotoSansKR",
                    indexLabelPlacement : "outside",
                    indexLabel: "{label} : {y}%",
                    type: "doughnut",
                    dataPoints : dataArray
                }],


            }

            res.json(doughnutChartStruct)
            res.end()

        }

    })

})

dbApiRouter.get('/category/getCountVideosByCategory.json',(req,res) => {

    let QUERY_CATEGORY = req.query.category
    const QUERY_COUNT_VIDEOS_BY_CATEGORY = `select distinct MODEL_NAME, COUNT(MODEL_NAME) FROM MEDIA_INFO where DA_CATEGORY="${QUERY_CATEGORY}" group by MODEL_NAME;`

    pool.query(QUERY_COUNT_VIDEOS_BY_CATEGORY, (err, rows, fields) => {

        if(err){

            console.log(err)
            return res.status(500).send(err)

        }
        else{

            let dataArray = []

            let sumRows = 0

            for (let index = 0; index < rows.length; index++) {

                sumRows = sumRows + rows[index]["COUNT(MODEL_NAME)"]

            }

            for (let index = 0; index < rows.length; index++) {

                let dataObj = {}

                dataObj.indexLabel = rows[index]["MODEL_NAME"]
                dataObj.y = ((rows[index]["COUNT(MODEL_NAME)"] / sumRows) * 100).toFixed(2)
                dataObj.y_num = (rows[index]["COUNT(MODEL_NAME)"])
                dataArray.push(dataObj)

            }

            let doughnutChartStruct = {

                status : 1,
                animationEnabled : true,
                interactivityEnabled : true,
                animationDuration : 1000,
                height : 200,
                data : [{
                    startAngle: 75,
                    toolTipContent: "<b>{indexLabel}</b>: {y}%",
                    indexLabelFontSize: 12,
                    indexLabelFontFamily : "NotoSansKR",
                    indexLabelPlacement : "outside",
                    indexLabel: "{y}%",
                    type: "doughnut",
                    dataPoints : dataArray
                }],


            }

            res.json(doughnutChartStruct)
            res.end()

        }

    })

})

dbApiRouter.get('/compare/getProductFamilyLists.json',(req,res) => {
    let QUERY_FAMILY_LIST = `SELECT DISTINCT PRODUCT_TYPE_OF_MODEL FROM MODEL_INFO;`
    
    pool.query(QUERY_FAMILY_LIST,(err,rows) => {

        if(err){
            console.log(err)
            return res.status(500).send(err)
        }
        else{

            console.log(rows)
            res.json({
                status : 1,
                ProductFamily : rows.reduce((acc,curr)=>{
                    return acc.concat(curr["PRODUCT_TYPE_OF_MODEL"])
                },[])
            })
            res.end()

        }

    })

    

})

dbApiRouter.get('/compare/getProductListsByFamily.json',(req,res)=>{

    let QUERY_FAMILY = req.query.family
    let QUERY_PRODUCT_LISTS_BY_FAMILY = `SELECT MODEL_NAME FROM MODEL_INFO WHERE PRODUCT_TYPE_OF_MODEL='${QUERY_FAMILY.toLowerCase()}';`
    // family에 속하는 제품 목록 쿼리

    pool.query(QUERY_PRODUCT_LISTS_BY_FAMILY,(err,rows) => {

        if(err){
            console.log(err)
            return res.status(500).send(err)
        }
        else{

            console.log(rows)
            res.json({
                status : 1,
                ProductLists : rows.reduce((acc,curr) => {
                    return acc.concat(curr['MODEL_NAME'])
                },[])
            })
            res.end()

        }

    })

})

dbApiRouter.get('/category/getSumOfReplysAboutModelsByCategory.json',(req,res) => {

    let QUERY_CATEGORY = req.query.category
    const QUERY_SUM_REPLYS_ABOUT_MODELS_BY_CATEOGRY = `SELECT MODEL_NAME, SUM(NUM_OF_REPLY) from MEDIA_INFO WHERE DA_CATEGORY="${QUERY_CATEGORY}" group by MODEL_NAME;`

    pool.query(QUERY_SUM_REPLYS_ABOUT_MODELS_BY_CATEOGRY, (err, rows, fields) => {

        if(err){

            console.log(err)
            return res.status(500).send(err)

        }
        else{

            let dataArray = []

            for (let index = 0; index < rows.length; index++) {

                let dataObj = {}

                dataObj.x = (index+1)
                dataObj.y = (rows[index]["SUM(NUM_OF_REPLY)"])
                dataObj.label = (rows[index]["MODEL_NAME"])
                dataArray.push(dataObj)

            }

            let columnChartStruct = {

                status : 1,
                animationEnabled : true,
                animationDuration : 1000,
                height : 200,
                axisY :{
                    gridThickness : 0,
                    interlacedColor : "",
                    labelFontFamily : "NotoSansKR",
                    labelFontColor : "hsl(200, 19%, 18%)",
                    labelFontWeight : "bold",
                    lineColor: "black" ,
                    lineThickness: 1
                },
                axisX :{
                    interlacedColor : "",
                    labelFontFamily : "NotoSansKR",
                    labelFontColor : "hsl(200, 19%, 18%)",
                    labelFontWeight : "bold",
                    lineColor: "black" ,
                    lineThickness: 1
                },
                data : [{
                    
                    bevelEnabled: true,
                    indexLabel : "{y}",
                    indexLabelFontSize: 12,
                    indexLabelFontWeight : "Bold",
                    indexLabelFontFamily : "NotoSansKR",
                    indexLabelPlacement : "outside",
                    indexLabelOrientation: "horizontal",
                    type: "column",
                    dataPoints : dataArray

                }],


            }

            res.json(columnChartStruct)
            res.end()

        }

    })

})

dbApiRouter.get('/category/getModelPictureURL.json',(req,res) => {

    const QUERY_MODEL_IMAGES = `SELECT MODEL_NAME , PICTURE_URL , GOOD , BAD FROM MODEL_INFO`

    pool.query(QUERY_MODEL_IMAGES, (err, rows, fields) => {

        if(err){

            console.log(err)
            return res.status(500).send(err)

        }
        else{

            let dataArray = []

            for (let index = 0; index < rows.length; index++) {

                let dataObj = {}

                dataObj.PICTURE_URL = (rows[index]["PICTURE_URL"])
                dataObj.MODEL_NAME = (rows[index]["MODEL_NAME"])
                dataObj.GOOD_TABLE = (rows[index]["GOOD"])
                dataObj.BAD_TABLE = (rows[index]["BAD"])
                dataArray.push(dataObj)

            }

            res.json({
                status : 1,
                data : dataArray
            })
            res.end()

        }

    })

})

dbApiRouter.get('/category/getUserPreference.json',(req,res) => {

    let QUERY_CATEGORY = req.query.category
    const QUERY_USER_PREFERENCE_BY_CATEGORY = `SELECT SUM(LIKES) , SUM(HATES) FROM MEDIA_INFO WHERE DA_CATEGORY="${QUERY_CATEGORY}";`

    pool.query(QUERY_USER_PREFERENCE_BY_CATEGORY, (err, rows, fields) => {

        if(err){

            console.log(err)
            return res.status(500).send(err)

        }
        else{

            let dataArray = []

            let sumPreference = 0

            sumPreference = rows[0]["SUM(LIKES)"] + rows[0]["SUM(HATES)"]

            dataArray.push({
                y : rows[0]["SUM(LIKES)"],
                y_percentage : ((rows[0]["SUM(LIKES)"]/sumPreference)*100).toFixed(2),
                name : "LIKES",
                color : "hsl(231, 99%, 62%)"
            })

            dataArray.push({
                y : rows[0]["SUM(HATES)"],
                y_percentage : ((rows[0]["SUM(HATES)"]/sumPreference)*100).toFixed(2),
                name : "HATES",
                color : "hsl(348, 100%, 55%)"
            })


            let doughnutChartStruct = {

                status : 1,
                animationEnabled : true,
                interactivityEnabled : true,
                animationDuration : 1000,
                height : 200,
                data : [{
                    startAngle: 75,
                    toolTipContent: `{name} : {y}`,
                    indexLabel : `{name} {y_percentage}%`,
                    indexLabelFontSize: 14,
                    indexLabelFontFamily : "NotoSansKR",
                    indexLabelFontWeight : "bold",
                    indexLabelPlacement : "outside",
                    showInLegend : "true",
                    legendMarkerType: "square",
                    innerRadius: "75%",
                    radius: "100%",
                    type: "doughnut",
                    dataPoints : dataArray
                }],


            }

            res.json(doughnutChartStruct)
            res.end()

        }

    })

})

dbApiRouter.get('/category/getHighlyRelatedChannels.json',(req,res) => {

    let QUERY_CATEGORY = req.query.category
    const QUERY_HIGHLY_RELATED_CHANNELS_BY_CATEGORY = `SELECT CHANNEL_NAME , COUNT(CHANNEL_NAME) , MAX(NUM_OF_SUBSCIBER) , CHANNEL_URL FROM MEDIA_INFO WHERE DA_CATEGORY="${QUERY_CATEGORY}" GROUP BY CHANNEL_NAME ORDER BY COUNT(CHANNEL_NAME) DESC;`

    pool.query(QUERY_HIGHLY_RELATED_CHANNELS_BY_CATEGORY, (err, rows, fields) => {

        if(err){

            console.log(err)
            return res.status(500).send(err)

        }
        else{

            let resObj = {
                status : 1,
                payload : rows,
            }

            res.json(resObj)
            res.end()

        }

    })

})

dbApiRouter.get('/category/getHighlyRelatedChannels.json',(req,res) => {

    let QUERY_CATEGORY = req.query.category
    const QUERY_HIGHLY_RELATED_CHANNELS_BY_CATEGORY = `SELECT CHANNEL_NAME , COUNT(CHANNEL_NAME) , MAX(NUM_OF_SUBSCIBER) , CHANNEL_URL FROM MEDIA_INFO WHERE DA_CATEGORY="${QUERY_CATEGORY}" GROUP BY CHANNEL_NAME ORDER BY COUNT(CHANNEL_NAME) DESC;`

    pool.query(QUERY_HIGHLY_RELATED_CHANNELS_BY_CATEGORY, (err, rows, fields) => {

        if(err){

            console.log(err)
            return res.status(500).send(err)

        }
        else{

            let resObj = {
                status : 1,
                payload : rows,
            }

            res.json(resObj)
            res.end()

        }

    })

})

dbApiRouter.get('/category/getProductInfo.json',(req,res) => {

    let QUERY_CATEGORY = req.query.category
    let QUERY_MODEL = req.query.model

    const QUERY_MODEL_INFO = `SELECT COUNT(MODEL_NAME) , MODEL_NAME , SUM(LIKES) , SUM(HATES) , SUM(NUM_OF_REPLY) FROM MEDIA_INFO WHERE DA_CATEGORY="${QUERY_CATEGORY}" AND MODEL_NAME="${QUERY_MODEL}" GROUP BY MODEL_NAME;`

    pool.query(QUERY_MODEL_INFO, (err, rows, fields) => {

        if(err){

            console.log(err)
            return res.status(500).send(err)

        }
        else{

            let resObj = {
                status : 1,
                payload : rows,
            }

            res.json(resObj)
            res.end()

        }

    })

})

dbApiRouter.get('/category/getKeywordsByModel.json',(req,res) => {

    let QUERY_MODEL = req.query.model
    let QUERY_INDEX = req.query.index

    let QUERY_FREQUENCY_TABEL = `SELECT FREQUENCY_TABLE_NAME FROM MODEL_INFO WHERE MODEL_NAME='${QUERY_MODEL}';`
    
    pool.query(QUERY_FREQUENCY_TABEL,(err,rows) => {

        if(err){
            console.log(err)
            return res.status(500).send(err)
        }
        else{

            let FREQUENCY_TABLE = rows[0]["FREQUENCY_TABLE_NAME"]
            const QUERY_KEYWORDS_BY_MODEL = `SELECT WORD , FREQUENCY FROM ${FREQUENCY_TABLE} ORDER BY FREQUENCY DESC LIMIT ${(QUERY_INDEX * 30) , 30}`

            pool.query(QUERY_KEYWORDS_BY_MODEL, (err, rows, fields) => {

                if(err){
        
                    console.log(err)
                    return res.status(500).send(err)
        
                }
                else{
        
                    let resObj = {
                        status : 1,
                        FREQUENCY_TABLE : FREQUENCY_TABLE,
                        payload : rows,
                    }
        
                    res.json(resObj)
                    res.end()
        
                }
        
            })

        }

    })

})

dbApiRouter.get('/category/getKeywordsByModelMore.json',(req,res) => {

    let QUERY_F_TABLE = req.query.F_Table
    let QUERY_INDEX = req.query.index

    const QUERY_KEYWORDS_BY_MODEL_MORE = `SELECT WORD , FREQUENCY FROM ${QUERY_F_TABLE} ORDER BY FREQUENCY DESC LIMIT ${(QUERY_INDEX * 30)}, 30;`

    pool.query(QUERY_KEYWORDS_BY_MODEL_MORE, (err, rows, fields) => {

        if(err){

            console.log(err)
            return res.status(500).send(err)

        }
        else{

            let resObj = {
                status : 1,
                payload : rows,
            }

            res.json(resObj)
            res.end()

        }

    })

})
    
dbApiRouter.post('/compare/getDataForCompare.json',(req,res) => {

    let QUERY_OBJ = req.body.QUERY

    let MODELS = QUERY_OBJ.MODELS.reduce((acc,curr) => {
        return acc.concat(curr.model)
    },[])

        let QUERY_MODELS_PRICE_HISTORY = `SELECT MODEL_NAME , PRICE , CRAWLED_DATE FROM PRICE_INFO WHERE ${CONCAT_MODELS(MODELS)};`

        pool.query(QUERY_MODELS_PRICE_HISTORY , (err,priceHistoryRows) => {

            if(err){
                console.log(err)
                return res.status(500).send(err)
            }

            else{

                let QUERY_MODELS_INFO = `SELECT MODEL_NAME , PICTURE_URL , CPU , MODEL_SIZE , MODEL_WEIGHT , DISPLAY_SIZE , DISPLAY_RESOLUTION , RAM , STORAGE , CAMERA , BATTERY , CHARGING_METHOD , SPEC_URL FROM MODEL_INFO WHERE ${CONCAT_MODELS(MODELS)};`

                pool.query(QUERY_MODELS_INFO,(err,modelInfoRows) => {
                    
                    console.log(priceHistoryRows)

                    if(err){
                        console.log(err)
                        return res.status(500).send(err)
                    }

                    else{

                       let newModelInfo = modelInfoRows

                       for (let index = 0; index < newModelInfo.length; index++) {
                        
                        let MODEL = newModelInfo[index]['MODEL_NAME']
                        
                        let priceHistory = priceHistoryRows.reduce((acc,curr)=>{

                            if(curr.MODEL_NAME === MODEL){
                                acc.push(curr)
                                console.log(acc.PRICE_HISTORY)
                            }

                            return acc
                        },[])
                        
                        newModelInfo[index]["PRICE_HISTORY"] = priceHistory
                       }                       

                       console.log(newModelInfo)

                        let resObj = {
                            status : 1,
                            modelInfo : newModelInfo,
                        }
            
                        res.json(resObj)
                        res.end()
        
                    }
        
        
                })


            }
        })
    
})

dbApiRouter.get('/category/getSentimental.json', (req, res) => {
    
    let model_name = req.query.model_name
    let num_of_model = 1
    // console.log(rows['MODEL_NAME'])
    let good_array = new Array(num_of_model).fill(0)
    let bad_array = new Array(num_of_model).fill(0)
    let sentimental_json = {}

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
                                        if (!sentimental_json.hasOwnProperty(sentimental.toString())){
                                            sentimental_json[sentimental.toString()] = 1
                                        }
                                        else {
                                            sentimental_json[sentimental.toString()] += 1
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

                        let result = {
                            model_name : model_name, 
                            good : good_array[index],
                            bad : bad_array[index],
                            sentimental : sentimental_json
                        }

                        let doughnutChartStruct = {

                            status : 1,
                            animationEnabled : true,
                            interactivityEnabled : true,
                            animationDuration : 1000,
                            height : 190,
                            data : [{
                                startAngle: 75,
                                toolTipContent: `{name} : {y}`,
                                indexLabel : `{name} {y_percentage}%`,
                                indexLabelFontSize: 12,
                                indexLabelFontFamily : "NotoSansKR",
                                indexLabelFontWeight : "bold",
                                indexLabelPlacement : "inside",
                                showInLegend : "true",
                                legendMarkerType: "square",
                                innerRadius: "75%",
                                radius: "100%",
                                type: "doughnut",
                                dataPoints : [
                                    {
                                        y : result.good,
                                        y_percentage : (((result.good)/(result.good + Math.abs(result.bad)))*100).toFixed(2),
                                        name : "긍정적",
                                        color : "hsl(151, 100%, 45%)"
                                    },
                                    {
                                        y : result.bad,
                                        y_percentage : ((Math.abs((result.bad))/(result.good + Math.abs(result.bad)))*100).toFixed(2),
                                        name : "부정적",
                                        color : "hsl(348, 100%, 55%)"
                                    },
                                ]

                            }],
            
                        }

                        res.json(doughnutChartStruct)
                        res.end()
                        
                    })
                }
            })
        }

})

dbApiRouter.get('/category/getPrice.json', (req, res) => {
    let model_name = req.query.model_name
    let date_n_price = []
    QUERY_GET_PRICE = `select PRICE, CRAWLED_DATE from PRICE_INFO where MODEL_NAME='${model_name}' ORDER BY CRAWLED_DATE desc LIMIT 7`
    pool.query(QUERY_GET_PRICE, (err, rows, field) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err)
        }
        for (let row_idx = 0; row_idx < rows.length; row_idx++) {
            row = rows[row_idx]
            let CRAWLED_DATE = new Date(row['CRAWLED_DATE'])
            let PRICE = Number(row['PRICE'])
            CRAWLED_DATE.setDate(CRAWLED_DATE.getDate()+1)
            CRAWLED_DATE = CRAWLED_DATE.toJSON().slice(0,10)
            date_n_price.push({x : CRAWLED_DATE, y : PRICE})
        }

        const lineChartStruct = {
            status : 1,
            height : 190,
            animationEnabled : true,
            interactivityEnabled : true,
            animationDuration : 1000,
            // theme: "light2",
            axisY :{
                // gridThickness : 0,
                // interlacedColor : "",
                labelFontFamily : "NotoSansKR",
                labelFontColor : "hsl(200, 19%, 18%)",
                labelFontWeight : "bold",
                // lineColor: "black" ,
                // lineThickness: 1,
                // title: "가격",
                prefix: "₩",
                title: "",
                tickLength: 0,
                margin:0,
                lineThickness:0,
            },
            axisX :{
                
                interlacedColor : "",
                labelFontFamily : "NotoSansKR",
                labelFontColor : "hsl(200, 19%, 18%)",
                labelFontWeight : "bold",
                lineColor: "black" ,
                lineThickness: 1,
                title: "일자",
				
            },
			data: [{
				type: "area",
                xValueFormatString: "MMM DD",
                markerSize : 5,
				// yValueFormatString: "$#,##0.00",
				dataPoints: date_n_price
			}]
		}


        res.json(lineChartStruct)
        res.end()
    })
})

dbApiRouter.get('/category/getBestWorstReply.json',(req,res) => {

    let QUERY_GOOD_TABLE_NAME = req.query.tableGood
    let QUERY_BAD_TABLE_NAME = req.query.tableBad

    let QUERY_BEST_REPLY = `SELECT AUTHOR , CONTENT , SENTIMENTAL FROM ${QUERY_GOOD_TABLE_NAME} ORDER BY SENTIMENTAL DESC LIMIT 50;`
    let QUERY_WORST_REPLY = `SELECT AUTHOR , CONTENT , SENTIMENTAL FROM ${QUERY_BAD_TABLE_NAME} ORDER BY SENTIMENTAL ASC LIMIT 50;`

    let result = {}

    pool.query(QUERY_BEST_REPLY,(err,Brows) => {

        if(err){
            console.log(err)
            return res.status(500).send(err)
        }
        else{

            result.BEST = Brows

            pool.query(QUERY_WORST_REPLY,(err,Wrows) => {

                if(err){
                    console.log(err)
                    return res.status(500).send(err)
                }
                else{

                    result.WORST = Wrows

                    res.json(result)
                    res.end()

                }

            })


        }

    })


})

const CONCAT_MODELS = (MODELS) => {
    // MODEL_NAME='' OR
    let OUTPUT_SQL = ""

    for (let index = 0; index < MODELS.length; index++) {
        
        if(index == MODELS.length -1){
            OUTPUT_SQL += `MODEL_NAME='${MODELS[index]}'`
        }
        else{
            OUTPUT_SQL += `MODEL_NAME='${MODELS[index]}' OR `
        }
        
    }

    console.log(OUTPUT_SQL)
    return OUTPUT_SQL
}

module.exports = dbApiRouter
