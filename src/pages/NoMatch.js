import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class NoMatch extends Component {
    componentDidMount() {
        if (sessionStorage.getItem('user') === sessionStorage.getItem('typedUsername') && sessionStorage.getItem('pass') === sessionStorage.getItem('typedPassword')) {
        } else {
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div>
                <h5>404</h5>
                <Link to="/react-test">
                    <button className="btn btn-success">Go back</button>
                </Link>
            </div>
        )
    }
}
