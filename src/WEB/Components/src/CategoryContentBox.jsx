
import React from 'react'
import '../stylesheets/MainContentBox.css'
import CanvasJSReact from "../canvasjs/canvasjs.react"
import { connect } from 'react-redux'
import { CATEGORY_ICON_ATTACHER } from './SideBar.jsx'
import { BeatLoader , ClimbingBoxLoader, PropagateLoader, PulseLoader } from 'react-spinners'
import '../stylesheets/CategoryContentBox.css'
import {MdDataUsage, MdPeople, MdPieChart, MdList, MdInsertChart, MdExitToApp} from "react-icons/md";
import * as CategoryContentBoxActions from '../redux/CategoryContentBoxAction.js'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

let CanvasJS = CanvasJSReact.CanvasJS
let CanvasJSChart = CanvasJSReact.CanvasJSChart

class CategoryContentBox extends React.Component{

    constructor(props){
        super(props)
        this.handelScroll = this.handelScroll.bind(this)
    }

    componentDidMount() {

        const { CategoryContentBoxDispatch } = this.props
        CategoryContentBoxDispatch.MODEL_RATIO_BY_CATEGORY()
        CategoryContentBoxDispatch.MODEL_INFO_BY_CATEGORY()
        CategoryContentBoxDispatch.MODEL_IMAGES()
        CategoryContentBoxDispatch.USER_PREFERENCE()
        CategoryContentBoxDispatch.RELATED_CHANNELS()

    }

    handelScroll(event){
        const { CategoryContentBoxDispatch } = this.props

        let scrollHeight = event.target.scrollHeight
        let scrollTop = event.target.scrollTop
        let clientHeight = event.target.clientHeight
        
        if((scrollHeight - scrollTop) === clientHeight){
            CategoryContentBoxDispatch.PRODUCT_KEYWORD_GET_MORE()
        }

    }

