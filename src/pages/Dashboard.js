import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { alert } from '../components/Alert';
import WeatherCard from '../components/WeatherCard';
import LocationWeather from '../components/LocationWeather';
import { getRequest, getRequestLogin } from '../service';

class Dashboard extends Component {
  state = {
    currentLocationWeather: null,
    value: '',
    // This would be prepopulated from the database if there are any results
    city: [],
    isLoading: false
  };

  componentDidMount() {
    if (sessionStorage.getItem('logged')) {
      const login = getRequestLogin(sessionStorage.getItem('username'), sessionStorage.getItem('password'));
      if (login) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.getCurrentLocationWeather);
        }
      } else {
        this.props.history.push('/login');
      }
    } else {
      this.props.history.push('/login');
    }
  }

  getCurrentLocationWeather = async coordinates => {
    this.setState({
      isLoading: true
    });
    const lat = coordinates.coords.latitude;
    const lon = coordinates.coords.longitude;

    const result = await getRequest({ lat, lon }, 'No results for your location');

    if (result) {
      this.setState({
        currentLocationWeather: result.data[0]
      });
    }

    this.setState({
      isLoading: false
    });
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    if (this.state.value) {
      const result = await getRequest({ 'city': this.state.value }, 'No results for searched city');

      if (result) {
        const exists = this.state.city.find(city => city.city_name === result.data[0].city_name);

        if (!exists) {
          // This is where would I put recording results in the database
          this.setState(prevState => ({
            city: [...prevState.city, result.data[0]]
          }));
        } else {
          alert('This city is already added, please choose another one', 'error');
        }
      }
    } else {
      alert('Please, enter some value', 'error');
    }
  }

  render() {
    const weather = this.state.city.map((city, index) => {
      return (
        <WeatherCard key={index} city={city} />
      )
    })

    return (
      <React.Fragment>
        <header className="App-header">
          <div className="row py-4">
            <div className="col-12 d-flex justify-content-between">
              <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Enter city" className="d-block mb-3 form-control" />
                <input type="submit" value="Submit" className="btn btn-dark" />
              </form>
              <Link to="/login">
                <button className="btn btn-danger">Log out</button>
              </Link>
            </div>
          </div>
        </header>
        <main className="py-3">
          <div className="row justify-content-center">
            {
              this.state.isLoading &&
              <div className="spinner-border text-info"></div>
            }
            {
              this.state.currentLocationWeather &&
              <LocationWeather location={this.state.currentLocationWeather} />
            }
          </div>
          {
            this.state.city.length
              ?
              <div>
                <h5 className="text-center mt-4">Search results</h5>
                <div className="row">
                  {weather}
                </div>
              </div>
              :
              null
          }
        </main>
      </React.Fragment>
    );
  }
}

export default withRouter(Dashboard)