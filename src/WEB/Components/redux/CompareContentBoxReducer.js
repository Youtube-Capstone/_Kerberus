import * as CompareContentBoxActions from './CompareContentBoxAction.js'

const CompareContentBoxInitialState = {

    PRODUCT_FAMILY : [],
    PRODUCT_LISTS : [],
    SELECTED_FAMILY : "",
    STATEMENT : "먼저 제품군을 선택해주세요!",
    SELECTED_MODELS : [],
    IS_PRODUCT_FAMILY_RESPONSED : false,
    IS_PRODUCT_LISTS_RESPONSED : false,
    IS_MODEL_1_SELECTED : false,
    IS_MODEL_2_SELECTED : false,
    IS_MODEL_3_SELECTED : false,

    DATA_FOR_COMPARE : [],
    IS_SHOWING_COMPARE_DATA : false,
    IS_DATA_FOR_COMPARE_STARTED : false,
    IS_DATA_FOR_COMPARE_SUCCESS : false,
    IS_DATA_FOR_COMPARE_FAILED : false
    
}

const CompareContentBoxReducer = (state = CompareContentBoxInitialState , action) => {

    switch(action.type){

        case CompareContentBoxActions.A_LOAD_PRODUCT_FAMILY_LISTS_DONE :

            return Object.assign({}, state, {

                PRODUCT_FAMILY : action.value,
                IS_PRODUCT_FAMILY_RESPONSED : true,
                

            })

        case CompareContentBoxActions.A_USER_SELECTED_PRODUCT_FAMILY : 

            return Object.assign({}, state , {

                SELECTED_FAMILY : action.value,
                SELECTED_MODELS : [],

            })
        
        case CompareContentBoxActions.A_LOAD_PRODUCT_LISTS_DONE :

            return Object.assign({}, state, {

                IS_PRODUCT_LISTS_RESPONSED : true,
                IS_MODEL_1_SELECTED : false,
                IS_MODEL_2_SELECTED : false,
                IS_MODEL_3_SELECTED : false,
                PRODUCT_LISTS : action.value,
                STATEMENT : "이번엔 모델을 선택해 주실래요? 최소 2개."

            })

        case CompareContentBoxActions.A_USER_SELECTED_PRODUCT_MODEL_1 :

            return Object.assign({}, state , {

                IS_MODEL_1_SELECTED : true,
                SELECTED_MODELS : modSelectedModels(state,1,action.value),
                STATEMENT : set_statement(state)
            })
        
        case CompareContentBoxActions.A_USER_SELECTED_PRODUCT_MODEL_2 :

            return Object.assign({}, state , {

                IS_MODEL_2_SELECTED : true,
                SELECTED_MODELS : modSelectedModels(state,2,action.value),
                STATEMENT : set_statement(state)
            })

        case CompareContentBoxActions.A_USER_SELECTED_PRODUCT_MODEL_3 :

            return Object.assign({}, state , {

                IS_MODEL_3_SELECTED : true,
                SELECTED_MODELS : modSelectedModels(state,3,action.value),
                STATEMENT : set_statement(state)

            })

        case CompareContentBoxActions.A_REMOVE_EXCEPTION_SELECTED_MODELS_IDX :

            return Object.assign({}, state , {

                SELECTED_MODELS : removeTargetIdx(state,action.value),
                STATEMENT : set_statement(state)
                
            })

        case CompareContentBoxActions.A_DATA_FOR_COMPARE_STARTED :

            return Object.assign({},state,{

                IS_SHOWING_COMPARE_DATA : false,
                IS_DATA_FOR_COMPARE_SUCCESS : false,
                IS_DATA_FOR_COMPARE_FAILURE : false,
                DATA_FOR_COMPARE : []

            })

        case CompareContentBoxActions.A_DATA_FOR_COMPARE_SUCCESS :

            return Object.assign({},state,{

                IS_SHOWING_COMPARE_DATA : true,
                IS_DATA_FOR_COMPARE_SUCCESS : true,
                IS_DATA_FOR_COMPARE_FAILURE : false,
                DATA_FOR_COMPARE : action.modelInfo
             
            })

        default :
            return state


    }

}

const set_statement = (state) => {

    let statement = ""
    let selectedModels = []
    selectedModels = state.SELECTED_MODELS

    switch(selectedModels.length){
        case 1 : 
            return statement = "다음 모델은요?"
        case 2 :
            return statement = "좋아요! 이제 비교 버튼을 클릭하시거나 모델을 추가해도 되요."
        case 3 :
            return statement = "비교 버튼 클릭!"
        default :
            return
    }

    return statement
}

const modSelectedModels = (state , targetIdx , value) => {

    let selectedModels = []
    selectedModels = state.SELECTED_MODELS

    for(let index = 0 ; index < selectedModels.length ; index++){
        if(selectedModels[index]["idx"] == targetIdx){
            selectedModels.splice(index,1)        
        }
    }

    if(value != "None"){
        selectedModels.push(value)
    }
    
    return selectedModels
}

const removeTargetIdx = (state , idx) => {

    for (let index = 0; index < state.SELECTED_MODELS.length; index++) {
        
        if(state.SELECTED_MODELS[index]["idx"] === idx){
            state.SELECTED_MODELS.splice(index , 1)
        }
        
    }

    return state.SELECTED_MODELS
    
}
export default CompareContentBoxReducer