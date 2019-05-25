import { SERVER_URL } from './URLS.js'

export const A_LOAD_PRODUCT_FAMILY_LISTS_DONE = "A_LOAD_PRODUCT_FAMILY_LISTS_DONE"
export const A_LOAD_PRODUCT_LISTS_DONE = "A_LOAD_PRODUCT_LISTS_DOME"

export const A_USER_SELECTED_PRODUCT_FAMILY = "A_USER_SELECTED_PRODUCT_FAMILY"
export const A_USER_SELECTED_PRODUCT_MODEL_1 = "A_USER_SELECTED_PRODUCT_MODEL_1"
export const A_USER_SELECTED_PRODUCT_MODEL_2 = "A_USER_SELECTED_PRODUCT_MODEL_2"
export const A_USER_SELECTED_PRODUCT_MODEL_3 = "A_USER_SELECTED_PRODUCT_MODEL_3"
export const A_REMOVE_EXCEPTION_SELECTED_MODELS_IDX = "A_REMOVE_EXCEPTION_SELECTED_MODELS_IDX"

export const A_DATA_FOR_COMPARE_STARTED = "A_DATA_FOR_COMPARE_STARTED"
export const A_DATA_FOR_COMPARE_SUCCESS = "A_DATA_FOR_COMPARE_SUCCESS"
export const A_DATA_FOR_COMPARE_FAILURE = "A_DATA_FOR_COMPARE_FAILURE"

export const AC_LOAD_PRODUCT_FAMILY_LISTS = () => {

    return (dispatch , getState) => {

        fetch(`${SERVER_URL}/dbApi/compare/getProductFamilyLists.json`)
        .then(response => response.json()).then((Jres) => {

            if(Jres.status === 1){

                dispatch({
                    type : A_LOAD_PRODUCT_FAMILY_LISTS_DONE,
                    value : Jres.ProductFamily.map((element)=>{
                        return element.toUpperCase()
                    })
                })

            }

        })

    }


}

export const AC_USER_SELECTED_PRODUCT_FAMILY = (family) => {

    return (dispatch , getState) => {

        dispatch({
            type : A_USER_SELECTED_PRODUCT_FAMILY,
            value : family
        })

        fetch(`${SERVER_URL}/dbApi/compare/getProductListsByFamily.json?family=${family}`)
        .then(response => response.json())
            .then((Jres) => {

                if(Jres.status === 1){

                    dispatch({

                        type : A_LOAD_PRODUCT_LISTS_DONE,
                        value : Jres.ProductLists

                    })
                    
                }
        })

    }

}

export const AC_USER_SELECTED_PRODUCT_MODEL_1 = ( model ) => {

    return {

        type : A_USER_SELECTED_PRODUCT_MODEL_1,
        value : {
            idx : 1,
            model : model
        }

    }

}
export const AC_USER_SELECTED_PRODUCT_MODEL_2 = ( model ) => {

    return {

        type : A_USER_SELECTED_PRODUCT_MODEL_2,
        value : {
            idx : 2,
            model : model
        }

    }

}
export const AC_USER_SELECTED_PRODUCT_MODEL_3 = ( model ) => {

    return {

        type : A_USER_SELECTED_PRODUCT_MODEL_3,
        value : {
            idx : 3,
            model : model
        }

    }

}

export const AC_REMOVE_EXCEPTION_SELECTED_MODELS_IDX = (idx) => {

    return {

        type : A_REMOVE_EXCEPTION_SELECTED_MODELS_IDX,
        value : idx

    }

}

export const AC_USER_CLICKED_COMPARE_BUTTON = (QUERY_OBJECT) => {

    return (dispatch , getState) => {

        dispatch({
            type : A_DATA_FOR_COMPARE_STARTED
        })

        fetch(`${SERVER_URL}/dbApi/compare/getDataForCompare.json`,{
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                QUERY : QUERY_OBJECT
            })
        }).then(response => response.json()).then((Jres) => {

            if(Jres.status === 1){

                dispatch({
                    type : A_DATA_FOR_COMPARE_SUCCESS,
                    modelInfo : Jres.modelInfo,
                })
                 
            }

        })

    }

}