    render(){
        
        const { SideBarState , CategoryContentBoxState , CategoryContentBoxDispatch } = this.props

        return(

            <div className='MainContentBox-Container'>

                <div onClick={CategoryContentBoxDispatch.PRODUCT_INFO_OFF} className={`Product-Modal-Wrapper ${CategoryContentBoxState.IS_PRODUCT_INFO_CLICKED?('Modal-Activated'):('Modal-Deactivated')}`}>

                    <div></div>

                    <div onClick={
                        (event)=>{event.stopPropagation()}
                    } className="Modal-Container">

                        {CategoryContentBoxState.IS_PRODUCT_INFO_SUCCESS?
                            (<div className="Modal-Container__Content">

                            <MdExitToApp onClick={CategoryContentBoxDispatch.PRODUCT_INFO_OFF} size={"30"} id="MODAL_EXIT" />

                                <div className="Content__Header">
        
                                        <h3 className="Content__Header__Text"># {CategoryContentBoxState.PRODUCT_INFO__MODEL_NAME}</h3>
                                        
                                        
                                </div>

                                <hr className="Header-Row__Divider"/>

                                <div className="Content__Grid-Box">

                                    <div className="Grid-Box__Item Product-Img-Url">
                                        <div className="Product-Img-Url__Item Product-Img-Url__Img-Box">
                                            <img src={GET_IMAGE_URL(CategoryContentBoxState)} alt=""/>
                                        </div>
                                        <div className="Product-Img-Url__Item Product-Img-Url__Url-Box">

                                            <div className="reply_content_box">
                                                <div className="keyword-band">
                                                    <span className="keyword-band-text">키워드 빈도</span> 
                                                </div>
                                                {CategoryContentBoxState.IS_PRODUCT_KEYWORD_SUCCESS?
                                                    (<div id="KEYWORDS" onScroll={this.handelScroll} className="Analysis-Container__Item">
                                                        
                                                        {RENDER_KEYWORD_FREQUENCY(CategoryContentBoxState.PRODUCT_KEYWORDS)}
                                                    </div>)
                                                    :
                                                    (<div>
                                                        
                                                    </div>)
                                                }
                                            </div>

                                        </div>
                                    </div>

                                    <div className="Grid-Box__Item Product-Info">
                                        <div className="Product-Info__Item">
                                            <div className="Product-Info__Item__Tag">분석 댓글량</div>
                                            <span className="Product-Info__Item-Text"><span className="Item-Text__Value">{CategoryContentBoxState.PRODUCT_INFO.data[0]["SUM(NUM_OF_REPLY)"]}</span>개의 댓글</span>
                                        </div>
                                        <div className="Product-Info__Item">
                                            <div className="Product-Info__Item__Tag">분석 영상수</div>
                                            <span className="Product-Info__Item-Text"><span className="Item-Text__Value">{CategoryContentBoxState.PRODUCT_INFO.data[0]["COUNT(MODEL_NAME)"]}</span>영상</span>
                                        </div>
                                        <div className="Product-Info__Item-Chart-Box">
                                            <div className="Product-Info__Item__Tag">컨텐츠 선호도</div>
                                            <CanvasJSChart options={
                                                {

                                                    status : 1,
                                                    animationEnabled : true,
                                                    interactivityEnabled : true,
                                                    animationDuration : 1000,
                                                    height : 190,
                                                    data : [{
                                                        startAngle: 75,
                                                        toolTipContent: `{name} : {y}`,
                                                        indexLabel : `{name} {y_percentage}%`,
                                                        indexLabelFontSize: 12,
                                                        indexLabelFontFamily : "NotoSansKR",
                                                        indexLabelFontWeight : "bold",
                                                        indexLabelPlacement : "inside",
                                                        showInLegend : "true",
                                                        legendMarkerType: "square",
                                                        innerRadius: "75%",
                                                        radius: "100%",
                                                        type: "doughnut",
                                                        dataPoints : [
                                                            {
                                                                y : CategoryContentBoxState.PRODUCT_INFO.data[0]["SUM(LIKES)"],
                                                                y_percentage : ((CategoryContentBoxState.PRODUCT_INFO.data[0]["SUM(LIKES)"] / (CategoryContentBoxState.PRODUCT_INFO.data[0]["SUM(LIKES)"]+CategoryContentBoxState.PRODUCT_INFO.data[0]["SUM(HATES)"]))*100).toFixed(2),
                                                                name : "좋아요",
                                                                color : "hsl(231, 99%, 62%)"
                                                            },
                                                            {
                                                                y : CategoryContentBoxState.PRODUCT_INFO.data[0]["SUM(HATES)"],
                                                                y_percentage : ((CategoryContentBoxState.PRODUCT_INFO.data[0]["SUM(HATES)"] / (CategoryContentBoxState.PRODUCT_INFO.data[0]["SUM(LIKES)"]+CategoryContentBoxState.PRODUCT_INFO.data[0]["SUM(HATES)"]))*100).toFixed(2),
                                                                name : "싫어요",
                                                                color : "hsl(348, 100%, 55%)"
                                                            }
                                                        ]
                                                    }],
                                    
                                    
                                                }
                                            } />
                                        </div>
                                    </div>

                                    <div className="Grid-Box__Item Product-Info2">
                                        <div className="Product-Info__Item-Chart-Box">
                                            <div className="Product-Info__Item__Tag">가격 추이</div>
                                            {
                                                CategoryContentBoxState.IS_PRODUCT_PRICE_SUCCESS?
                                                    (
                                                        <CanvasJSChart options={CategoryContentBoxState.PRODUCT_PRICE} />
                                                    )
                                                    :
                                                    (
                                                        <PulseLoader
                                                            size={8}
                                                            margin={'5px'}
                                                            color={'hsl(5, 90%, 58%)'}
                                                        />
                                                    )
                                            }
                                        </div>
                                        
                                        <div className="Product-Info__Item-Chart-Box">
                                            <div className="Product-Info__Item__Tag">제품 선호도</div>
                                            {
                                                CategoryContentBoxState.IS_PRODUCT_PREFERENCE_SUCCESS?
                                                    (
                                                        <CanvasJSChart options={CategoryContentBoxState.PRODUCT_PREFERENCE} />
                                                    )
                                                    :
                                                    (
                                                        <PulseLoader
                                                            size={8}
                                                            margin={'5px'}
                                                            color={'hsl(5, 90%, 58%)'}
                                                        />
                                                    )
                                            }
                                            
                                        </div>
                                    </div>

                                    <div>

                                    </div>

                                </div>

                                <div className="Content__Header">
        
                                        <h3 className="Content__Header__Text"># 유저반응</h3>
                                            
                                </div>

                                <hr className="Header-Row__Divider"/>
                                
                                <div className="Product-Analysis-Container">

                                
                                <div className="reply_band">
                                        <div className="reply_band__Item">
                                            <span className="reply_band__Item-Text">
                                            {CategoryContentBoxState.REPLY_STATUS?
                                                (<span onClick={CategoryContentBoxDispatch.TOGGLE_REPLY_STATUS} className="reply_band__Item-Text-Status --Positive">최고</span>)
                                                :
                                                (<span onClick={CategoryContentBoxDispatch.TOGGLE_REPLY_STATUS} className="reply_band__Item-Text-Status --Negative">최악</span>)
                                            }
                                            의 댓글 50선
                                            </span> 
                                        </div>
                                    </div>
                                    
                                    <div className="user_response">  
                                            {CategoryContentBoxState.IS_PRODUCT_REPLY_SUCCESS?
                                                (   
                                                    RENDER_REPLY_BOXES_BY_STATUS(
                                                        CategoryContentBoxState.PRODUCT_REPLY,
                                                        CategoryContentBoxState.REPLY_STATUS
                                                    )
                                                )
                                                :
                                                (<div></div>)
                                            }
                                    </div>
                                
                                    
                                   
                                
                                </div>
                            </div>)
                            :
                            (
                            <div className="Modal-Container__Content Modal-Loading">
                                
                                    <PulseLoader
                                        size={25}
                                        margin={'5px'}
                                        color={'hsl(5, 90%, 58%)'}
                                    />
                                
                            </div>)
                        }

                            
                        


                    </div>

                </div>

                <div className="MainContentBox-Container__Header-Row">
                    <h3 className="Header-Row__HeaderText-H3">OVERVIEW > CATEGORY</h3>
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

                    <div className="Grid-Row__Item">
                        <div className="Item__Tag --Background-Darkbrown">
                            <div className="Item__Tag__Item">
                                <MdDataUsage size={`25px`} className={`ChartIcon`} color={"hsl(10, 98%, 49%)"}/>
                            </div>
                            <div className="Item__Tag__Item">
                                <span className="Item__Tag__Item-Text">
                                    모델별 수집 비율
                                </span>
                            </div>
                            <div className="Item__Tag__Item">

                            </div>
                        </div>
                        <div>
                            {!CategoryContentBoxState.IS_MODEL_RATIO_BY_CATEGORY_SUCCESS?
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
                                    <CanvasJSChart options={CategoryContentBoxState.MODEL_RATIO_BY_CATEGORY} />
                                )
                            }
                        </div>
                    </div>

                    <div className="Grid-Row__Item">
                        <div className="Item__Tag --Background-Darkbrown">
                            <div className="Item__Tag__Item">
                                <MdInsertChart size={`25px`} className={`ChartIcon`} color={"hsl(10, 98%, 49%)"}/>
                            </div>
                            <div className="Item__Tag__Item">
                                <span className="Item__Tag__Item-Text">
                                    모델별 데이터량
                                </span>
                            </div>
                            <div className="Item__Tag__Item">

                            </div>
                        </div>
                        <div>
                            {!CategoryContentBoxState.IS_SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY_SUCCESS?
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
                                    <CanvasJSChart options={CategoryContentBoxState.SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY} />
                                )
                            }
                        </div>
                    </div>

