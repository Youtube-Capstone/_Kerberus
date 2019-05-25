import * as IconSearchActions from './IconSearchAction.js'

const InitialIconSearchState = {

    "SEARCH_VALUE" : "",
    "SEARCH_AVAILABLE" : false,
    "VALID_INPUT" : false,
    "IS_SEARCHING" : false,
    "IS_SEARCH_SUCCESS" : false,
    "IS_SEARCH_FAIL" : false,
    "ERROR_MESSAGE" : "",
    "SUGGESTED_MODEL_NAMES" : [],
    "ALL_MODEL_NAMES" : [],
    "SUGGESTION_ROWS_POINTER" : -1,
    "SUGGESTION_ROWS_POINTER_MAXIMUM" : -1

}

const IconSearchReducer = (state = InitialIconSearchState , action) => {

    switch(action.type){

        case IconSearchActions.A_TYPING_SEARCH_INPUT:
        
            return Object.assign({},state,{

                SEARCH_VALUE : action.SEARCH_VALUE,
                SUGGESTED_MODEL_NAMES : action.SUGGESTED_MODEL_NAMES,
                VALID_INPUT : action.VALID_INPUT,
                SUGGESTION_ROWS_POINTER : -1,
                SUGGESTION_ROWS_POINTER_MAXIMUM: action.SUGGESTED_MODEL_NAMES.length

            })

        case IconSearchActions.A_ACTIVATE_SEARCH_FUNCTION:

            return Object.assign({},state,{

                IS_SEARCHING : true

            })
        
        case IconSearchActions.A_SEARCHING_SUCCEEDED:

            return Object.assign({},state,{

                "IS_SEARCHING" : false,
                "IS_SEARCH_SUCCESS" : true,
                "IS_SEARCH_FAIL" : false,
                "ERROR_MESSAGE" : ""

            })

        case IconSearchActions.A_SEARCHING_FAILED:

            return Object.assign({},state,{

                "IS_SEARCHING" : false,
                "IS_SEARCH_SUCCESS" : false,
                "IS_SEARCH_FAIL" : true,
                "ERROR_MESSAGE" : action.ERROR_MESSAGE

            })

        case IconSearchActions.A_GET_MODEL_NAMES_SUCCESS:

            return Object.assign({},state,{

                "ALL_MODEL_NAMES" : action.value,
                "SEARCH_AVAILABLE" : true

            })

        case IconSearchActions.A_CLEAR_SEARCH_REDUCER:
        
            return Object.assign({},state,{

                ...InitialIconSearchState

            })

        case IconSearchActions.A_SELECTING_SUGGESTIONS_UP:

            return Object.assign({},state,{

                SUGGESTION_ROWS_POINTER : action.value,
                
            })

        case IconSearchActions.A_SELECTING_SUGGESTIONS_DOWN:

            return Object.assign({},state,{

                SUGGESTION_ROWS_POINTER : action.value,
                 
            })

        case IconSearchActions.A_SELECTING_SUGGESTIONS_RESET:

            return Object.assign({},state,{

            })
        
        case IconSearchActions.A_SET_SEARCH_VALUE_BY_POINTER:
            
            return Object.assign({},state,{
                SEARCH_VALUE : action.value
            })

        default :

            return state
        
    }

}

export default IconSearchReducer
