import { SERVER_URL } from './URLS'

export const A_SIDEBAR_INITIALIZE_SUCCESS = "A_SIDEBAR_INITIALIZE_SUCCESS"
export const A_SIDEBAR_INITIALIZE_FAILURE = "A_SIDEBAR_INITIALIZE_FAILURE"
export const A_USER_CLICKED_CATEGORY = "A_USER_CLICKED_CATEGORY"

export const AC_SIDEBAR_INITIALIZE = () => {

    return (dispatch, getState) => {

        fetch(`${SERVER_URL}/dbApi/getCategoryLists.json`,{
            method : 'GET'
        }).then(response => (response.json()))
            .then(Jres => {

                console.log(Jres)

                let categoryLists = []

                for (let i = 0; i < Jres.length; i++) {
                    categoryLists.push(Jres[i]["DA_CATEGORY"])
                }

                dispatch({

                    type : A_SIDEBAR_INITIALIZE_SUCCESS,
                    CATEGORY : categoryLists

                })

            })
                .catch((error)=>{

                    dispatch({

                        type : A_SIDEBAR_INITIALIZE_FAILURE,
                        ERROR_MESG : "에러 메시지"

                    })

                })

    }


}

export const AC_USER_CLICKED_CATEGORY = (category) => {

    return (dispatch , getState) => {

        dispatch({
            type : A_USER_CLICKED_CATEGORY,
            value : category
        })

    }

}

