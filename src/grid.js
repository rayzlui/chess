import React from 'react'

class Grid extends React.Component{
   


    render(){


        return(
            <div className = {"grid" + this.props.id} style = {{backgroundColor: this.props.color, height: "60px", width: "60px", borderWidth: "5px", borderColor: "black", display: "inline-block", margin: 1, verticalAlign: "top"}} >{this.props.piece}</div>
        )
    }
}

export default Grid