import React from 'react'
import {connect} from 'react-redux'
import {PulseLoader} from 'react-spinners'
import '../stylesheets/CompareDataBox.css' 

class CompareDataBox extends React.Component{

    render(){

        const { CompareContentBoxState } = this.props
        let { DATA_FOR_COMPARE } = CompareContentBoxState

        return(

            <div className="CompareDataBox-Container">

                {CompareContentBoxState.IS_DATA_FOR_COMPARE_SUCCESS?
                    (
                        <div>
                            <div className="CompareDataBox-Container__Model-Infos-Row Three-Column-Grid">
                            
                            {RENDER_MODEL_NAMES(DATA_FOR_COMPARE)}
                            
                            </div>
                    
                            <div className="CompareDataBox-Container__Model-Images-Row Three-Column-Grid">
                                
                                {RENDER_MODEL_IMAGES(DATA_FOR_COMPARE)}

                            </div>

                
                            <div className="CompareDataBox-Container__Divider-Row Three-Column-Grid">

                                <div className="Divider-Row__Divider"></div>
                                <div className="Divider-Row__Divider"></div>
                                <div className="Divider-Row__Divider"></div>
                            
                            </div>
                    
                            <div className="CompareDataBox-Container__Model-Infos-Row Three-Column-Grid">
                            
                                {RENDER_MODEL_SPEC_URLS(DATA_FOR_COMPARE)}
                            
                            </div>

                            <h3 className="Section-Header">제품 가격</h3>
                            <div className="Divider-Row__Divider"></div>

                            <div className="CompareDataBox-Container__Model-Infos-Row Three-Column-Grid">
                            
                                {/* {RENDER_MODEL_PRICES(DATA_FOR_COMPARE)} */}
                            
                            </div>
                            

                            <h3 className="Section-Header">CPU 성능 (Core , Clock)</h3>
                            <div className="Divider-Row__Divider"></div>

                            <div className="CompareDataBox-Container__Model-Infos-Row Three-Column-Grid">
                            
                                {RENDER_MODEL_CPUS(DATA_FOR_COMPARE)}
                            
                            </div>

                            <h3 className="Section-Header">메모리</h3>
                            <div className="Divider-Row__Divider"></div>

                            <div className="CompareDataBox-Container__Model-Infos-Row Three-Column-Grid">
                            
                                {RENDER_MODEL_RAMS(DATA_FOR_COMPARE)}
                            
                            </div>
                            
                            <h3 className="Section-Header">스토리지 용량</h3>
                            <div className="Divider-Row__Divider"></div>

                            <div className="CompareDataBox-Container__Model-Infos-Row Three-Column-Grid">
                            
                                {RENDER_MODEL_STORAGES(DATA_FOR_COMPARE)}
                            
                            </div>

                            <h3 className="Section-Header">카메라 화소</h3>
                            <div className="Divider-Row__Divider"></div>

                            <div className="CompareDataBox-Container__Model-Infos-Row Three-Column-Grid">
                            
                                {RENDER_MODEL_CAMERAS(DATA_FOR_COMPARE)}
                            
                            </div>

                            <h3 className="Section-Header">배터리 용량</h3>
                            <div className="Divider-Row__Divider"></div>

                            <div className="CompareDataBox-Container__Model-Infos-Row Three-Column-Grid">
                            
                                {RENDER_MODEL_BATTERYS(DATA_FOR_COMPARE)}
                            
                            </div>

                            <h3 className="Section-Header">충전 방식</h3>
                            <div className="Divider-Row__Divider"></div>

                            <div className="CompareDataBox-Container__Model-Infos-Row Three-Column-Grid">
                            
                                {RENDER_MODEL_CHARGING_METHODS(DATA_FOR_COMPARE)}
                            
                            </div>

                            <h3 className="Section-Header">제품 크기</h3>
                            <div className="Divider-Row__Divider"></div>

                            <div className="CompareDataBox-Container__Model-Infos-Row Three-Column-Grid">
                            
                                {RENDER_MODEL_SIZES(DATA_FOR_COMPARE)}
                            
                            </div>

                            <h3 className="Section-Header">제품 중량</h3>
                            <div className="Divider-Row__Divider"></div>

                            <div className="CompareDataBox-Container__Model-Infos-Row Three-Column-Grid">
                            
                                {RENDER_MODEL_WEIGHTS(DATA_FOR_COMPARE)}
                            
                            </div>

                            <h3 className="Section-Header">디스플레이 크기</h3>
                            <div className="Divider-Row__Divider"></div>

                            <div className="CompareDataBox-Container__Model-Infos-Row Three-Column-Grid">
                            
                                {RENDER_MODEL_DISPLAY_SIZES(DATA_FOR_COMPARE)}
                            
                            </div>

                            <h3 className="Section-Header">디스플레이 해상도</h3>
                            <div className="Divider-Row__Divider"></div>

                            <div className="CompareDataBox-Container__Model-Infos-Row Three-Column-Grid">
                            
                                {RENDER_MODEL_DISPLAY_RESOLUTIONS(DATA_FOR_COMPARE)}
                            
                            </div>

                            
                        </div>
                    )
                    :
                    (
                        <PulseLoader
                            size={25}
                            margin={'5px'}
                            color={'hsl(5, 90%, 58%)'}
                        />
                    )
                }


                    
            </div>

        )
        
    }

}

