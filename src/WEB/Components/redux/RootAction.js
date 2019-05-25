import { SERVER_URL } from './URLS.js'

export const A_USER_ACCESSED = "A_USER_ACCESSED"

export const AC_USER_ACCESSED = () => {

    return (dispatch , getState) => {

        dispatch({
            type : A_USER_ACCESSED
        })

        fetch(`${SERVER_URL}/dbApi/userAccessed`,{
            method : 'GET'
        })

    }

}