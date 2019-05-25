import React from 'react'
import '../stylesheets/SideBar.css'

import { connect } from 'react-redux'
import { MdBuild , MdExtension , MdArrowDropDown , MdDirectionsCar , MdFace, MdPublic } from 'react-icons/md'
import { MdPeople , MdMovie , MdVideogameAsset , MdCompare , MdAccessibility , MdLibraryMusic , MdComputer , MdDeveloperBoard } from 'react-icons/md'
import { MdAccountBalance , MdLightbulbOutline } from 'react-icons/md'
import { FaBookOpen , FaGrinSquintTears , FaUtensils , FaNewspaper , FaBlogger } from 'react-icons/fa'
import { FaDog , FaShoePrints , FaTripadvisor , FaMinus } from 'react-icons/fa'

import { AC_SIDEBAR_INITIALIZE, AC_USER_CLICKED_CATEGORY } from '../redux/SideBarAction'
import { AC_USER_CLICKED_HOME } from "../redux/TopBarAction.js";

import _Store from '../redux/_Store'
import _History from '../history/history.js'

class SideBar extends React.Component{

    componentDidMount() {

        _Store.dispatch(AC_SIDEBAR_INITIALIZE())


    }

    render(){

        let { SideBarState , SideBarDispatch } = this.props

        return(

            <div className={`SideBar-Container ${SideBarState.IS_SIDEBAR_FOLDED? ('--Fold') : ('')}`}>

                <div onClick={()=>{
                    SideBarDispatch.clickCategory('Home')
                }} className="SideBar-Container__Row">

                    <div className="Row__Item">
                        <MdLightbulbOutline className='SideBar-Container__Row__Icon' />
                    </div>
                    <div className="Row__Item">
                    <span className="SideBar-Container__Row__Text">
                        {'What is it ?'}
                    </span>
                    </div>
                    <div className="Row__Item">

                    </div>


                </div>

                <div onClick={()=>{
                    SideBarDispatch.clickCategory('Compare')
                }} className="SideBar-Container__Row">

                    <div className="Row__Item">
                        <MdCompare className='SideBar-Container__Row__Icon' />
                    </div>
                    <div className="Row__Item">
                    <span className="SideBar-Container__Row__Text">
                        {'Comparison'}
                    </span>
                    </div>
                    <div className="Row__Item">

                    </div>


                </div>

                <div onClick={()=>{
                    SideBarDispatch.clickCategory('DashBoard')
                }} l className="SideBar-Container__Row">

                    <div className="Row__Item">
                        <MdDeveloperBoard className='SideBar-Container__Row__Icon' />
                    </div>
                    <div className="Row__Item">
                    <span className="SideBar-Container__Row__Text">
                        {'Dashboard'}
                    </span>
                    </div>
                    <div className="Row__Item">

                    </div>


                </div>


                {CATEGORY_RENDERER(SideBarState.CATEGORY,SideBarDispatch)}

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
        SideBarDispatch : {
            clickCategory(category){
                dispatch(AC_USER_CLICKED_CATEGORY(category))
            },
            goHome(){
                dispatch(AC_USER_CLICKED_HOME())
            },
            goDashBoard(){
                dispatch(AC_USER_CLICKED_DASHBOARD())
            },
        }
    }

}

const CATEGORY_RENDERER = (category,CategoryDispatch) => {

    return category.map((element, idx , arr)=>{
        return (
            <div key={idx} onClick={()=>{
                CategoryDispatch.clickCategory(element)
            }}  className="SideBar-Container__Row">

                <div className="Row__Item">
                    {CATEGORY_ICON_ATTACHER(element ,"SideBar-Container__Row__Icon")}
                </div>
                <div className="Row__Item">
                    <span className="SideBar-Container__Row__Text">
                        {element}
                    </span>
                </div>
                <div className="Row__Item">
                    <MdArrowDropDown className="SideBar-Container__Row__Icon-Arrow" />
                </div>
                
                
            </div>
        )
    })

}

export const CATEGORY_ICON_ATTACHER = (CATEGORY , CN) => {

    switch(CATEGORY){

        case "과학기술":
            return(
                <MdBuild className={CN} />
            )
        case "엔터테인먼트":
            return(
                <MdExtension className={CN} />
            )
        case "자동차":
            return(
                <MdDirectionsCar className={CN} />
            )
        case "뷰티/패션":
            return(
                <MdFace className={CN} />
            )
        case "코미디":
            return(
                <FaGrinSquintTears className={CN} />
            )
        case "교육":
            return(
                <FaBookOpen className={CN} />
            )
        case "가족 엔터테인먼트":
            return(
                <MdPeople className={CN} />
            )
        case "영화/애니메이션":
            return(
                <MdMovie className={CN} />
            )
        case "음식":
            return(
                <FaUtensils className={CN} />
            )
        case "게임":
            return(
                <MdVideogameAsset className={CN} />
            )
        case "노하우/스타일":
            return(
                <MdAccessibility className={CN} />
            )
        case "음악":
            return(
                <MdLibraryMusic className={CN} />
            )
        case "뉴스/정치":
            return(
                <FaNewspaper className={CN} />
            )
        case "비영리/사회운동":
            return(
                <MdAccountBalance className={CN} />
            )
        case "인물/블로그":
            return(
                <FaBlogger className={CN} />
            )
        case "애완동물/동물":
            return(
                <FaDog className={CN} />
            )
        case "스포츠":
            return(
                <FaShoePrints className={CN} />
            )
        case "여행/이벤트":
            return(
                <FaTripadvisor className={CN} />
            )
        case "IT/기기":
            return(
                <MdComputer className={CN} />
            )
        case "Home" :
            return (
                <MdLightbulbOutline className={CN} />
            )
        case "DashBoard" :
            return (
                <MdDeveloperBoard className={CN}/>
            )
        case "Compare" :
            return (
                <MdCompare className={CN}/>
            )
        case "Search" :
            return (
                <MdPublic className={CN}/>
            )
        default :
            return(
                <FaMinus className={CN} />
            )

    }


}

SideBar = connect(mapStateToProps, mapDispatchToProps)(SideBar)

export default SideBar
