
import React from 'react'
import CanvasJSReact from "../canvasjs/canvasjs.react"
import { connect } from 'react-redux'
import { CATEGORY_ICON_ATTACHER } from './SideBar.jsx'
import { BeatLoader } from 'react-spinners'

let CanvasJS = CanvasJSReact.CanvasJS
let CanvasJSChart = CanvasJSReact.CanvasJSChart

import { FaYoutube , FaRunning , FaCompass , FaRedditAlien } from 'react-icons/fa'

import '../stylesheets/HomeContentBox.css'

class HomeContentBox extends React.Component{

    constructor(props){
        super(props)
    }

    componentDidMount() {

    }


    render(){

        const { SideBarState } = this.props

        return(

            <div className='MainContentBox-Container'>

                <div className="MainContentBox-Container__Header-Row">
                    <h3 className="Header-Row__HeaderText-H3">OVERVIEW > PURPOSE</h3>
                    <div className="Header-Row__Grid-Container">
                        <div className="Header-Row__Grid-Container__Item">
                            {CATEGORY_ICON_ATTACHER(SideBarState.SELECTED_CATEGORY,"Category-Header-Icon")}
                        </div>
                        <div className="Header-Row__Grid-Container__Item">
                            <span className="Header-Row__Grid-Container__Item-Text">
                                {'What is it?'}
                            </span>
                        </div>
                    </div>
                    <hr className="Header-Row__Divider"/>
                </div>

                <div className={'HomeContentBox-Row'}>

                    <div className={'Row__Grid-Container'}>

                        <div className={'Grid-Container__Item'}>
                            <h1 className={'Item__Header-Text-H1'}>Kerberus.</h1>
                        </div>

                        <div className="Small-Divider-Row">
                            <div className="Small-Divider"></div>
                        </div>

                        <div className={'Grid-Container__Item'}>
                            <h2 className={'Item__Header-Text-H2'}>제품에 대한 비교와 사용자 평가 및 키워드 제공 서비스</h2>
                        </div>

                        <div className="Grid-Container__Item">
                            <div>
                                <span></span>
                            </div>
                        </div>

                        <div className={'Divider'}></div>

                        <div className={'Grid-Container__Item Feature-Grid-Container'}>
                            <div className={'Grid-Container__Item__Item'}>
                                <div className="Grid-Container__Item__Item__Item">
                                    <div className="Grid-Container__Item__Item__Item__Side">
                                        <div className="Side__Item">
                                            <FaRunning size={"40px"} />
                                        </div>
                                        <div className="Side__Item"></div>
                                    </div>
                                    <div className="Grid-Container__Item__Item__Item__Content">
                                        <div className="Content__Item">
                                            <span>웹 데이터 접근성</span>
                                        </div>
                                        <div className="Content__Item">
                                            <p>저희 서비스는 SNS 플랫폼 상에 존재하느 웹 데이터를 일괄적으로 수집하여 유의미한 데이터를 추려내어 제공하고 있습니다.
                                                 제품에 대한 시장조사를 하거나 어떤 물건을 구매할때 더 이상 수많은 댓글들과 포스팅을 살펴볼 필요가 없겠죠.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={'Grid-Container__Item__Item'}>
                               
                            <div className="Grid-Container__Item__Item__Item">
                                    <div className="Grid-Container__Item__Item__Item__Side">
                                        <div className="Side__Item">
                                            <FaCompass size={"40px"} />
                                        </div>
                                        <div className="Side__Item"></div>
                                    </div>
                                    <div className="Grid-Container__Item__Item__Item__Content">
                                        <div className="Content__Item">
                                            <span>제품군 비교 분석</span>
                                        </div>
                                        <div className="Content__Item">
                                            <p>같은 제품군 사이에서 어떤 물건을 구매하실지 고민이 된다면 Comparison탭을 이용하여 보시는 것도 좋습니다.
                                                저희는 감정분석을 통해 소비자의 선호도와 반응이 어떤지 확인하고 있죠. 비교차트를
                                                통해 의미 도출이 더 용이할 겁니다. </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={'Grid-Container__Item__Item'}>
                              
                            <div className="Grid-Container__Item__Item__Item">
                                    <div className="Grid-Container__Item__Item__Item__Side">
                                        <div className="Side__Item">
                                            <FaRedditAlien size={"40px"} />
                                        </div>
                                        <div className="Side__Item"></div>
                                    </div>
                                    <div className="Grid-Container__Item__Item__Item__Content">
                                        <div className="Content__Item">
                                            <span>머신러닝</span>
                                        </div>
                                        <div className="Content__Item">
                                            <p>같은 제품군 사이에서 어떤 물건을 구매하실지 고민이 된다면 Comparison탭을 이용하여 보시는 것도 좋습니다.
                                                    저희는 감정분석을 통해 소비자의 선호도와 반응이 어떤지 확인하고 있죠. 비교차트를
                                                    통해 의미 도출이 더 용이할 겁니다. </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        


                    </div>

                </div>

            </div>

        )

    }

}

const RAND_IMAGE = () => {

    let RAND_IMAGE = document.getElementById('RAND_IMAGE')

    let rand_number = Math.floor((Math.random() * imgArray.length))

    let rand_src = imgArray[rand_number]

    RAND_IMAGE.style.backgroundImage = `url(${rand_src})`

    setInterval(()=>{
        let rand_number = Math.floor((Math.random() * imgArray.length))

        let rand_src = imgArray[rand_number]

        RAND_IMAGE.style.backgroundImage = `url(${rand_src})`
    },5000)


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

HomeContentBox = connect(mapStateToProps,mapDispatchToProps)(HomeContentBox)

export default HomeContentBox
