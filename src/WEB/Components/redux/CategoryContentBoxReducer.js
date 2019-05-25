import * as CategoryContentBoxActions from './CategoryContentBoxAction.js'

const CategoryInitialState = {

    MODEL_SERACH_VALUE : "",

    MODEL_RATIO_BY_CATEGORY : {
        data : [{
            dataPoints : [{}]
        }]
    },
    IS_MODEL_RATIO_BY_CATEGORY_SUCCESS : false,
    IS_MODEL_RATIO_BY_CATEGORY_FAILURE : false,

    SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY : {},
    IS_SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY_SUCCESS : false,
    IS_SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY_FAILURE : false,
   
    MODEL_IMAGES : [],
    IS_MODEL_IMAGES_SUCCESS : false,
    IS_MODEL_IMAGES_FAILURE : false,

    USER_PREFERENCE : {},
    IS_USER_PREFERENCE_SUCCESS : false,    
    IS_USER_PREFERENCE_FAILURE : false,

    HIGHLY_RELATED_CHANNELS : {},
    IS_HIGHLY_RELATED_CHANNELS_SUCCESS : false,    
    IS_HIGHLY_RELATED_CHANNELS_FAILURE : false,
    PAGE_INDEX : 0,
    PAGE_MAX_INDEX : 0,

    IS_PRODUCT_INFO_CLICKED : false,
    PRODUCT_INFO__MODEL_NAME : "",
    IS_PRODUCT_INFO_SUCCESS : false,
    IS_PRODUCT_INFO_FAILURE : false,
    IS_PRODUCT_KEYWORD_SUCCESS : false,
    PRODUCT_INFO : {},
    FREQUENCY_TABLE : "",
    PRODUCT_KEYWORDS : [],
    PRODUCT_KEYWORDS_INDEX : 0,

    PRODUCT_PREFERENCE : {},
    IS_PRODUCT_PREFERENCE_SUCCESS : false,
    IS_PRODUCT_PREFERENCE_FAILURE : false,

    PRODUCT_PRICE : {},
    IS_PRODUCT_PRICE_SUCCESS : false,
    IS_PRODUCT_PRICE_FAILURE : false,

    PRODUCT_REPLY : {},
    IS_PRODUCT_REPLY_SUCCESS : false,
    IS_PRODUCT_REPLY_FAILURE : false,
    REPLY_STATUS : true

}

