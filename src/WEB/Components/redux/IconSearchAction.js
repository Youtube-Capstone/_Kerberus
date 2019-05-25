import { SERVER_URL } from './URLS.js'

export const A_GET_MODEL_NAMES_SUCCESS = "A_GET_MODEL_NAMES_SUCCESS"
export const A_ACTIVATE_SEARCH_FUNCTION = "A_ACTIVATE_SEARCH_FUNCTION"
export const A_TYPING_SEARCH_INPUT = "A_TYPING_SERACH_INPUT"
export const A_SEARCHING_SUCCEEDED = "A_SEARCHING_SUCCEEDED"
export const A_SEARCHING_FAILED = "A_SEARCHING_FAILED"
export const A_SELECTING_SUGGESTIONS_UP = "A_SELECTING_SUGGESTIONS_UP"
export const A_SELECTING_SUGGESTIONS_DOWN = "A_SELECTING_SUGGESTIONS_DOWN"
export const A_SELECTING_SUGGESTIONS_RESET = "A_SELECTING_SUGGESTIONS_RESET"

export const A_SET_SEARCH_VALUE_BY_POINTER = "A_SET_SEARCH_VALUE_BY_POINTER"

export const AC_TYPING_SEARCH_INPUT = (targetValue) => {

    return (dispatch , getState) => {

        let keyWord = targetValue

        let ALL_MODEL_NAMES = getState().IconSearch.ALL_MODEL_NAMES
        let SUGGESTED_MODEL_NAMES = []

        for (let index = 0; index < ALL_MODEL_NAMES.length; index++) {
        
            if(ALL_MODEL_NAMES[index].includes(keyWord) && keyWord !== "" && keyWord !== " "){
                SUGGESTED_MODEL_NAMES.push(ALL_MODEL_NAMES[index])
            }
            
        }

        if(keyWord !== "" && keyWord !== " "){

            dispatch({
                type : A_TYPING_SEARCH_INPUT,
                SEARCH_VALUE : keyWord,
                VALID_INPUT : true,
                SUGGESTED_MODEL_NAMES : SUGGESTED_MODEL_NAMES
            })

        }
        else{

            dispatch({
                type : A_TYPING_SEARCH_INPUT,
                SEARCH_VALUE : keyWord,
                VALID_INPUT : false,
                SUGGESTED_MODEL_NAMES : SUGGESTED_MODEL_NAMES
            })

        }

    }

}

export const AC_GET_MODEL_NAMES = () => {

    return (dispatch, getState) => {

        fetch(`${SERVER_URL}/dbApi/getModelNames.json`,{
            method : 'GET'
        }).then(response => response.json())
        .then((Jres) => {

            let modelNamesArr = [];

            for (let index = 0; index < Jres.length; index++) {
                
                modelNamesArr.push(Jres[index]["MODEL_NAME"])
                
            }

            dispatch({
                type : A_GET_MODEL_NAMES_SUCCESS,
                value : modelNamesArr
            })

        })

    }

}

export const AC_SELECTING_SUGGESTIONS_DOWN = (value) => {

    return {
        type : A_SELECTING_SUGGESTIONS_DOWN,
        value : value
    }

}
export const AC_SELECTING_SUGGESTIONS_UP = (value) => {

    return {
        type : A_SELECTING_SUGGESTIONS_UP,
        value : value
    }

}
export const AC_SELECTING_SUGGESTIONS_RESET = () => {

    return {
        type : A_SELECTING_SUGGESTIONS_RESET
    }

}

export const AC_SET_SEARCH_VALUE_BY_POINTER = () => {

    return (dispatch , getState) => {

        let pointer = getState().IconSearch.SUGGESTION_ROWS_POINTER
        let suggestionNow = getState().IconSearch.SUGGESTED_MODEL_NAMES

        dispatch({
            type : A_SET_SEARCH_VALUE_BY_POINTER,
            value : suggestionNow[pointer]
        })

    }

}