                    <div className="Grid-Row__Item">
                        <div className="Item__Tag --Background-Darkbrown">
                            <div className="Item__Tag__Item">
                                <MdDataUsage size={`25px`} className={`ChartIcon`} color={"hsl(10, 98%, 49%)"}/>
                            </div>
                            <div className="Item__Tag__Item">
                                <span className="Item__Tag__Item-Text">
                                    컨텐츠 선호도
                                </span>
                            </div>
                            <div className="Item__Tag__Item">

                            </div>
                        </div>
                        <div>
                            {!CategoryContentBoxState.IS_USER_PREFERENCE_SUCCESS?
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
                                    <CanvasJSChart options={CategoryContentBoxState.USER_PREFERENCE} />
                                )
                            }
                        </div>
                    </div>

                    <div className="Grid-Row__Item">
                        <div className="Item__Tag --Background-Darkbrown">
                            <div className="Item__Tag__Item">
                                <MdInsertChart size={`25px`} className={`ChartIcon`} color={"hsl(10, 98%, 49%)"}/>
                            </div>
                            <div className="Item__Tag__Item">
                                <span className="Item__Tag__Item-Text">
                                    관련성 높은 채널
                                </span>
                            </div>
                            <div className="Item__Tag__Item">

                            </div>
                        </div>
                        <div>
                            {!CategoryContentBoxState.IS_HIGHLY_RELATED_CHANNELS_SUCCESS?
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
                                   RENDER_CHANNEL_LIST(CategoryContentBoxState.PAGE_INDEX , CategoryContentBoxState.PAGE_MAX_INDEX , CategoryContentBoxState.HIGHLY_RELATED_CHANNELS)
                                )
                            }
                        </div>

                        <div className="Channel-Controller">
                            <div className="Channel-Controller__Item">
                                <FaArrowAltCircleLeft onClick={CategoryContentBoxDispatch.CHANNEL_LEFT}  className="Channel-Controller__Item__Arrow" size={20} />
                            </div>
                            <div className="Channel-Controller__Item">
                                <FaArrowAltCircleRight onClick={CategoryContentBoxDispatch.CHANNEL_RIGHT} className="Channel-Controller__Item__Arrow" size={20} />
                            </div>
                            <div className="Channel-Controller__Item"></div>
                            <div className="Channel-Controller__Item">
                                {!CategoryContentBoxState.IS_HIGHLY_RELATED_CHANNELS_SUCCESS?
                                    (
                                        <span></span>
                                    )
                                    :
                                    (
                                        <span className="Channel-Controller__Item__Page-Text">{`
                                            ${CategoryContentBoxState.PAGE_INDEX} 
                                            of 
                                            ${CategoryContentBoxState.PAGE_MAX_INDEX}
                                        `}</span> 
                                    )
                                }
                            </div>
                        </div>
                    </div>        

                </div>

                <div className="MainContentBox-Container__Header-Row">

                    <div className="Header-Row__Grid-Container">
                        <div className="Header-Row__Grid-Container__Item">
                            <MdList className="Category-Header-Icon" />
                        </div>
                        <div className="Header-Row__Grid-Container__Item">
                            <span className="Header-Row__Grid-Container__Item-Text">
                                제품 리스트
                            </span>
                        </div>
                    </div>

                    <hr className="Header-Row__Divider"/>

                </div>

                <div className="Grid-Search-Row">

                    <div>
                        <input onChange={(event)=>{
                            CategoryContentBoxDispatch.MODEL_SEARCHING(event)
                        }}  className="Search-Row__Input" type="text" placeholder="모델명을 검색해주세요."/>
                    </div>

                </div>
                
                <div className="Grid-Product-Row">
                 
                    {
                        (CategoryContentBoxState.IS_MODEL_RATIO_BY_CATEGORY_SUCCESS && CategoryContentBoxState.IS_MODEL_IMAGES_SUCCESS)?

                            (
                                RENDER_PRODUCT_LIST(
                                    CategoryContentBoxState.MODEL_RATIO_BY_CATEGORY.data[0].dataPoints,
                                    CategoryContentBoxState.MODEL_SERACH_VALUE,
                                    CategoryContentBoxState.MODEL_IMAGES,
                                    CategoryContentBoxDispatch.PRODUCT_INFO_ON,
                                    CategoryContentBoxDispatch.PRODUCT_INFO_GET,
                                    CategoryContentBoxDispatch.PRODUCT_KEYWORD_GET,
                                    CategoryContentBoxDispatch.PRODUCT_SENTIMENTAL_GET,
                                    CategoryContentBoxDispatch.PRODUCT_PRICE_GET,
                                    CategoryContentBoxDispatch.PRODUCT_REPLY_GET
                                )
                            )
                            :
                            (
                                <div></div>
                            )

                    }
                    
                </div>

            </div>

        )

    }

}

