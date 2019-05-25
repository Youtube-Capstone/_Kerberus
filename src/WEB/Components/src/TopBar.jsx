import React from 'react'
import IconSearch from './IconSearch.jsx'
import '../stylesheets/TopBar.css'

import { connect } from 'react-redux'
import { AC_USER_FOLD_VERTICAL_SIDEBAR , AC_USER_CLICKED_HOME} from '../redux/TopBarAction.js'

import { MdMenu } from 'react-icons/md'

import YoutubeLogo from '../../public/images/youtube-draw-logo.png'

import _History from '../history/history.js'

class TopBar extends React.Component{
    
    render(){

        const { TopBarDispatch } = this.props

        return(

            <div className="TopBar-Grid-Container">

                <div className="TopBar-Grid-Container__Item">

                    <img id="YOUTUBELOGO" src={YoutubeLogo} alt="YoutubeLogo"/>
                    <span className="TopBar-Grid-Container__Item-Header-Text" onClick={()=>{
                        TopBarDispatch.goHome()
                    }}>Kerberus</span>
                        
                </div>

                <div className="TopBar-Grid-Container__Item">

                </div>

                <div className="TopBar-Grid-Container__Item">
                    <IconSearch />
                    <div className="TopBar-Grid-Container__Item__Nav-Toogle-Container">
                        <MdMenu id="NAV_TOGGLE" onClick={TopBarDispatch.foldSideBar}/>
                    </div>
                </div>

            </div>

        )

    }

}

const mapDispatchToProps = ( dispatch ) => {

    return {

        TopBarDispatch : {

            foldSideBar(){
                dispatch(AC_USER_FOLD_VERTICAL_SIDEBAR())
            },
            goHome(){
                dispatch(AC_USER_CLICKED_HOME())
            }
        }

    }

}

TopBar = connect(null,mapDispatchToProps)(TopBar)

export default TopBar