const RENDER_MODEL_NAMES = (DATA_FOR_COMPARE) => {

    let MODEL_NAMES = DATA_FOR_COMPARE.reduce((acc,curr)=>{

        return acc.concat(curr.MODEL_NAME)

    },[])

    return MODEL_NAMES.map((el) => {

        return (

            <div className="Model-Names-Row__Item-Names">
                <span className="Model-Names-Row__Item-Names__Text">
                    {el}
                </span>
            </div>
        )

    })

}

const RENDER_MODEL_IMAGES = (DATA_FOR_COMPARE) => {

    let MODEL_IMAGES = DATA_FOR_COMPARE.reduce((acc,curr)=>{

        return acc.concat(curr.PICTURE_URL)

    },[])

    return MODEL_IMAGES.map((el) => {

        return (

            <div className="Model-Names-Row__Item-Images">
               <img src={el} alt=""/>
            </div>

        )

    })

}

const RENDER_MODEL_PRICES = (DATA_FOR_COMPARE) => {

    let MODEL_IMAGES = DATA_FOR_COMPARE.reduce((acc,curr)=>{

        return acc.concat(curr.PRICE)

    },[])

    return MODEL_IMAGES.map((el) => {

        return (

            <div className="Model-Infos-Row__Item-Prices">
               <span>{el}</span>
            </div>

        )

    })

}

const RENDER_MODEL_CPUS = (DATA_FOR_COMPARE) => {

    let MODEL_CPUS = DATA_FOR_COMPARE.reduce((acc,curr)=>{

        return acc.concat(curr.CPU)

    },[])

    return MODEL_CPUS.map((el) => {

        return (

               <div className="Data-Box__Item">
                    <div className="Data-Box__Item__Head">
                    </div>
                    <div className="Data-Box__Item__Body">
                        <span className="Data-Box__Item__Body__Value">{el}</span>
                    </div>
               </div>
               
        )

    })

}

const RENDER_MODEL_RAMS = (DATA_FOR_COMPARE) => {

    let MODEL_IMAGES = DATA_FOR_COMPARE.reduce((acc,curr)=>{

        return acc.concat(curr.RAM)

    },[])

    return MODEL_IMAGES.map((el) => {

        return (

            <div className="Data-Box__Item">
                    <div className="Data-Box__Item__Head">
                    </div>
                    <div className="Data-Box__Item__Body">
                        <span className="Data-Box__Item__Body__Value">{el}</span>
                    </div>
            </div>

        )

    })

}

const RENDER_MODEL_STORAGES = (DATA_FOR_COMPARE) => {

    let MODEL_STORAGES = DATA_FOR_COMPARE.reduce((acc,curr)=>{

        return acc.concat(curr.STORAGE)

    },[])

    
    return MODEL_STORAGES.map((el) => {
        
        return (

            <div className="Data-Box__Item">
                <div className="Data-Box__Item__Head">
                </div>
                <div className="Data-Box__Item__Body">
                    <span className="Data-Box__Item__Body__Value">{el}</span>
                </div>
            </div>

        )

    })

}

const RENDER_MODEL_CAMERAS = (DATA_FOR_COMPARE) => {

    let MODEL_IMAGES = DATA_FOR_COMPARE.reduce((acc,curr)=>{

        return acc.concat(curr.CAMERA)

    },[])

    return MODEL_IMAGES.map((el) => {

        return (

            <div className="Data-Box__Item">
                    <div className="Data-Box__Item__Head">
                    </div>
                    <div className="Data-Box__Item__Body">
                        <span className="Data-Box__Item__Body__Value">{el}</span>
                    </div>
               </div>

        )

    })

}

