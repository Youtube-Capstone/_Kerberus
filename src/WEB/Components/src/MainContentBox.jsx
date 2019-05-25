import React from 'react'
import '../stylesheets/MainContentBox.css'
import CanvasJSReact from "../canvasjs/canvasjs.react"
import { connect } from 'react-redux'
import { MdDashboard, MdDataUsage, MdPeople, MdTrendingUp, MdPieChart , MdDonutSmall, MdDonutLarge } from 'react-icons/md'
import * as MainContentBoxActions from '../redux/MainContentBoxAction.js'
import { BeatLoader } from 'react-spinners'

let CanvasJS = CanvasJSReact.CanvasJS
let CanvasJSChart = CanvasJSReact.CanvasJSChart

class MainContentBox extends React.Component{

    constructor(props){
        super(props)
    }

    componentDidMount(){

        this.props.MainContentBoxDispatch.getTotal(7)
        this.props.MainContentBoxDispatch.getUserAccessed(7)
        this.props.MainContentBoxDispatch.getNumOfChannelCrawled()
        this.props.MainContentBoxDispatch.getProductFamily()

    }
    
    render(){
        
        const { MainContentBoxState } = this.props

        return(

            <div className='MainContentBox-Container'>

                <div className="MainContentBox-Container__Header-Row">
                    <h3 className="Header-Row__HeaderText-H3">OVERVIEW > DASHBOARD</h3>
                    <h1 className="Header-Row__HeaderText-H1">Dashboard</h1>
                    <hr className="Header-Row__Divider"/>
                </div>

                <div className="MainContentBox-Container__Grid-Row">

                    <div className="Grid-Row__Item">
                        <div className="Item__Tag --Background-Darkbrown">
                            <div className="Item__Tag__Item">
                                <MdDataUsage size={`25px`} className={`ChartIcon`} color={"hsl(10, 98%, 49%)"}/>
                            </div>
                            <div className="Item__Tag__Item">
                                <span className="Item__Tag__Item-Text">
                                    전체 수집된 데이터량
                                </span>
                            </div>
                            <div className="Item__Tag__Item">
                               
                            </div>
                        </div>
                        <div>
                            {!MainContentBoxState.IS_TOTAL_COLLECTED_DATA_SUCCESS?
                                (
                                    <div className='Loader-Container'>
                                        <BeatLoader
                                        size={25}
                                        color={'hsl(0, 0%, 12%)'}
                                        />
                                    </div> 
                                ) 
                                : 
                                (
                                    <CanvasJSChart options={MainContentBoxState.TOTAL_COLLECTED_DATA} onRef={ref => this.TOTAL = ref}/>
                                )
                            }
                            
                        </div>
                    </div>
                    <div className="Grid-Row__Item">
                        <div className="Item__Tag --Background-Darkbrown">
                            <div className="Item__Tag__Item">
                                <MdPeople size={`25px`} className={`ChartIcon`} color={"hsl(10, 98%, 49%)"}/>
                            </div>
                            <div className="Item__Tag__Item">
                                <span className="Item__Tag__Item-Text">
                                    서비스 이용률
                                </span>
                            </div>
                            <div className="Item__Tag__Item">
                               
                            </div>
                        </div>
                        <div>
                            {!MainContentBoxState.IS_USER_ACCESSED_DATA_SUCCESS?
                                (
                                    <div className='Loader-Container'>
                                        <BeatLoader
                                        size={25}
                                        color={'hsl(0, 0%, 12%)'}
                                        />
                                    </div> 
                                ) 
                                : 
                                (
                                    <CanvasJSChart options={MainContentBoxState.USER_ACCESSED_DATA} onRef={ref => this.ACCESS = ref}/>
                                )
                            }
                            
                        </div>
                    </div>
                    <div className="Grid-Row__Item">
                        <div className="Item__Tag --Background-Darkbrown">
                            <div className="Item__Tag__Item">
                                <MdPieChart size={`25px`} className={`ChartIcon`} color={"hsl(10, 98%, 49%)"}/>
                            </div>
                            <div className="Item__Tag__Item">
                                <span className="Item__Tag__Item-Text">
                                    카테고리별 수집비율
                                </span>
                            </div>
                            <div className="Item__Tag__Item">

                            </div>
                        </div>
                        <div>
                            {!MainContentBoxState.IS_CHANNEL_CRAWLED_DATA_SUCCESS?
                                (
                                    <div className='Loader-Container'>
                                        <BeatLoader
                                            size={25}
                                            color={'hsl(0, 0%, 12%)'}
                                        />
                                    </div>
                                )
                                :
                                (
                                    <CanvasJSChart options={MainContentBoxState.CHANNEL_CRAWLED_DATA} onRef={ref => this.CHANNEL = ref}/>
                                )
                            }

                        </div>
                    </div>
                    <div className="Grid-Row__Item">
                        <div className="Item__Tag --Background-Darkbrown">
                            <div className="Item__Tag__Item">
                                <MdDonutLarge size={`25px`} className={`ChartIcon`} color={"hsl(10, 98%, 49%)"}/>
                            </div>
                            <div className="Item__Tag__Item">
                                <span className="Item__Tag__Item-Text">
                                    제품군별 수집량
                                </span>
                            </div>
                            <div className="Item__Tag__Item">

                            </div>
                        </div>
                        <div>
                            {!MainContentBoxState.IS_PRODUCT_FAMILY_DATA_SUCCESS?
                                (
                                    <div className='Loader-Container'>
                                        <BeatLoader
                                            size={25}
                                            color={'hsl(0, 0%, 12%)'}
                                        />
                                    </div>
                                )
                                :
                                (
                                    <CanvasJSChart options={MainContentBoxState.PRODUCT_FAMILY_DATA} onRef={ref => this.FAMILY = ref}/>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>

        )

    }

}

const mapStateToProps = (state) => {

    return {
        MainContentBoxState : state.MainContentBox
    }

}

const mapDispatchToProps = ( dispatch ) => {

    return {

        MainContentBoxDispatch : {
            getTotal(TIME_PARTITION){

                dispatch(MainContentBoxActions.AC_LOAD_TOTAL_COLLECTED_DATA(TIME_PARTITION))

            },
            getUserAccessed(TIME_PARTITION){

                dispatch(MainContentBoxActions.AC_LOAD_USER_ACCESSED_DATA(TIME_PARTITION))

            },
            getNumOfChannelCrawled(){

                dispatch(MainContentBoxActions.AC_CHANNEL_CRAWLED_DATA())

            },
            getProductFamily(){
                
                dispatch(MainContentBoxActions.AC_PRODUCT_FAMILY_DATA())

            }
        }

    }

}

MainContentBox = connect(mapStateToProps,mapDispatchToProps)(MainContentBox)

export default MainContentBox
