import * as MainContentBoxActions from '../redux/MainContentBoxAction.js'

const MainContentBoxInitialState = {

    TOTAL_COLLECTED_DATA : {},
    IS_TOTAL_COLLECTED_DATA_SUCCESS : false,
    IS_TOTAL_COLLECTED_DATA_FAILURE : false,

    USER_ACCESSED_DATA : {},
    IS_USER_ACCESSED_DATA_SUCCESS : false,
    IS_USER_ACCESSED_DATA_FAILURE : false,

    CHANNEL_CRAWLED_DATA : {},
    IS_CHANNEL_CRAWLED_DATA_SUCCESS : false,
    IS_CHANNEL_CRAWLED_DATA_FAILURE : false,

    PRODUCT_FAMILY_DATA : {},
    IS_PRODUCT_FAMILY_DATA_SUCCESS : false,
    IS_PRODUCT_FAMILY_DATA_FAILURE : false
    
}

const MainContentBoxReducer = ( state = MainContentBoxInitialState , action ) => {

    switch(action.type){

        case MainContentBoxActions.A_LOAD_TOTAL_COLLECTED_DATA_STARTED:
            return Object.assign({},state,{

                IS_TOTAL_COLLECTED_DATA_SUCCESS : false,
                IS_TOTAL_COLLECTED_DATA_FAILURE : false,

            })
        
        case MainContentBoxActions.A_LOAD_TOTAL_COLLECTED_DATA_SUCCESS:
            return Object.assign({},state,{

                IS_TOTAL_COLLECTED_DATA_SUCCESS : true,
                IS_TOTAL_COLLECTED_DATA_FAILURE : false,
                TOTAL_COLLECTED_DATA : action.value
                
            })

        case MainContentBoxActions.A_LOAD_TOTAL_COLLECTED_DATA_FAILURE:
        return Object.assign({},state,{

            IS_TOTAL_COLLECTED_DATA_SUCCESS : false,
            IS_TOTAL_COLLECTED_DATA_FAILURE : true,
            TOTAL_COLLECTED_DATA : action.value
            
        })

        /* ########## ########## ########## ########## ########## */

        case MainContentBoxActions.A_LOAD_USER_ACCESSED_DATA_STARTED:
            return Object.assign({},state,{

                IS_USER_ACCESSED_DATA_SUCCESS : false,
                IS_USER_ACCESSED_DATA_FAILURE : false,

            })
        
        case MainContentBoxActions.A_LOAD_USER_ACCESSED_DATA_SUCCESS:
            return Object.assign({},state,{

                IS_USER_ACCESSED_DATA_SUCCESS : true,
                IS_USER_ACCESSED_DATA_FAILURE : false,
                USER_ACCESSED_DATA : action.value
                
            })

        case MainContentBoxActions.A_LOAD_USER_ACCESSED_DATA_FAILURE:
        return Object.assign({},state,{

            IS_USER_ACCESSED_DATA_SUCCESS : false,
            IS_USER_ACCESSED_DATA_FAILURE : true,
            USER_ACCESSED_DATA : action.value
            
        })

        /* ########## ########## ########## ########## ########## */

        case MainContentBoxActions.A_LOAD_CHANNEL_CRAWLED_DATA_STARTED:
            return Object.assign({},state,{

                IS_CHANNEL_CRAWLED_DATA_SUCCESS : false,
                IS_CHANNEL_CRAWLED_DATA_FAILURE : false,
                CHANNEL_CRAWLED_DATA : {}
            })

        case MainContentBoxActions.A_LOAD_CHANNEL_CRAWLED_DATA_SUCCESS:
            return Object.assign({},state,{

                IS_CHANNEL_CRAWLED_DATA_SUCCESS : true,
                IS_CHANNEL_CRAWLED_DATA_FAILURE : false,
                CHANNEL_CRAWLED_DATA : action.value

            })

        case MainContentBoxActions.A_LOAD_CHANNEL_CRAWLED_DATA_FAILURE:
            return Object.assign({},state,{

                IS_CHANNEL_CRAWLED_DATA_SUCCESS : false,
                IS_CHANNEL_CRAWLED_DATA_FAILURE: true,
                CHANNEL_CRAWLED_DATA : action.value

            })

        /* ########## ########## ########## ########## ########## */

        case MainContentBoxActions.A_LOAD_PRODUCT_FAMILY_DATA_STARTED:
            return Object.assign({},state,{

                IS_PRODUCT_FAMILY_DATA_SUCCESS : false,
                IS_PRODUCT_FAMILY_DATA_FAILURE : false,
                PRODUCT_FAMILY_DATA : {}
            })

        case MainContentBoxActions.A_LOAD_PRODUCT_FAMILY_DATA_SUCCESS:
            return Object.assign({},state,{

                IS_PRODUCT_FAMILY_DATA_SUCCESS : true,
                IS_PRODUCT_FAMILY_DATA_FAILURE : false,
                PRODUCT_FAMILY_DATA : action.value

            })

        case MainContentBoxActions.A_LOAD_PRODUCT_FAMILY_DATA_FAILURE:
            return Object.assign({},state,{

                IS_PRODUCT_FAMILY_DATA_SUCCESS : false,
                IS_PRODUCT_FAMILY_DATA_FAILURE: true,
                PRODUCT_FAMILY_DATA : action.value

        })

        default :
            return state

    }

}

export default MainContentBoxReducer
