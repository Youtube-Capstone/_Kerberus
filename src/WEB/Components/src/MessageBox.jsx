import React from 'react'

import '../stylesheets/MessageBox.css'

class MessageBox extends React.Component{

    render(){

        return(

            <div className="MessageBox">
                <span className="MessageBox__Text">{this.props.message}</span>
            </div>

        )
        
    }

}

export default MessageBox
