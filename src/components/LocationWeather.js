import React, { Component } from 'react'

export default class LocationWeather extends Component {
  render() {
    return (
        <div className="col text-center border-bottom">
        <h4>Weather on your location</h4>
        <h5>{this.props.location.city_name}</h5>
        <h6>{this.props.location.weather.description}</h6>
        <h6>{this.props.location.temp}&deg;</h6>
        <img height="50" width="50" alt={this.props.location.weather.icon} src={`https://www.weatherbit.io/static/img/icons/${this.props.location.weather.icon}.png`}></img>
      </div>
    )
  }
}
