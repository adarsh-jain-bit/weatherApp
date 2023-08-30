import "./App.css";
import Frontpage from "./components/Frontpage";
import WeatherPage from "./components/WeatherPage";
import { Component } from "react";
class App extends Component {
  constructor() {
    super();
    this.state = {
      showWeatherPage: false,
      searchValue : ""
    };
  }
  handleShowWeather = (val) => {
    
    this.setState({ showWeatherPage: !this.state.showWeatherPage , searchValue : val });
  };
  render() {
    return (
      <div className="App">
        {!this.state.showWeatherPage && (
          <Frontpage onShowWeather={this.handleShowWeather} />
        )}
        {this.state.showWeatherPage && <WeatherPage value={this.state.searchValue} />}
      </div>
    );
  }
}

export default App;
