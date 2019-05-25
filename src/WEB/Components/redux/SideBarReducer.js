import * as SideBarActions from './SideBarAction.js'
import * as TopBarActions from './TopBarAction.js'

const SideBarInitialState = {

    CATEGORY : [],
    ERROR_MESG : "",
    SELECTED_CATEGORY : "Search",
    IS_ERROR : false,
    IS_SIDEBAR_FOLDED : false,
    IS_CATEGORY_SELECTED : false,
    IS_CATEGORY_RESPONSED : false,

}

const SideBarReducer = (state = SideBarInitialState , action) => {

    switch(action.type){

        case SideBarActions.A_SIDEBAR_INITIALIZE_SUCCESS:

            return Object.assign({},state,{

                IS_CATEGORY_RESPONSED : true,
                CATEGORY : action.CATEGORY,
                IS_ERROR : false,

            })

        case SideBarActions.A_SIDEBAR_INITIALIZE_FAILURE:

            return Object.assign({},state,{

                IS_CATEGORY_RESPONSED : false,
                IS_ERROR : true,
                ERROR_MESG : action.ERROR_MESG

            })

        case SideBarActions.A_USER_CLICKED_CATEGORY:

            return Object.assign({},state,{

                SELECTED_CATEGORY: action.value,
                IS_CATEGORY_SELECTED: true,
                IS_SIDEBAR_FOLDED : false

            })

        case TopBarActions.A_USER_FOLD_VERTICAL_SIDEBAR:

            return Object.assign({},state,{

                IS_SIDEBAR_FOLDED : !(state.IS_SIDEBAR_FOLDED)

            })


        default:

            return state

    }

}

export default SideBarReducer
