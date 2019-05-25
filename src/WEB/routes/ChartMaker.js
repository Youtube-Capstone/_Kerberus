class ChartMaker {

    constructor(type){

        this._ChartStruct = {
            
            animationEnabled : true,
            interactivityEnabled : true,
            animationDuration : 1000,
            height : 200,
            axisY :{
                gridThickness : 0,
                interlacedColor : "",
                labelFontFamily : "NotoSansKR",
                labelFontColor : "hsl(200, 19%, 18%)",
                labelFontWeight : "bold",
                lineColor: "black" ,
                lineThickness: 1
            },
            axisX :{
                interlacedColor : "",
                labelFontFamily : "NotoSansKR",
                labelFontColor : "hsl(200, 19%, 18%)",
                labelFontWeight : "bold",
                lineColor: "black" ,
                lineThickness: 1
            },
            data: [
                {
                    fillOpacity : 0.7,
                    type: `${type}`,
                    markerSize: 0,
                    color: "",
                    dataPoints: [],
                }
            ]    

        }

    }

    set_AxisY_interLacedColor(color){

        this._ChartStruct.axisY.interlacedColor = color

    }
    set_AxisY_labelFontColor(color){

        this._ChartStruct.axisY.labelFontColor = color

    }
    set_AxisY_lineColor(color){

        this._ChartStruct.axisY.lineColor = color

    }
    set_AxisY_lineThickness(thickness){

        this._ChartStruct.axisY.lineThickness = thickness

    }
    set_AxisX_interLacedColor(color){

        this._ChartStruct.axisX.interlacedColor = color

    }
    set_AxisX_labelFontColor(color){

        this._ChartStruct.axisX.labelFontColor = color

    }
    set_AxisX_lineColor(color){

        this._ChartStruct.axisX.lineColor = color

    }
    set_AxisX_lineThickness(thickness){

        this._ChartStruct.axisX.lineThickness = thickness

    }
    set_Data_Color(color){
        
        this._ChartStruct.data[0].color = color

    }
    set_Data_dataPoints(dataArray){

        this._ChartStruct.data[0].dataPoints = dataArray

    }
    set_Data_MarkerSize(size = 1){

        this._ChartStruct.data[0].markerSize = size

    }
    set_Data_fillOpacity(opacity = 0.7){

        this._ChartStruct.data[0].fillOpacity = opacity

    }
    printChartStruct(){

        console.log(this._ChartStruct)

    }

    get_ChartStruct(){

        return this._ChartStruct

    }

}

module.exports = ChartMaker

