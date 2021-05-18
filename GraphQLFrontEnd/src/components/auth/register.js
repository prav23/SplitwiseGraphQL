import React, { Component } from "react";
import {Redirect} from 'react-router';
import TextFieldGroup from "../common/TextFieldGroup";
import { Link } from "react-router-dom";
import { registerUserMutation } from '../../mutation/mutations';
import { graphql } from 'react-apollo';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount(){
    this.setState({
        authFlag : false
    })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  async onSubmit(e) {
    e.preventDefault();
    let mutationResponse = await this.props.registerUserMutation({
      variables: {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2
      }
    });
    let response = mutationResponse.data.registerUser;
    if (response) {
      if (response.status === "200") {
          this.setState({
              success: true,
              signupFlag: true
          });
      } else {
          this.setState({
              message: response.message,
              signupFlag: true
          });
      }
    }
  }

  render() {
    let redirectVar = null, error = "";
    const { errors } = this.state;
    if (localStorage.getItem("token")) {
        redirectVar = <Redirect to="/dashboard" />
    }
    else if (this.state.success) {
        alert("You have registered successfully");
        redirectVar = <Redirect to="/login" />
    }
    else if (this.state.message === "USER_PRESENT" && this.state.signupFlag) {
        error = "Yor have already registered. Please Login."
    }
    else if (this.state.message === "USER_SIGNUP_ERROR" && this.state.signupFlag) {
        error = "Sign up error. Please try again in some time."
    }
    return (
      <div className="register pt-4">
        {redirectVar}
        <div className="container">
          <div className="row">
            <br />
            <div className="col-md-5 m-auto">
              <p className="lead text-center">Create your Splitwise account</p>
              <br />
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  //type="email"
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />

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

                <TextFieldGroup
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
              <br />
              <div className="text-center">
                <Link to="/login">Already Registered?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(registerUserMutation, { name: "registerUserMutation" })(Register);