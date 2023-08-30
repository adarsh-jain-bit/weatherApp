import React from 'react'
import "./FrontPage.css"
import Video from "../Assets/video.mp4"
import SearchIcon from '@mui/icons-material/Search';
import { Component } from 'react';
class Frontpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Value: "",
    };
  }

    changeValue = (e) => {
      this.setState({Value:  e.target.value});
    }
 checkValue = () => {
    if(this.state.Value.trim() === ""){
alert("please fill the field");
   }else{
    console.log("uy")
    this.props.onShowWeather(this.state.Value);
    }
}
  render(){
    return (
      <div className="Container">
      <video width="320"  className="video"autoPlay  loop  muted>
       <source src={Video} type="video/mp4"/>
     </video>
     <div className="box">
     <video width="320"  autoPlay  loop  muted>
       <source src={Video} type="video/mp4"/>
       </video>
     
      <div className="searchBox">
      <h3>A weather App to Know the Weather from Anywhere</h3>
       <div>
       <input type="text" className="searchInput" value={this.state.Value} onChange={this.changeValue}/>
     <span onClick={this.checkValue}><SearchIcon/></span>
       </div> 
      </div>
     </div>
      </div>  
    )
  }
}

export default Frontpage