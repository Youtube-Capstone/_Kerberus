
import React from 'react'
import '../stylesheets/MainContentBox.css'
import CanvasJSReact from "../canvasjs/canvasjs.react"
import { connect } from 'react-redux'
import { CATEGORY_ICON_ATTACHER } from './SideBar.jsx'
import { BeatLoader } from 'react-spinners'

let CanvasJS = CanvasJSReact.CanvasJS
let CanvasJSChart = CanvasJSReact.CanvasJSChart

class SearchContentBox extends React.Component{

    constructor(props){

        super(props)

    }

    componentDidMount() {

        

    }


    render(){

        const { SideBarState , CategoryContentBoxState , CategoryContentBoxDispatch } = this.props

        return(

            <div className='MainContentBox-Container'>

                <div className="MainContentBox-Container__Header-Row">
                    <h3 className="Header-Row__HeaderText-H3">OVERVIEW > SEARCH</h3>
                    <div className="Header-Row__Grid-Container">
                        <div className="Header-Row__Grid-Container__Item">
                            {CATEGORY_ICON_ATTACHER(SideBarState.SELECTED_CATEGORY,"Category-Header-Icon")}
                        </div>
                        <div className="Header-Row__Grid-Container__Item">
                            <span className="Header-Row__Grid-Container__Item-Text">
                                {SideBarState.SELECTED_CATEGORY}
                            </span>
                        </div>
                    </div>
                    <hr className="Header-Row__Divider"/>
                </div>

                <div className="MainContentBox-Container__Grid-Row">

                </div>

            </div>

        )

    }

}

const mapStateToProps = (state) => {

    return {

        SideBarState : state.SideBar

    }

}

const mapDispatchToProps = (dispatch) => {

    return {

    }

}

SearchContentBox = connect(mapStateToProps,mapDispatchToProps)(SearchContentBox)

export default SearchContentBox
