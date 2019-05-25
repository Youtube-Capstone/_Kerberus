import * as URLS from '../redux/URLS.js'
import CanvasJSReact from '../canvasjs/canvasjs.react'

let CanvasJS = CanvasJSReact.CanvasJS

export const A_USER_TYPING_MODEL_SERACH = "A_USER_TYPING_MODEL_SERACH"

export const A_LOAD_MODEL_RATIO_BY_CATEGORY_STARTED = "A_LOAD_MODEL_RATIO_BY_CATEGORY_STARTED"
export const A_LOAD_MODEL_RATIO_BY_CATEGORY_SUCCESS = "A_LOAD_MODEL_RATIO_BY_CATEGORY_SUCCESS"
export const A_LOAD_MODEL_RATIO_BY_CATEGORY_FAILURE = "A_LOAD_MODEL_RATIO_BY_CATEGORY_FAILURE"

export const A_LOAD_SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY_STARTED = "A_LOAD_SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY_STARTED"
export const A_LOAD_SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY_SUCCESS = "A_LOAD_SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY_SUCCESS"
export const A_LOAD_SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY_FAILURE = "A_LOAD_SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY_FAILURE"

export const A_LOAD_MODEL_IMAGES_STARTED = "A_LOAD_MODEL_IMAGES_STARTED"
export const A_LOAD_MODEL_IMAGES_SUCCESS = "A_LOAD_MODEL_IMAGES_SUCCESS"
export const A_LOAD_MODEL_IMAGES_FAILURE = "A_LOAD_MODEL_IMAGES_FAILURE"

export const A_LOAD_USER_PREFERENCE_STARTED = "A_LOAD_USER_PREFERENCE_STARTED"
export const A_LOAD_USER_PREFERENCE_SUCCESS = "A_LOAD_USER_PREFERENCE_SUCCESS"
export const A_LOAD_USER_PREFERENCE_FAILURE = "A_LOAD_USER_PREFERENCE_FAILURE"

export const A_LOAD_HIGHLY_RELATED_CHANNELS_STARTED = "A_LOAD_HIGHLY_RELATED_CHANNELS_STARTED"
export const A_LOAD_HIGHLY_RELATED_CHANNELS_SUCCESS = "A_LOAD_HIGHLY_RELATED_CHANNELS_SUCCESS"
export const A_LOAD_HIGHLY_RELATED_CHANNELS_FAILURE = "A_LOAD_HIGHLY_RELATED_CHANNELS_FAILURE"

export const A_USER_CLICKED_LEFT_CHANNEL_ARROW = "A_USER_CLICKED_LEFT_CHANNEL_ARROW"
export const A_USER_CLICKED_RIGHT_CHANNEL_ARROW = "A_USER_CLICKED_RIGHT_CHANNEL_ARROW"

export const A_USER_CLICKED_PRODUCT_INFO_OFF = "A_USER_CLICKED_PRODUCT_INFO_OFF"
export const A_USER_CLICKED_PRODUCT_INFO_ON ="A_USER_CLICKED_PRODUCT_INFO_ON"

export const A_LOAD_PRODUCT_INFO_STARTED = "A_LOAD_PRODUCT_INFO_STARTED"
export const A_LOAD_PRODUCT_INFO_SUCCESS = "A_LOAD_PRODUCT_INFO_SUCCESS"
export const A_LOAD_PRODUCT_INFO_FAILURE = "A_LOAD_PRODUCT_INFO_FAILURE"

export const A_LOAD_PRODUCT_KEYWORD_STARTED = "A_LOAD_PRODUCT_KEYWORD_STARTED"
export const A_LOAD_PRODUCT_KEYWORD_SUCCESS = "A_LOAD_PRODUCT_KEYWORD_SUCCESS"
export const A_LOAD_PRODUCT_KEYWORD_FAILURE = "A_LOAD_PRODUCT_KEYWORD_FAILURE"