const CategoryContentBoxReducer = (state = CategoryInitialState , action) => {

    switch (action.type) {

        case CategoryContentBoxActions.A_USER_TYPING_MODEL_SERACH:

            return Object.assign({},state,{

                MODEL_SERACH_VALUE : action.value,
            
            })
        
        /*********************************************************************************/    

        case CategoryContentBoxActions.A_LOAD_MODEL_RATIO_BY_CATEGORY_STARTED:
            return Object.assign({},state,{

                IS_MODEL_RATIO_BY_CATEGORY_SUCCESS : false,
                IS_MODEL_RATIO_BY_CATEGORY_FAILURE : false,

            })

        case CategoryContentBoxActions.A_LOAD_MODEL_RATIO_BY_CATEGORY_SUCCESS:
            return Object.assign({},state,{

                IS_MODEL_RATIO_BY_CATEGORY_SUCCESS : true,
                IS_MODEL_RATIO_BY_CATEGORY_FAILURE : false,
                MODEL_RATIO_BY_CATEGORY : action.value

            })

        case CategoryContentBoxActions.A_LOAD_MODEL_RATIO_BY_CATEGORY_FAILURE:
            return Object.assign({},state,{

                IS_MODEL_RATIO_BY_CATEGORY_SUCCESS : false,
                IS_MODEL_RATIO_BY_CATEGORY_FAILURE : true,
                MODEL_RATIO_BY_CATEGORY : action.value

            })

        /*********************************************************************************/

        case CategoryContentBoxActions.A_LOAD_SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY_STARTED:
            return Object.assign({},state,{

                IS_SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY_SUCCESS : false,
                IS_SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY_FAILURE : false,

            })

        case CategoryContentBoxActions.A_LOAD_SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY_SUCCESS:
            return Object.assign({},state,{

                IS_SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY_SUCCESS : true,
                IS_SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY_FAILURE : false,
                SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY : action.value

            })

        case CategoryContentBoxActions.A_LOAD_SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY_FAILURE:
            return Object.assign({},state,{

                IS_SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY_SUCCESS : false,
                IS_SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY_FAILURE : true,
                SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY : action.value

            })

        /*********************************************************************************/

        case CategoryContentBoxActions.A_LOAD_MODEL_IMAGES_STARTED:
            return Object.assign({},state,{

                IS_MODEL_IMAGES_SUCCESS : false,
                IS_MODEL_IMAGES_FAILURE : false,

            })

        case CategoryContentBoxActions.A_LOAD_MODEL_IMAGES_SUCCESS:
            return Object.assign({},state,{

                IS_MODEL_IMAGES_SUCCESS : true,
                IS_MODEL_IMAGES_FAILURE : false,
                MODEL_IMAGES : action.value

            })

        case CategoryContentBoxActions.A_LOAD_MODEL_IMAGES_FAILURE:
            return Object.assign({},state,{

                IS_MODEL_IMAGES_SUCCESS : false,
                IS_MODEL_IMAGES_FAILURE : true,
                MODEL_IMAGES : action.value

            })

        /*********************************************************************************/

        case CategoryContentBoxActions.A_LOAD_USER_PREFERENCE_STARTED:
            return Object.assign({},state,{

                IS_USER_PREFERENCE_SUCCESS : false,
                IS_USER_PREFERENCE_FAILURE : false,

            })

        case CategoryContentBoxActions.A_LOAD_USER_PREFERENCE_SUCCESS:
            return Object.assign({},state,{

                IS_USER_PREFERENCE_SUCCESS : true,
                IS_USER_PREFERENCE_FAILURE : false,
                USER_PREFERENCE : action.value

            })

        case CategoryContentBoxActions.A_LOAD_USER_PREFERENCE_FAILURE:
            return Object.assign({},state,{

                IS_USER_PREFERENCE_SUCCESS : false,
                IS_USER_PREFERENCE_FAILURE : true,
                USER_PREFERENCE : action.value

            })

        /*********************************************************************************/

        case CategoryContentBoxActions.A_LOAD_HIGHLY_RELATED_CHANNELS_STARTED:
            return Object.assign({},state,{

                IS_HIGHLY_RELATED_CHANNELS_SUCCESS : false,
                IS_HIGHLY_RELATED_CHANNELS_FAILURE : false,

            })

        case CategoryContentBoxActions.A_LOAD_HIGHLY_RELATED_CHANNELS_SUCCESS:
            return Object.assign({},state,{

                IS_HIGHLY_RELATED_CHANNELS_SUCCESS : true,
                IS_HIGHLY_RELATED_CHANNELS_FAILURE : false,
                HIGHLY_RELATED_CHANNELS : action.value,
                PAGE_MAX_INDEX : Math.ceil((action.value.data.length / 5))

            })

        case CategoryContentBoxActions.A_LOAD_HIGHLY_RELATED_CHANNELS_FAILURE:
            return Object.assign({},state,{

                IS_HIGHLY_RELATED_CHANNELS_SUCCESS : false,
                IS_HIGHLY_RELATED_CHANNELS_FAILURE : true,
                HIGHLY_RELATED_CHANNELS : action.value

            })

        case CategoryContentBoxActions.A_USER_CLICKED_LEFT_CHANNEL_ARROW:
            return Object.assign({},state,{
                PAGE_INDEX : PAGE_INDEX_CONTROL(state.PAGE_INDEX , state.PAGE_MAX_INDEX , "LEFT")
            })
        
        case CategoryContentBoxActions.A_USER_CLICKED_RIGHT_CHANNEL_ARROW:
            return Object.assign({},state,{
                PAGE_INDEX : PAGE_INDEX_CONTROL(state.PAGE_INDEX , state.PAGE_MAX_INDEX , "RIGHT")
            })


        /*********************************************************************************/    
         
        case CategoryContentBoxActions.A_LOAD_PRODUCT_INFO_STARTED:
            return Object.assign({},state,{

                IS_PRODUCT_INFO_SUCCESS : false,
                IS_PRODUCT_INFO_FAILURE : false,
                
            })

        case CategoryContentBoxActions.A_LOAD_PRODUCT_INFO_SUCCESS:
            return Object.assign({},state,{

                IS_PRODUCT_INFO_SUCCESS : true,
                IS_PRODUCT_INFO_FAILURE : false,
                PRODUCT_INFO : action.value

            })

        case CategoryContentBoxActions.A_LOAD_PRODUCT_INFO_FAILURE:
            return Object.assign({},state,{

                IS_PRODUCT_INFO_SUCCESS : false,
                IS_PRODUCT_INFO_FAILURE : true,
                PRODUCT_INFO : action.value

            })

        case CategoryContentBoxActions.A_USER_CLICKED_PRODUCT_INFO_ON:

            return Object.assign({},state,{
                IS_PRODUCT_INFO_CLICKED : true,
                PRODUCT_INFO__MODEL_NAME : action.model,
               
            })

        case CategoryContentBoxActions.A_USER_CLICKED_PRODUCT_INFO_OFF:

            return Object.assign({},state,{
                IS_PRODUCT_INFO_CLICKED : false,
                IS_PRODUCT_KEYWORD_SUCCESS : false
            })

        
        case CategoryContentBoxActions.A_LOAD_PRODUCT_KEYWORD_STARTED : 
            
            return Object.assign({},state,{
                PRODUCT_KEYWORDS : [],
                PRODUCT_KEYWORDS_INDEX : 0,
                FREQUENCY_TABLE : ""
            })

        case CategoryContentBoxActions.A_LOAD_PRODUCT_KEYWORD_SUCCESS :
            
            return Object.assign({},state,{
                FREQUENCY_TABLE : action.FREQUENCY_TABLE,
                PRODUCT_KEYWORDS : action.payload,
                PRODUCT_KEYWORDS_INDEX : state.PRODUCT_KEYWORDS_INDEX + 1,
                IS_PRODUCT_KEYWORD_SUCCESS : true
            })

        case CategoryContentBoxActions.A_LOAD_PRODUCT_KEYWORD_MORE_SUCCESS :

            return Object.assign({},state,{
                PRODUCT_KEYWORDS : state.PRODUCT_KEYWORDS.concat(action.payload),
                PRODUCT_KEYWORDS_INDEX : state.PRODUCT_KEYWORDS_INDEX + 1
            })

        case CategoryContentBoxActions.A_LOAD_PRODUCT_PREFERENCE_STARTED:
        
            return Object.assign({},state,{

                PRODUCT_PREFERENCE : {},
                IS_PRODUCT_PREFERENCE_SUCCESS : false,
                IS_PRODUCT_PREFERENCE_FAILURE : false

            })

        case CategoryContentBoxActions.A_LOAD_PRODUCT_PREFERENCE_SUCCESS:

            return Object.assign({},state,{

                PRODUCT_PREFERENCE : action.payload,
                IS_PRODUCT_PREFERENCE_SUCCESS : true,
                IS_PRODUCT_PREFERENCE_FAILURE : false

            })

        case CategoryContentBoxActions.A_LOAD_PRODUCT_PREFERENCE_FAILURE:

            return Object.assign({},state,{

                PRODUCT_PREFERENCE : action.payload,
                IS_PRODUCT_PREFERENCE_SUCCESS : false,
                IS_PRODUCT_PREFERENCE_FAILURE : true

            })

        case CategoryContentBoxActions.A_LOAD_PRODUCT_PRICE_STARTED:
    
            return Object.assign({},state,{

                PRODUCT_PRICE : {},
                IS_PRODUCT_PRICE_SUCCESS : false,
                IS_PRODUCT_PRICE_FAILURE : false

            })

        case CategoryContentBoxActions.A_LOAD_PRODUCT_PRICE_SUCCESS:

            return Object.assign({},state,{

                PRODUCT_PRICE : action.payload,
                IS_PRODUCT_PRICE_SUCCESS : true,
                IS_PRODUCT_PRICE_FAILURE : false

            })

        case CategoryContentBoxActions.A_LOAD_PRODUCT_PRICE_FAILURE:

            return Object.assign({},state,{

                PRODUCT_PRICE : action.payload,
                IS_PRODUCT_PRICE_SUCCESS : false,
                IS_PRODUCT_PRICE_FAILURE : true

            })
        
        case CategoryContentBoxActions.A_LOAD_PRODUCT_REPLY_STARTED:

        return Object.assign({},state,{

            PRODUCT_REPLY : {},
            IS_PRODUCT_REPLY_SUCCESS : false,
            IS_PRODUCT_REPLY_FAILURE : false

        })

        case CategoryContentBoxActions.A_LOAD_PRODUCT_REPLY_SUCCESS:

            return Object.assign({},state,{

                PRODUCT_REPLY : action.payload,
                IS_PRODUCT_REPLY_SUCCESS : true,
                IS_PRODUCT_REPLY_FAILURE : false

            })

        case CategoryContentBoxActions.A_LOAD_PRODUCT_REPLY_FAILURE:

            return Object.assign({},state,{

                PRODUCT_REPLY : action.payload,
                IS_PRODUCT_REPLY_SUCCESS : false,
                IS_PRODUCT_REPLY_FAILURE : true

            })

        case CategoryContentBoxActions.A_TOGGLE_REPLY_STATUS:

            return Object.assign({},state,{
                REPLY_STATUS : !state.REPLY_STATUS
            })

        default :
            return state
    }

}

const PAGE_INDEX_CONTROL = (idx, max_idx, type ) => {

    let answer = 0

    if(type == "LEFT"){

        if(idx == 0){
            answer = 0
        }
        else{
            answer = idx - 1
        }

    }
    else{

        if(idx == max_idx){
            answer = max_idx
        }
        else{
            answer = idx + 1
        }

    }

    return answer

}

export default CategoryContentBoxReducer