const RENDER_REPLY_BOXES_BY_STATUS = (REPLY , STATUS) => {

    let myStatusArray = []

    if(STATUS === true){
        myStatusArray = REPLY.BEST
    }
    else{
        myStatusArray = REPLY.WORST
    }

    return myStatusArray.map((el) => {

        return (

            <div className="reply_content_box__item">
                <div className="item__image-author">
                    <div className="item__image-author__image">
                        <img className="item__image-author__image-Image" src="data:image/png;base64,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"/>
                    </div>
                    <div className="item__image-author__author">
                        <span className="item__image-author__author-Text">{`${getAuthorText(el.AUTHOR)}`}</span>
                    </div>
                    <div></div>
                    <div className="level_tag">
                        <div className="level_tag__item">
                            {
                                STATUS?
                                (<span className="level_tag__item-header">긍정도</span>)
                                :
                                (<span className="level_tag__item-header">부정도</span>)
                            }
                        </div>
                        <div className="level_tag__item">
                            <span className="level_tag__item-value">{el.SENTIMENTAL}</span>
                        {/* {
                            STATUS?
                            (<span className="level_tag__item-capsule"
                            style={{background : `hsl(138, 100%, ${el.SENTIMENTAL*7}%)`}}></span>)
                            :
                            (<span className="level_tag__item-capsule"
                            style={{background : `hsl(349, 93%, ${Math.abs(el.SENTIMENTAL*7)}%)`}}></span>)
                        } */}
                            
                        </div>
                    </div>
                </div>
                <div>
                    <p className="reply_content_text">{el.CONTENT}</p>
                </div>
            </div>

        )

    })

}