export const A_LOAD_PRODUCT_KEYWORD_MORE_STARTED = "A_LOAD_PRODUCT_KEYWORD_MORE_STARTED"
export const A_LOAD_PRODUCT_KEYWORD_MORE_SUCCESS = "A_LOAD_PRODUCT_KEYWORD_MORE_SUCCESS"
export const A_LOAD_PRODUCT_KEYWORD_MORE_FAILURE = "A_LOAD_PRODUCT_KEYWORD_MORE_FAILURE"

export const A_LOAD_PRODUCT_PREFERENCE_STARTED = "A_LOAD_PRODUCT_PREFERENCE_STARTED"
export const A_LOAD_PRODUCT_PREFERENCE_SUCCESS = "A_LOAD_PRODUCT_PREFERENCE_SUCCESS"
export const A_LOAD_PRODUCT_PREFERENCE_FAILURE = "A_LOAD_PRODUCT_PREFERENCE_FAILURE"

export const A_LOAD_PRODUCT_PRICE_STARTED = "A_LOAD_PRODUCT_PRICE_STARTED"
export const A_LOAD_PRODUCT_PRICE_SUCCESS = "A_LOAD_PRODUCT_PRICE_SUCCESS"
export const A_LOAD_PRODUCT_PRICE_FAILURE = "A_LOAD_PRODUCT_PRICE_FAILURE"

export const A_LOAD_PRODUCT_REPLY_STARTED = "A_LOAD_PRODUCT_REPLY_STARTED"
export const A_LOAD_PRODUCT_REPLY_SUCCESS = "A_LOAD_PRODUCT_REPLY_SUCCESS"
export const A_LOAD_PRODUCT_REPLY_FAILURE = "A_LOAD_PRODUCT_REPLY_FAILURE"
export const A_TOGGLE_REPLY_STATUS = "A_TOGGLE_REPLY_STATUS"


export const AC_LOAD_MODEL_RATIO_BY_CATEGORY = () => {

    return (dispatch , getState) => {

        dispatch({
            type : A_LOAD_MODEL_RATIO_BY_CATEGORY_STARTED
        })

        let CATEGORY_NOW = getState().SideBar.SELECTED_CATEGORY

        fetch(`${URLS.SERVER_URL}/dbApi/category/getCountVideosByCategory.json?category=${CATEGORY_NOW}`)
            .then(response => (response.json())).then(Jres => {
                if(Jres.status === 1){
                    dispatch({
                        type : A_LOAD_MODEL_RATIO_BY_CATEGORY_SUCCESS,
                        value : Jres
                    })
                }
        }).catch(err=>{

            dispatch({
                type : A_LOAD_MODEL_RATIO_BY_CATEGORY_FAILURE,
                value : err

            })

        })

    }

}

export const AC_USER_TYPING_MODEL_SERACH = (value,valid) => {

    return {

        type : A_USER_TYPING_MODEL_SERACH,
        value : value,
        valid : valid

    }

}

export const AC_LOAD_SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY = () => {

    return (dispatch , getState) => {

        dispatch({
            type : A_LOAD_SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY_STARTED
        })

        let CATEGORY_NOW = getState().SideBar.SELECTED_CATEGORY

        fetch(`${URLS.SERVER_URL}/dbApi/category/getSumOfReplysAboutModelsByCategory.json?category=${CATEGORY_NOW}`)
            .then(response => (response.json())).then(Jres => {
                if(Jres.status === 1){
                    dispatch({
                        type : A_LOAD_SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY_SUCCESS,
                        value : Jres
                    })
                }
        }).catch(err=>{

            dispatch({

                type : A_LOAD_SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY_FAILURE,
                value : err

            })

        })

    }

}

export const AC_LOAD_MODEL_IMAGES = () => {

    return (dispatch , getState) => {

        dispatch({
            type : A_LOAD_MODEL_IMAGES_STARTED
        })

        fetch(`${URLS.SERVER_URL}/dbApi/category/getModelPictureURL.json`)
            .then(response => (response.json())).then(Jres => {
                if(Jres.status === 1){
                    dispatch({
                        type : A_LOAD_MODEL_IMAGES_SUCCESS,
                        value : Jres.data
                    })
                }
        }).catch(err=>{

            dispatch({

                type : A_LOAD_MODEL_IMAGES_FAILURE,
                value : err

            })

        })

    }

}

