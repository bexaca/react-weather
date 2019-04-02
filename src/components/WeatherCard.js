import React, { Component } from 'react'

export default class WeatherCard extends Component {
    render() {
        return (
            <div className="col-12 col-md-3 my-3">
                <div className="text-center border">
                    <h5>{this.props.city.city_name}</h5>
                    <h6>{this.props.city.weather.description}</h6>
                    <h6>{this.props.city.temp}&deg;</h6>
                    <img height="50" width="50" alt={this.props.city.weather.icon} src={`https://www.weatherbit.io/static/img/icons/${this.props.city.weather.icon}.png`}></img>
                </div>
            </div>
        )
    }
}
