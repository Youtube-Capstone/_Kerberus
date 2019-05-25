import * as URLS from '../redux/URLS.js'
import CanvasJSReact from '../canvasjs/canvasjs.react'

let CanvasJS = CanvasJSReact.CanvasJS

export const A_LOAD_TOTAL_COLLECTED_DATA_STARTED = "A_LOAD_TOTAL_COLLECTED_DATA_STARTED"
export const A_LOAD_TOTAL_COLLECTED_DATA_SUCCESS = "A_LOAD_TOTAL_COLLECTED_DATA_SUCCESS"
export const A_LOAD_TOTAL_COLLECTED_DATA_FAILURE = "A_LOAD_TOTAL_COLLECTED_DATA_FAILURE"

export const A_LOAD_USER_ACCESSED_DATA_STARTED = "A_LOAD_USER_ACCESSED_DATA_STARTED"
export const A_LOAD_USER_ACCESSED_DATA_SUCCESS = "A_LOAD_USER_ACCESSED_DATA_SUCCESS"
export const A_LOAD_USER_ACCESSED_DATA_FAILURE = "A_LOAD_USER_ACCESSED_DATA_FAILURE"

export const A_LOAD_CHANNEL_CRAWLED_DATA_STARTED = "A_LOAD_CHANNEL_CRAWLED_DATA_STARTED"
export const A_LOAD_CHANNEL_CRAWLED_DATA_SUCCESS = "A_LOAD_CHANNEL_CRAWLED_DATA_SUCCESS"
export const A_LOAD_CHANNEL_CRAWLED_DATA_FAILURE = "A_LOAD_CHANNEL_CRAWLED_DATA_FAILURE"

export const A_LOAD_PRODUCT_FAMILY_DATA_STARTED = "A_LOAD_PRODUCT_FAMILY_DATA_STARTED"
export const A_LOAD_PRODUCT_FAMILY_DATA_SUCCESS = "A_LOAD_PRODUCT_FAMILY_DATA_SUCCESS"
export const A_LOAD_PRODUCT_FAMILY_DATA_FAILURE = "A_LOAD_PRODUCT_FAMILY_DATA_FAILURE"

    export const AC_LOAD_TOTAL_COLLECTED_DATA = (TIME_PARTITION) => {

    return (dispatch , getState) => {

        dispatch({
            type : A_LOAD_TOTAL_COLLECTED_DATA_STARTED
        })

        fetch(`${URLS.SERVER_URL}/dbApi/getTotalRows.json?time=${TIME_PARTITION}`).then((response) => (response.json())).then((Jres) => {

            if(Jres.status === 1){

                for (let index = 0; index < Jres.data[0].dataPoints.length; index++) {
                    
                    Jres.data[0].dataPoints[index].x = new Date(Jres.data[0].dataPoints[index].x)
                    
                }

                Jres.axisX.labelFormatter = (e) => {
                    return CanvasJS.formatDate(e.value , "MMM DD")
                }

                Jres.data[0].toolTipContent = "{x} 데이터 : {y}건"
                Jres.data[0].xValueFormatString = "MMM DD"

                dispatch({

                    type : A_LOAD_TOTAL_COLLECTED_DATA_SUCCESS,
                    value : Jres

                })

                
            }

        })
        .catch((err) => {

            dispatch({
                type : A_LOAD_TOTAL_COLLECTED_DATA_FAILURE,
                value : err
            })

        })

    }

}

export const AC_LOAD_USER_ACCESSED_DATA = (TIME_PARTITION) => {

    return (dispatch , getState) => {

        dispatch({
            type : A_LOAD_USER_ACCESSED_DATA_STARTED
        })

        fetch(`${URLS.SERVER_URL}/dbApi/getDayCount.json?time=${TIME_PARTITION}`).then((response) => (response.json())).then((Jres) => {

            if(Jres.status === 1){

                for (let index = 0; index < Jres.data[0].dataPoints.length; index++) {

                    Jres.data[0].dataPoints[index].x = new Date(Jres.data[0].dataPoints[index].x)

                }

                Jres.axisX.labelFormatter = (e) => {
                    return CanvasJS.formatDate(e.value , "MMM DD")
                }

                Jres.data[0].toolTipContent = "{x} 방문자 : {y}명"
                Jres.data[0].xValueFormatString = "MMM DD"

                dispatch({

                    type : A_LOAD_USER_ACCESSED_DATA_SUCCESS,
                    value : Jres

                })


            }

        })
        .catch((err) => {

            dispatch({
                type : A_LOAD_USER_ACCESSED_DATA_FAILURE,
                value : err
            })

        })

    }

}

export const AC_CHANNEL_CRAWLED_DATA = () => {

    return ( dispatch, getState) => {

        dispatch({
            type : A_LOAD_CHANNEL_CRAWLED_DATA_STARTED
        })

        fetch(`${URLS.SERVER_URL}/dbApi/getNumOfChannelCrawled.json`).then((response) => (response.json())).then((Jres) => {

            if(Jres.status === 1){

                console.log(Jres)

                dispatch({

                    type : A_LOAD_CHANNEL_CRAWLED_DATA_SUCCESS,
                    value : Jres

                })

            }

        })
            .catch((err) => {

                dispatch({
                    type : A_LOAD_CHANNEL_CRAWLED_DATA_FAILURE,
                    value : err
                })

            })

    }

}

export const AC_PRODUCT_FAMILY_DATA = () => {

    return ( dispatch, getState) => {

        dispatch({
            type : A_LOAD_PRODUCT_FAMILY_DATA_STARTED
        })

        fetch(`${URLS.SERVER_URL}/dbApi/getProductFamilyData.json`).then((response) => (response.json())).then((Jres) => {

            if(Jres.status === 1){

                console.log(Jres)
                
                dispatch({

                    type : A_LOAD_PRODUCT_FAMILY_DATA_SUCCESS,
                    value : Jres

                })

            }

        })
            .catch((err) => {

                dispatch({
                    type : A_LOAD_PRODUCT_FAMILY_DATA_FAILURE,
                    value : err
                })

            })

    }

}