export const AC_LOAD_USER_PREFERENCE = () => {

    return (dispatch , getState) => {

        dispatch({
            type : A_LOAD_USER_PREFERENCE_STARTED
        })

        let CATEGORY_NOW = getState().SideBar.SELECTED_CATEGORY

        fetch(`${URLS.SERVER_URL}/dbApi/category/getUserPreference.json?category=${CATEGORY_NOW}`)
            .then(response => (response.json())).then(Jres => {
                if(Jres.status === 1){
                    dispatch({
                        type : A_LOAD_USER_PREFERENCE_SUCCESS,
                        value : Jres
                    })
                }
        }).catch(err=>{

            dispatch({

                type : A_LOAD_USER_PREFERENCE_FAILURE,
                value : err

            })

        })

    }

}

export const AC_LOAD_HIGHLY_RELATED_CHANNELS = () => {

    return (dispatch , getState) => {

        dispatch({
            type : A_LOAD_HIGHLY_RELATED_CHANNELS_STARTED
        })

        let CATEGORY_NOW = getState().SideBar.SELECTED_CATEGORY

        fetch(`${URLS.SERVER_URL}/dbApi/category/getHighlyRelatedChannels.json?category=${CATEGORY_NOW}`)
            .then(response => (response.json())).then(Jres => {
                if(Jres.status === 1){
                    dispatch({
                        type : A_LOAD_HIGHLY_RELATED_CHANNELS_SUCCESS,
                        value : {
                            data : Jres.payload
                        }
                    })
                }
        }).catch(err=>{

            dispatch({

                type : A_LOAD_HIGHLY_RELATED_CHANNELS_FAILURE,
                value : err

            })

        })

    }

}

export const AC_USER_CLICKED_LEFT_CHANNEL_ARROW = () => {

    return {
        type : A_USER_CLICKED_LEFT_CHANNEL_ARROW
    }

}

export const AC_USER_CLICKED_RIGHT_CHANNEL_ARROW = () => {
    
    return {
        type : A_USER_CLICKED_RIGHT_CHANNEL_ARROW
    }

}

export const AC_USER_CLICKED_PRODUCT_INFO_ON = (modelName) => {

    return {
        type : A_USER_CLICKED_PRODUCT_INFO_ON,
        model : modelName
    }

}

export const AC_USER_CLICKED_PRODUCT_INFO_OFF = () => {

    return {
        type : A_USER_CLICKED_PRODUCT_INFO_OFF
    }

}

export const AC_LOAD_PRODUCT_INFO = (modelName) => {

    return (dispatch , getState) => {

        dispatch({
            type : A_LOAD_PRODUCT_INFO_STARTED
        })

        let CATEGORY_NOW = getState().SideBar.SELECTED_CATEGORY

        fetch(`${URLS.SERVER_URL}/dbApi/category/getProductInfo.json?category=${CATEGORY_NOW}&model=${modelName}`)
            .then(response => (response.json())).then(Jres => {
                if(Jres.status === 1){
                    dispatch({
                        type : A_LOAD_PRODUCT_INFO_SUCCESS,
                        value : {
                            data : Jres.payload
                        }
                    })
                }
        }).catch(err=>{

            dispatch({

                type : A_LOAD_PRODUCT_INFO_FAILURE,
                value : err

            })

        })

    }

}

export const AC_LOAD_PRODUCT_KEYWORD_MORE = () => {

    return (dispatch , getState) => {

        dispatch({
            type : A_LOAD_PRODUCT_KEYWORD_MORE_STARTED,
        })

        let indexNow = getState().CategoryContentBox.PRODUCT_KEYWORDS_INDEX
        let freqTableNow = getState().CategoryContentBox.FREQUENCY_TABLE
        fetch(`${URLS.SERVER_URL}/dbApi/category/getKeywordsByModelMore.json?F_Table=${freqTableNow}&index=${indexNow}`)
        .then(response => (response.json())).then((Jres) => {

            if(Jres.status === 1){

                dispatch(
                    {

                        type : A_LOAD_PRODUCT_KEYWORD_MORE_SUCCESS,
                        payload : Jres.payload,
                        
                    }
                ) 

            }

        })

    }

}

