import React, { Component } from 'react'
import { alert } from '../components/Alert';
import { withRouter } from 'react-router-dom';
import { getRequestLogin } from '../service';

class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    componentDidMount() {
        sessionStorage.clear();
    }

    handleChange = (state, value) => {
        this.setState({
            [state]: value
        });
    }

    login = (event) => {
        const login = getRequestLogin(this.state.username, this.state.password);

        if (login) {
            // Token with expiry date/time would be set instead 
            sessionStorage.setItem('username', this.state.username);
            sessionStorage.setItem('password', this.state.password);
            sessionStorage.setItem('logged', true);
            this.props.history.push('/react-test');
            alert("Successfully logged in", 'success');
        } else {
            alert('Please try again', 'error');
        }
        event.preventDefault();
    }

    render() {
        return (
            <div className="flex-grow-1 justify-content-center row align-items-center">
                <div className="col-12 col-md-4">
                    <form className="form-signin">
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <label htmlFor="inputUsername" className="sr-only">Username</label>
                        <input type="email" id="inputUsername" className="form-control mb-3" placeholder="Username" onChange={(e) => this.handleChange('username', e.target.value)} />
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" id="inputPassword" className="form-control mb-3" placeholder="Password" onChange={(e) => this.handleChange('password', e.target.value)} />
                        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.login}>Sign in</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Login)