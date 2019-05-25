import React from 'react'
import '../stylesheets/IconSearch.css'
import { MdSearch, MdArrowDropDown } from "react-icons/md";
import { connect } from 'react-redux'

import * as IconSearchActions from '../redux/IconSearchAction.js'

class IconSearch extends React.Component{

    componentWillMount() {

        const { IconSearchDispatch } = this.props

        IconSearchDispatch.GET_MODEL_NAMES()

    }

    componentDidMount(){

        let SEARCH_INPUT = document.getElementById('SEARCH_INPUT')

        SEARCH_INPUT.addEventListener("keydown",(event)=>{

            //down 40 up 38
            const { IconSearchState , IconSearchDispatch } = this.props

            if(event.keyCode === 40){

                if((IconSearchState.SUGGESTION_ROWS_POINTER_MAXIMUM - 1) > IconSearchState.SUGGESTION_ROWS_POINTER){

                    IconSearchDispatch.SUGGESTION_DOWN((IconSearchState.SUGGESTION_ROWS_POINTER + 1))
                    virtualMouseOver((IconSearchState.SUGGESTION_ROWS_POINTER + 1),"DOWN")

                }
                else{

                    IconSearchDispatch.SUGGESTION_DOWN((IconSearchState.SUGGESTION_ROWS_POINTER_MAXIMUM -1))
                    virtualMouseOver((IconSearchState.SUGGESTION_ROWS_POINTER_MAXIMUM -1),"DOWN")
                }

            }
            else if(event.keyCode === 38){

                if(0 < IconSearchState.SUGGESTION_ROWS_POINTER){

                    virtualMouseOver((IconSearchState.SUGGESTION_ROWS_POINTER - 1),"UP")
                    IconSearchDispatch.SUGGESTION_UP((IconSearchState.SUGGESTION_ROWS_POINTER -1))
                    
                }
                else if(0 == IconSearchState.SUGGESTION_ROWS_POINTER){

                    virtualMouseOver(0,"UP")
                    IconSearchDispatch.SUGGESTION_UP(0)
                    
                }

            }
            else if(event.keyCode !== 40 && event.keyCode !== 38 && IconSearchState.SUGGESTION_ROWS_POINTER !== -1){

                IconSearchDispatch.SUGGESTION_RESET()

            }

        })



    }

    render(){
        
        let { IconSearchState , IconSearchDispatch } = this.props

        return(

            <div className="IconSearch-Container">

                <div id={`SUGGESTIONS_CONTAINER`} className={`Suggestions-Container ${IconSearchState.VALID_INPUT?(`--Show`):(`--Hide`)}`}>
                    {modelNamesSuggestion(IconSearchState.SUGGESTED_MODEL_NAMES)}
                </div>

                <div id={`SEARCH_INPUT_CONTAINER`} className="IconSearch-Container__Item">

                    <input
                        disabled={!IconSearchState.SEARCH_AVAILABLE}
                        id={"SEARCH_INPUT"}
                        onChange={IconSearchDispatch.TYPING}
                        value={IconSearchState.SEARCH_VALUE}
                        className={`IconSearch-Container__Input-Group__Input ${IconSearchState.SEARCH_AVAILABLE?(`--Available`):(``)}`}
                        placeholder="Search ..." 
                        autoComplete="off"
                        type="text"
                    />

                </div>

                <div className="IconSearch-Container__Item">

                    <span className="IconSearch-Container__Input-Group__Icon">
                        <MdSearch id="Search_Icon" />
                    </span>
                    
                </div>

            </div>

        )

    }

}

const modelNamesSuggestion = (SUGGESTED_MODEL_NAMES) => {

    let result = SUGGESTED_MODEL_NAMES.map((el,index,array) => {

        return (

            <div key={index} className="Suggested-Search-Row">
                <div className="Search-Row__Item">
                    <span className="Search-Row__Item-Text">{el}</span>
                </div>
                <div className="Search-Row__Item">
                    <MdArrowDropDown />
                </div>
            </div>

        )

    })
    
    return result

}

const virtualMouseOver = (idx,type) => {

    let SUGGESTION_ROWS = document.querySelectorAll('.Suggested-Search-Row')

    if(type === 'DOWN'){

        if(idx === 0){
            SUGGESTION_ROWS.item(idx).classList.add('--Suggestion-Selected')
        }
        else{
            SUGGESTION_ROWS.item(idx - 1).classList.remove('--Suggestion-Selected')
            SUGGESTION_ROWS.item(idx).classList.add('--Suggestion-Selected')
        }

    }
    else if(type === 'UP'){

        if(idx === 0) {

            if(SUGGESTION_ROWS.length > 1){

            SUGGESTION_ROWS.item(idx).classList.add('--Suggestion-Selected')
            SUGGESTION_ROWS.item(idx + 1).classList.remove('--Suggestion-Selected')

            }

            else if(SUGGESTION_ROWS.length === 1){

                SUGGESTION_ROWS.item(idx).classList.add('--Suggestion-Selected')

            }

        }
        else{

            SUGGESTION_ROWS.item(idx).classList.add('--Suggestion-Selected')
            SUGGESTION_ROWS.item(idx + 1).classList.remove('--Suggestion-Selected')

        }

    }




    console.log(SUGGESTION_ROWS.item(idx))

}

const mapStateToProps = (state) => {

    return {
        IconSearchState : state.IconSearch
    }

}
const mapDispatchToProps = (dispatch) => {

    return {
        IconSearchDispatch : {
            TYPING(event){

                let value = event.target.value
                dispatch(IconSearchActions.AC_TYPING_SEARCH_INPUT(value))
               
            },
            GET_MODEL_NAMES(){
                dispatch(IconSearchActions.AC_GET_MODEL_NAMES())
            },
            SUGGESTION_DOWN(value){

                dispatch(IconSearchActions.AC_SELECTING_SUGGESTIONS_DOWN(value))
                dispatch(IconSearchActions.AC_SET_SEARCH_VALUE_BY_POINTER())

            },
            SUGGESTION_UP(value){

                dispatch(IconSearchActions.AC_SELECTING_SUGGESTIONS_UP(value))
                dispatch(IconSearchActions.AC_SET_SEARCH_VALUE_BY_POINTER())

            },
            SUGGESTION_RESET(){

                dispatch(IconSearchActions.AC_SELECTING_SUGGESTIONS_RESET())

            }
        }
    }

}

IconSearch = connect(mapStateToProps , mapDispatchToProps)(IconSearch)

export default IconSearch