export const AC_LOAD_PRODUCT_KEYWORD = (model) => {

    return (dispatch , getState) => {

        dispatch({
            type : A_LOAD_PRODUCT_KEYWORD_STARTED,
            model : model
        })

        let indexNow = getState().CategoryContentBox.PRODUCT_KEYWORDS_INDEX

        fetch(`${URLS.SERVER_URL}/dbApi/category/getKeywordsByModel.json?model=${model}&index=${indexNow}`)
        .then(response => (response.json())).then((Jres) => {

            if(Jres.status === 1){

                dispatch(
                    {

                        type : A_LOAD_PRODUCT_KEYWORD_SUCCESS,
                        payload : Jres.payload,
                        FREQUENCY_TABLE : Jres.FREQUENCY_TABLE
    
                    }
                ) 

            }

        })

    }

}

export const AC_LOAD_PRODUCT_PREFERENCE = (modelname) => {

    return (dispatch , getState) => {

        dispatch({
            type : A_LOAD_PRODUCT_PREFERENCE_STARTED,
        })

        fetch(`${URLS.SERVER_URL}/dbApi/category/getSentimental.json?model_name=${modelname}`)
        .then(response => (response.json())).then((Jres) => {

            if(Jres.status === 1){

                dispatch(
                    {

                        type : A_LOAD_PRODUCT_PREFERENCE_SUCCESS,
                        payload : Jres,
                        
                    }
                ) 

            }

        })

    }

}

export const AC_LOAD_PRODUCT_PRICE = (modelname) => {

    return (dispatch , getState) => {

        dispatch({
            type : A_LOAD_PRODUCT_PRICE_STARTED,
        })

        fetch(`${URLS.SERVER_URL}/dbApi/category/getPrice.json?model_name=${modelname}`)
        .then(response => (response.json())).then((Jres) => {

            if(Jres.status === 1){

                for (let index = 0; index < Jres.data[0].dataPoints.length; index++) {

                    Jres.data[0].dataPoints[index].x = new Date(Jres.data[0].dataPoints[index].x)

                }

                Jres.axisX.labelFormatter = (e) => {
                    return CanvasJS.formatDate(e.value , "MMM DD")
                }

                Jres.data[0].toolTipContent = "{x} : {y} 원"
                Jres.data[0].xValueFormatString = "MMM DD"
                dispatch(
                    {

                        type : A_LOAD_PRODUCT_PRICE_SUCCESS,
                        payload : Jres,
                        
                    }
                ) 

            }

        })

    }

}

export const AC_LOAD_PRODUCT_REPLY = (modelname) => {

    // MODAL_IMAGES 상태값 배열에서 modelname에 해당하는 테이블 이름 두개 획득
    // GET 쿼리로 전송 , 응답받기
    
    return (dispatch , getState) => {

        dispatch({
            type : A_LOAD_PRODUCT_REPLY_STARTED
        })
 
        let snapShot = getState().CategoryContentBox.MODEL_IMAGES

        let myObj = snapShot.reduce((acc,curr) =>{

            if(curr.MODEL_NAME === modelname){
                acc.GOOD_TABLE = curr.GOOD_TABLE
                acc.BAD_TABLE = curr.BAD_TABLE
            }
            return acc

        },{})

        fetch(`${URLS.SERVER_URL}/dbApi/category/getBestWorstReply.json?tableGood=${myObj.GOOD_TABLE}&&tableBad=${myObj.BAD_TABLE}`)
            .then(response => response.json())
                .then((Jres) => {

                    dispatch({
                        type : A_LOAD_PRODUCT_REPLY_SUCCESS,
                        payload : Jres
                    })

                })
        }
}

export const AC_TOGGLE_REPLY_STATUS = () => {

    return {
        type : A_TOGGLE_REPLY_STATUS
    }
    
}