const RENDER_PRODUCT_LIST = (dataPoints,searchValue,modelImages,INFO_ON,INFO_GET,KEYWORD_GET,SENTIMENTAL_GET,PRICE_GET,REPLY_GET) => {

    let Items = []

    let myValue = searchValue.trim()
    if(myValue == ""){
        Items = dataPoints
    }
    else{

        for (let index = 0; index < dataPoints.length; index++) {
            
            if(dataPoints[index]["indexLabel"].includes(searchValue)){
                Items.push(dataPoints[index])
            }

        }

    }

    return Items.map((element,index,array) => {

        return <div onClick={(event)=>{

            INFO_ON(element.indexLabel)
            INFO_GET(element.indexLabel)
            KEYWORD_GET(element.indexLabel)
            SENTIMENTAL_GET(element.indexLabel)
            PRICE_GET(element.indexLabel)
            REPLY_GET(element.indexLabel)

        }} key={element.indexLabel} className="Product-Row__Item">

            <div className="Product-Row__Item__Section Section-Band">

            </div>
            <div className="Product-Row__Item__Section Section-Image">
                <div className="Section-Image__Box">
                    <img src={getUrlByName(modelImages,element.indexLabel)} alt=""/>
                </div>
            </div>
            <div className="Product-Row__Item__Section Section-Content">

                <div className="Section-Content__Item">
                    <h3 className=" Content__Item__Header-Text">{element.indexLabel}</h3>
                    <span className="Content__Item__Sub-Text">총 <span className="Content__Item__Sub-Text__Number">{element.y_num}</span>개의 영상을 수집하여 분석.</span>
                </div>

            </div>
                        
        </div>

    })

}

const getUrlByName = (modelUrls,modelName) => {

    let answer = ""
    let Urls = []
    Urls = modelUrls
    Urls.forEach(element => {
        if(element.MODEL_NAME === modelName){
            answer = element.PICTURE_URL
        }
    })

    return answer
}

const IS_VALID_INPUT = (value) => {

    let answer = false
    let myValue = value
    myValue = myValue.trim()

    if(myValue != ""){
        answer = true
    }

    return answer
}

const RENDER_CHANNEL_LIST = (pageIdx , pageMaxIdx , channelData) => {

    let partition_data = [];
    if(pageIdx < pageMaxIdx){
        partition_data = channelData.data.slice((pageIdx*5),((pageIdx+1)*5))
    }
    
    
    return partition_data.map((element,index) => {

        return (<div key={index} className="Channel-Container">
            <div className="Channel-Container__Item">
                <a target="_blank" href={element["CHANNEL_URL"]}>
                    <h4>
                        {element["CHANNEL_NAME"]}
                    </h4>
                </a>
            </div>
            <div className="Channel-Container__Item">
                <span className="Channel-Container__Item__Video-Match-Text">
                    {`${element["COUNT(CHANNEL_NAME)"]}`}
                </span>
                <span className="unit">
                영상
                </span>
            </div>
            <div className="Channel-Container__Item">
                <span className="Channel-Container__Item__Subscriber-Number">
                    {`${parseSubscriber(element["MAX(NUM_OF_SUBSCIBER)"])}`}
                </span>                     
                <span className="unit">명</span>                    
            </div>
    </div>)
    })


}

const GET_IMAGE_URL = (state) => {

    let URL = ""
    let modelNow = state.PRODUCT_INFO__MODEL_NAME
    let URL_OBJ = state.MODEL_IMAGES.find((item => item.MODEL_NAME === modelNow))
    URL = URL_OBJ.PICTURE_URL

    return URL

} 

const parseSubscriber = (subNum) => {
    let num = (subNum / 1000).toFixed(0)
    return num.toString()+"k"
    
}