const RENDER_MODEL_BATTERYS = (DATA_FOR_COMPARE) => {

    let MODEL_IMAGES = DATA_FOR_COMPARE.reduce((acc,curr)=>{

        return acc.concat(curr.BATTERY)

    },[])

    return MODEL_IMAGES.map((el) => {

        return (

            <div className="Data-Box__Item">
                    <div className="Data-Box__Item__Head">
                    </div>
                    <div className="Data-Box__Item__Body">
                        <span className="Data-Box__Item__Body__Value">{el}</span>
                    </div>
               </div>

        )

    })

}

const RENDER_MODEL_CHARGING_METHODS = (DATA_FOR_COMPARE) => {

    let MODEL_IMAGES = DATA_FOR_COMPARE.reduce((acc,curr)=>{

        return acc.concat(curr.CHARGING_METHOD)

    },[])

    return MODEL_IMAGES.map((el) => {

        return (

            <div className="Data-Box__Item">
                    <div className="Data-Box__Item__Head">
                    </div>
                    <div className="Data-Box__Item__Body">
                        <span className="Data-Box__Item__Body__Value">{el}</span>
                    </div>
               </div>

        )

    })

}

const RENDER_MODEL_SIZES = (DATA_FOR_COMPARE) => {

    let MODEL_IMAGES = DATA_FOR_COMPARE.reduce((acc,curr)=>{

        return acc.concat(curr.MODEL_SIZE)

    },[])

    return MODEL_IMAGES.map((el) => {

        return (

            <div className="Data-Box__Item">
                    <div className="Data-Box__Item__Head">
                    </div>
                    <div className="Data-Box__Item__Body">
                        <span className="Data-Box__Item__Body__Value">{el}</span>
                    </div>
               </div>

        )

    })

}

const RENDER_MODEL_WEIGHTS = (DATA_FOR_COMPARE) => {

    let MODEL_IMAGES = DATA_FOR_COMPARE.reduce((acc,curr)=>{

        return acc.concat(curr.MODEL_WEIGHT)

    },[])

    return MODEL_IMAGES.map((el) => {

        return (

            <div className="Data-Box__Item">
                    <div className="Data-Box__Item__Head">
                    </div>
                    <div className="Data-Box__Item__Body">
                        <span className="Data-Box__Item__Body__Value">{el}</span>
                    </div>
               </div>

        )

    })

}

const RENDER_MODEL_DISPLAY_SIZES = (DATA_FOR_COMPARE) => {

    let MODEL_IMAGES = DATA_FOR_COMPARE.reduce((acc,curr)=>{

        return acc.concat(curr.DISPLAY_SIZE)

    },[])

    return MODEL_IMAGES.map((el) => {

        return (

            <div className="Data-Box__Item">
                    <div className="Data-Box__Item__Head">
                    </div>
                    <div className="Data-Box__Item__Body">
                        <span className="Data-Box__Item__Body__Value">{el}</span>
                    </div>
               </div>

        )

    })

}

const RENDER_MODEL_DISPLAY_RESOLUTIONS = (DATA_FOR_COMPARE) => {

    let MODEL_IMAGES = DATA_FOR_COMPARE.reduce((acc,curr)=>{

        return acc.concat(curr.DISPLAY_RESOLUTION)

    },[])

    return MODEL_IMAGES.map((el) => {

        return (

            <div className="Data-Box__Item">
                    <div className="Data-Box__Item__Head">
                    </div>
                    <div className="Data-Box__Item__Body">
                        <span className="Data-Box__Item__Body__Value">{el}</span>
                    </div>
               </div>

        )

    })

}

const RENDER_MODEL_SPEC_URLS = (DATA_FOR_COMPARE) => {

    let MODEL_IMAGES = DATA_FOR_COMPARE.reduce((acc,curr)=>{

        return acc.concat(curr.SPEC_URL)

    },[])

    return MODEL_IMAGES.map((el) => {

        return (

            <div className="Data-Box__Item__Link">
                <a href={el} className="Data-Box__Item__Body__Value-Link">방문하기</a>
            </div>
        )

    })

}

const mapStateToProps = (state) => {

    return {
        
        CompareContentBoxState : state.CompareContentBox

    }

}

CompareDataBox = connect(mapStateToProps,null)(CompareDataBox)

export default CompareDataBox