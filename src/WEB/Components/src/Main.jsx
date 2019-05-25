import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import '../stylesheets/Main.css'
import TopBar from './TopBar.jsx'
import SideBar from './SideBar.jsx'
import MainContentBox from './MainContentBox.jsx'
import CategoryContentBox from './CategoryContentBox.jsx'
import HomeContentBox from './HomeContentBox.jsx'
import CompareContentBox from './CompareContentBox.jsx'
import SearchContentBox from './SearchContentBox.jsx'

class Main extends React.Component{

    render(){

        const { SideBarState , CategoryContentBoxState } = this.props

        return(

            <div className="Main-Wrapper">

                <div className="Main-Wrapper__TopBar">
                    <TopBar />
                </div>

                <div className="Main-Wrapper__Main-Grid-Container">

                    <div className={`Main-Wrapper__Main-Grid-Container__Item ${SideBarState.IS_SIDEBAR_FOLDED? ('--zidx2 --show') : ('--zidx1 --hide')}`}>
                        <SideBar />
                    </div>

                    <div className={`Main-Wrapper__Main-Grid-Container__Item ${SideBarState.IS_SIDEBAR_FOLDED? ('--zidx1') : ('--zidx2')}`}>
                        {RENDER_BY_CATEGORY(SideBarState.SELECTED_CATEGORY)}
                    </div>

                </div>

            </div>

        )

    }

}

const RENDER_BY_CATEGORY = (selectedCategory) => {

    switch (selectedCategory) {

        case "Home" :

            return <HomeContentBox />

        case "DashBoard" :

            return <MainContentBox />

        case "Compare" :

            return <CompareContentBox />

        case "Search" :

            return <SearchContentBox />

        default :

            return <CategoryContentBox />

    }

}


const mapStateToProps = ( state ) => {

    return {

        SideBarState : state.SideBar,
        CategoryContentBoxState: state.CategoryContentBox

    }
    
}


Main = connect(mapStateToProps,null)(Main)

export default Main
