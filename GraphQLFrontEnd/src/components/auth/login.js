import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import { userLoginMutation } from "../../mutation/mutations";
import { graphql } from 'react-apollo';
const jwt_decode = require('jwt-decode');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.userLoginMutation({
      variables: {
          email: this.state.email,
          password: this.state.password,
      }
    }).then(mutationResponse => {
      let response = mutationResponse.data.userLogin;
      if (response) {
        if (response.status === "200") {
            this.setState({
                success: true,
                data: response.message,
                loginFlag: true
            });
        } else {
            this.setState({
                message: response.message,
                loginFlag: true
            });
        }
      }
    });
  }
  render() {
    
    let redirectVar = null;
    let error = "";
    const { errors } = this.state;
    if (this.state.success) {
        let token = this.state.data;
        localStorage.setItem("token", token);
        var decoded = jwt_decode(token.split(' ')[1]);
        localStorage.setItem("user_id", decoded.user_id);
        redirectVar = <Redirect to='/dashboard' />
    }            
    else if (this.state.message === "NO_USER" && this.state.loginFlag) {
        error = "Please Register to continue";
    }
    else if (this.state.message === "INVALID_USER_CREDENTIALS" && this.state.loginFlag) {
        error = "Incorrect Password";
    }

    return (
      <div className="login">
        {redirectVar}
        <div className="container">
          <br />
          <br />
          <div className="row">
            <div className="col-md-5 m-auto">
              <p className="lead text-center">
                Sign in to your Splitwise account
              </p>
              <br />
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />

                <TextFieldGroup
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>

              <br />
              <div className="text-center">
                <Link to="/register">New User?</Link>
              </div>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(userLoginMutation, { name: "userLoginMutation" })(Login);
