import React from "react";
import Image1 from "../Assets/images/sunlight2.jpg";
import Image7 from "../Assets/images/sunlight.jpg";
import Image2 from "../Assets/images/cloud.jpg";
import Image3 from "../Assets/images/rain2avif.avif";
import Image4 from "../Assets/images/sunny.avif";
import Image5 from "../Assets/images/haze.jpg";
import nodata from "../Assets/images/nodata.jpg";
import Image6 from "../Assets/images/Windy.avif";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Component } from "react";
import "./Weather.css";
class WeatherPage extends  Component{
constructor(props) {
  super(props);
  this.state = {
    data: {
      location: {
        name: "--",
        localtime: "--",
      },
      current: {
        cloud: "--",
        humidity: "--",
        wind_kph: "--",
        pressure_mb: "--",
        feelslike_c: "--",
        condition : {
          text : "",
          icon : ""
        }
      },
    },
    value: "",
    error: false,
    style : {},
    style2 : "",
    backgroundImage : `url("${Image1}")`,
       background : Image1,
  };
}
 handleFetch = (city,lat,long) => {
  let query='';
  if(lat && long){
    query=`${lat},${long}`
  }
  else {
    query=city;
  }
  const apiUrl=`http://api.weatherapi.com/v1/forecast.json?key=343ffec2ec084fa0a8a151325231208&q=${query}&days=8&aqi=no&alerts=no`

      try{
        fetch(apiUrl)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }else{
              this.setState({...this.state ,error : true})
              throw new Error(`API request failed with status: ${response.status}`);
            }
          })
          .then((json) => {
            this.setState({ ...this.state ,data : json,error :false})  
            console.log(json)
            }).catch(() => {
              this.setState({...this.state ,error : true})
            })
      }catch(error){
    console.log("error"+ error)
  this.setState({...this.state ,error : true})
      }
  }

 
   handleSearch = () => {
    if (this.state.value.trim() === "") {
      alert("please fill the field");
    } else {
    this.handleFetch(this.state.value);
    }
  };
 componentDidMount(){
   this.handleFetch(this.props.value)
 }
 
getLocation = () => {
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(this.showPosition);
  }
 }
showPosition = (position) => {
  this.handleFetch(null,position.coords.latitude,position.coords.longitude)
}
componentDidUpdate(prevprops,prevstate){
  // console.log(prevstate.value,this.state.value)
 if(this.state.value  !== prevstate.value ){
    this.bg()
    console.log("componentDidUpdate Run",prevstate)
  }
}
bg = () => {
  this.setState((prevState) => ({
    style: {
      background: prevState.backgroundImage,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  }));
};

render(){
let {background , backgroundImage} = this.state
const type=this.state.data?.current.condition.text
switch (true) {
   case type.includes("clear"):
     backgroundImage = `url("${Image4}")`;
     background = `${Image4}`;
     break;
   case type.includes("cloudy") :
     backgroundImage = `url("${Image2}")`;
     background = `${Image2}`;
     break;
   case type.includes("wind"):
   case type.includes("windy"):
     backgroundImage = `url("${Image6}")`;
     background = `${Image6}`;
     break;
   case type.includes("rain"):
   case type.includes("Thundery"):
     backgroundImage = `url("${Image3}")`;
     background = `${Image3}`;
     break;
   case type.includes("haze"):
     backgroundImage = `url("${Image5}")`;
     background = `${Image5}`;
     break;
   case type.includes("Mist"):
     backgroundImage = `url("${Image2}")`;
     background = `${Image2}`;
     break;
   case type.includes("sunshine"):
   case type.includes("sunny"):
     backgroundImage = `url("${Image7}")`;
     background = `${Image7}`;
     break;
   default:
     backgroundImage = `url("${Image1}")`;
     background = `${Image1}`;
     break;
 }
    return (
      <div className="Container">
        <img src={background} className="video" alt="mage not found" />
        <div className="box" style={this.state.style}>
        {/* <div className="box" > */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-8 d-flex align-items-center ">
                {this.state.error}
               { !this.state.error  ? <div className="d-flex align-items-center temperature">
                  <h1 className="display-1 fw-semibold text-white">
                    {this.state.data?.current.temp_c}° C
                  </h1>
                  <div className="ms-3">
                    <p className="m-0 text-white fw-normal fs-2">
                      {this.state.data?.location?.name}
                    </p>
                    <p className="m-0 text-white fw-normal">
                      {this.state.data?.location?.localtime}
                    </p>
                  </div>
                  <div className="ms-3">
                    <img
                      src={this.state.data?.current?.condition?.icon}
                      width="40px"
                      height="40px"
                      alt="mage not found" 
                    />
                    <p className="mt-2 mb-0 text-white fw-normal">
                      {this.state.data?.current?.condition?.text}
                    </p>
                  </div>
                </div> : <div className="errorpage"><img src={nodata}  alt="not found" />
                <h4>No data Found</h4></div>}
              </div>
              <div className="col-4 colself">
                <div className="SearchBox d-flex justify-content-end">
                  <input
                    type="text"
                    value={this.state.value}
                    onChange={(e) => this.setState({...this.state ,value : e.target.value})}
                  
                  />
                  <span className="searchIcon ms-2" onClick={this.handleSearch} style={{color : this.state.style2}}>
                    <SearchIcon  />
                  </span>
                </div>
                <div className="location">
                  <ul>
                    <li className="mt-4 fw-semibold" onClick={this.getLocation}>
                      Current location <LocationOnIcon />
                    </li>
                    <li
                      onClick={() => {
                        this.handleFetch("Delhi");
                        this.setState({...this.state ,value : "Delhi"});
                        
                      }}
                      
                    >
                      Delhi
                    </li>
                    <li
                      onClick={() => {
                        this.handleFetch("Mumbai");
                        this.setState({...this.state ,value : "Mumbai"});
                      }}
                    >
                      Mumbai
                    </li>
                    <li
                      onClick={() => {
                        this.handleFetch("Pune");
                        this.setState({...this.state ,value : "Pune"});
                      }}
                    >
                      Pune
                    </li>
                    <li
                      onClick={() => {
                        this.handleFetch("Bengaluru");
                        this.setState({...this.state ,value : "Bengaluru"});
                      }}
                    >
                      Bengaluru
                    </li>
                  </ul>
                  <hr />
                </div>
                <div className="WeatherDetail">
                  <ul>
                    <li className="mt-4 fw-semibold">Weather Details</li>
                    <li>
                      <span>Cloud </span> <span>{this.state.data?.current?.cloud}%</span>
                    </li>
                    <li>
                      <span>Humidity</span> <span>{this.state.data?.current?.humidity}%</span>
                    </li>
                    <li>
                      <span>Wind</span> <span>{this.state.data?.current?.wind_kph}m/s</span>
                    </li>
                    <li>
                      <span>Pressure</span>
                      <span>{this.state.data?.current?.pressure_mb}pa</span>
                    </li>
                    <li>
                      <span>feelslike</span>
                      <span>{this.state.data?.current?.feelslike_c}° C</span>
                    </li>
                  </ul>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}


export default WeatherPage;