const getAuthorText = (author) => {

    let answer = ''
    let a = new String()
    answer = JSON.parse(`"${author}"`)
    return answer

}

const mapStateToProps = (state) => {

    return {

        CategoryContentBoxState : state.CategoryContentBox,
        SideBarState : state.SideBar

    }

}



const RENDER_KEYWORD_FREQUENCY = (KEYWORDS_FREQUENCY) => {

    let max_freq = KEYWORDS_FREQUENCY[0]["FREQUENCY"]

    return KEYWORDS_FREQUENCY.map((el,index) => {

        let width = parseFloat((el.FREQUENCY / max_freq) * 100).toFixed(2)

        return(
            <div key={index} className="Keyword-Container">
                <div className="Keyword-Gauge-Bar" style={{width : width + '%'}}>
                    <span className="Keyword-Gauge-Bar__Word">{el.WORD}</span>
                    <span className="Keyword-Gauge-Bar__Freq">{el.FREQUENCY}</span>
                </div>
            </div>
        )
    })

}

const mapDispatchToProps = (dispatch) => {

    return {

        CategoryContentBoxDispatch : {

            MODEL_RATIO_BY_CATEGORY(){
                dispatch
                (
                    CategoryContentBoxActions.AC_LOAD_MODEL_RATIO_BY_CATEGORY()
                )
            },

            MODEL_INFO_BY_CATEGORY(){
                dispatch(
                    CategoryContentBoxActions.AC_LOAD_SUM_REPLYS_ABOUT_MODELS_BY_CATEGORY()
                )
            },

            MODEL_IMAGES(){
                dispatch(
                    CategoryContentBoxActions.AC_LOAD_MODEL_IMAGES()
                )
            },

            USER_PREFERENCE(){
                dispatch(
                    CategoryContentBoxActions.AC_LOAD_USER_PREFERENCE()
                )
            },

            RELATED_CHANNELS(){
                dispatch(
                    CategoryContentBoxActions.AC_LOAD_HIGHLY_RELATED_CHANNELS()
                )
            },
            CHANNEL_LEFT(){
                dispatch(
                    CategoryContentBoxActions.AC_USER_CLICKED_LEFT_CHANNEL_ARROW()
                )
            },
            CHANNEL_RIGHT(){
                dispatch(
                    CategoryContentBoxActions.AC_USER_CLICKED_RIGHT_CHANNEL_ARROW()
                )
            },
            MODEL_SEARCHING(event){

                let value = event.target.value
                dispatch(
                    CategoryContentBoxActions.AC_USER_TYPING_MODEL_SERACH(value,IS_VALID_INPUT(value))
                )

            },
            PRODUCT_INFO_OFF(){
                dispatch(
                    CategoryContentBoxActions.AC_USER_CLICKED_PRODUCT_INFO_OFF()
                )
            },
            PRODUCT_INFO_ON(modelName){
                dispatch(
                    CategoryContentBoxActions.AC_USER_CLICKED_PRODUCT_INFO_ON(modelName)
                )
            },
            PRODUCT_INFO_GET(modelName){
                dispatch(
                    CategoryContentBoxActions.AC_LOAD_PRODUCT_INFO(modelName)
                )
            },
            PRODUCT_KEYWORD_GET(modelName){
                dispatch(
                    CategoryContentBoxActions.AC_LOAD_PRODUCT_KEYWORD(modelName)
                )
            },
            PRODUCT_KEYWORD_GET_MORE(){
                dispatch(
                    CategoryContentBoxActions.AC_LOAD_PRODUCT_KEYWORD_MORE()
                )
            },
            PRODUCT_SENTIMENTAL_GET(modelName){
                dispatch(
                    CategoryContentBoxActions.AC_LOAD_PRODUCT_PREFERENCE(modelName)
                )
            },
            PRODUCT_PRICE_GET(modelName){
                dispatch(
                    CategoryContentBoxActions.AC_LOAD_PRODUCT_PRICE(modelName)
                )
            },
            PRODUCT_REPLY_GET(modelName){
                dispatch(
                    CategoryContentBoxActions.AC_LOAD_PRODUCT_REPLY(modelName)
                )
            },
            TOGGLE_REPLY_STATUS(){
                dispatch(
                    CategoryContentBoxActions.AC_TOGGLE_REPLY_STATUS()
                )
            }
        }

    }

}

CategoryContentBox = connect(mapStateToProps,mapDispatchToProps)(CategoryContentBox)

export default CategoryContentBox
