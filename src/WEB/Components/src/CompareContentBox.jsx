
import React from 'react'
import CanvasJSReact from "../canvasjs/canvasjs.react"
import { connect } from 'react-redux'
import { CATEGORY_ICON_ATTACHER } from './SideBar.jsx'
import { BeatLoader } from 'react-spinners'
import * as CompareContentBoxActions from '../redux/CompareContentBoxAction.js'

import CompareDataBox from './CompareDataBox.jsx'
import MessageBox from './MessageBox.jsx'

let CanvasJS = CanvasJSReact.CanvasJS
let CanvasJSChart = CanvasJSReact.CanvasJSChart

import '../stylesheets/CompareContentBox.css'

class CompareContentBox extends React.Component{

    constructor(props){
        super(props)
    }

    componentWillMount() {

        const { CompareContentBoxDispatch } = this.props

        CompareContentBoxDispatch.getProductFamily()

    }

    componentDidMount() {

    }


    render(){

        const { SideBarState , CompareContentBoxState , CompareContentBoxDispatch } = this.props

        return(

            <div className='MainContentBox-Container'>

                <div className="MainContentBox-Container__Header-Row">
                    <h3 className="Header-Row__HeaderText-H3">OVERVIEW > COMPARE</h3>
                    <div className="Header-Row__Grid-Container">
                        <div className="Header-Row__Grid-Container__Item">
                            {CATEGORY_ICON_ATTACHER(SideBarState.SELECTED_CATEGORY,"Category-Header-Icon")}
                        </div>
                        <div className="Header-Row__Grid-Container__Item">
                            <span className="Header-Row__Grid-Container__Item-Text">
                                {'Comparison'}
                            </span>
                        </div>
                    </div>
                    <hr className="Header-Row__Divider"/>
                </div>

                <div className="Compare-Options-Row">
                    <div className="Options-Row__Item">
                        <select onChange={(event)=>{
                            CompareContentBoxDispatch.changeProductFamily(event)
                        }} disabled={!(CompareContentBoxState.IS_PRODUCT_FAMILY_RESPONSED)} name="" id="">
                            <option value="None">제품군 선택</option>
                            {RENDER_PRODUCT_FAMILY_OPTIONS(CompareContentBoxState.PRODUCT_FAMILY)}
                        </select>
                    </div>
                    <div className="Options-Row__Item">
                        <select onChange={(event)=>{
                            CompareContentBoxDispatch.selectModel(event,1,CompareContentBoxState.SELECTED_MODELS)
                        }} disabled={!(CompareContentBoxState.IS_PRODUCT_LISTS_RESPONSED)} name="" id="">
                            <option value="None">모델 1</option>
                            {RENDER_PRODUCT_LIST_OPTIONS(CompareContentBoxState.PRODUCT_LISTS)}
                        </select>
                    </div>
                    <div className="Options-Row__Item">
                        <select onChange={(event)=>{
                            CompareContentBoxDispatch.selectModel(event,2,CompareContentBoxState.SELECTED_MODELS)
                        }} disabled={!(CompareContentBoxState.IS_PRODUCT_LISTS_RESPONSED && CompareContentBoxState.IS_MODEL_1_SELECTED)} name="" id="">
                            <option value="None">모델 2</option>
                            {RENDER_PRODUCT_LIST_OPTIONS(CompareContentBoxState.PRODUCT_LISTS)}
                        </select>
                    </div>
                    <div className="Options-Row__Item">
                        <select onChange={(event)=>{
                            CompareContentBoxDispatch.selectModel(event,3,CompareContentBoxState.SELECTED_MODELS)
                        }} disabled={!(CompareContentBoxState.IS_PRODUCT_LISTS_RESPONSED && CompareContentBoxState.IS_MODEL_2_SELECTED)} name="" id="">
                            <option value="None">모델 3</option>
                            {RENDER_PRODUCT_LIST_OPTIONS(CompareContentBoxState.PRODUCT_LISTS)}
                        </select>
                    </div>

                    <div onClick={()=>{
                        CompareContentBoxDispatch.Compare(
                            CompareContentBoxState.SELECTED_MODELS,
                            CompareContentBoxState.SELECTED_FAMILY
                            )
                    }} className="Options-Row__Item">
                        <div className="Compare-Btn">
                            <span className="Compare-Btn__Text">Compare</span>
                        </div>
                    </div>

                </div>

                <div className="Content-Row">
                    
                    {CompareContentBoxState.IS_SHOWING_COMPARE_DATA? 
                        (<CompareDataBox />) 
                        : 
                        (<MessageBox message={CompareContentBoxState.STATEMENT} />)
                    }
                    

                </div>

            
            </div>

        )

    }

}

const RENDER_PRODUCT_FAMILY_OPTIONS = (family) => {
   
    return family.map((element)=>{
        return <option key={element} value={element}>{element}</option>
    })

}

const RENDER_PRODUCT_LIST_OPTIONS = (product_list) => {

    return product_list.map((element)=>{

        return <option key={element} value={element}>{element}</option>

    })

}


const mapStateToProps = (state) => {

    return {

        SideBarState : state.SideBar,
        CompareContentBoxState : state.CompareContentBox

    }

}

const mapDispatchToProps = (dispatch) => {

    return {

        CompareContentBoxDispatch : {

            getProductFamily(){
            
                dispatch(CompareContentBoxActions.AC_LOAD_PRODUCT_FAMILY_LISTS())
    
            },
            changeProductFamily(event){

                let family = event.target.value
                dispatch(CompareContentBoxActions.AC_USER_SELECTED_PRODUCT_FAMILY(family))

            },
            selectModel(event,idx,SELECTED_MODELS){

                let model = event.target.value
                
                for (let index = 0; index < SELECTED_MODELS.length; index++) {
                    
                    if(SELECTED_MODELS[index]["model"] === model || model === "None"){
                        
                        event.target.value = "None"

                        dispatch(CompareContentBoxActions.AC_REMOVE_EXCEPTION_SELECTED_MODELS_IDX(idx))

                        return
                    }
                    
                }

                switch(idx){

                    case 1 :

                        return dispatch(CompareContentBoxActions.AC_USER_SELECTED_PRODUCT_MODEL_1(model))

                    case 2 :

                        return dispatch(CompareContentBoxActions.AC_USER_SELECTED_PRODUCT_MODEL_2(model))

                    case 3 :

                        return dispatch(CompareContentBoxActions.AC_USER_SELECTED_PRODUCT_MODEL_3(model))

                    default :

                        return

                }


            },

            Compare(SELECTED_MODELS,SELECTED_FAMILY){

                if(SELECTED_MODELS.length < 2){
                    return alert('비교 제품은 최소 2개 이상이어야 합니다.')
                }
                else{

                    dispatch(
                        CompareContentBoxActions.AC_USER_CLICKED_COMPARE_BUTTON({
                            FAMILY : SELECTED_FAMILY,
                            MODELS : SELECTED_MODELS
                        })

                    )

                }
            }
    

        }
        
    }

}

CompareContentBox = connect(mapStateToProps,mapDispatchToProps)(CompareContentBox)

export default CompareContentBox
