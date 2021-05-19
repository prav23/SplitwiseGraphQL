import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfileMutation } from "../../mutation/mutations";
import { graphql } from 'react-apollo';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      image:'',
      phoneNumber: '',
      currency: '',
      language: '',
      timezone: '',
      errors: {},
      file: null,
      base64URL: "",
      user_id: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  // }

  onSubmit(e) {
    e.preventDefault();
    this.props.createProfileMutation({
      variables: {
        user: localStorage.getItem('user_id'),
        image: this.state.base64URL,
        phoneNumber: this.state.phoneNumber,
        currency: this.state.currency,
        language: this.state.language,
        timezone: this.state.timezone
      }
    }).then(mutationResponse => {
      let response = mutationResponse.data.createProfile;
      if (response) {
        if (response.status === "200") {
            this.setState({
                success: true,
                data: response.message,
            });
        } else {
            this.setState({
                message: response.message,
            });
        }
      }
    });

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleFileInputChange = e => {
    console.log(e.target.files[0]);
    let { file } = this.state;

    file = e.target.files[0];

    this.getBase64(file)
      .then(result => {
        file["base64"] = result;
        console.log("File Is", file);
        this.setState({
          base64URL: result,
          file
        });
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({
      file: e.target.files[0]
    });
  };

  getBase64 = file => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

  render() {
    //const { isAuthenticated } = this.props.auth;
    const { errors } = this.state;
    
    const currencyOptions = [
      { label: '* Select Currency', value: '' },
      { label: 'USD', value: 'USD' },
      { label: 'KWD', value: 'KWD' },
      { label: 'BHD', value: 'BHD' },
      { label: 'GBP', value: 'GBP' },
      { label: 'EUR', value: 'EUR' },
      { label: 'CAD', value: 'CAD' },
    ];

    const timezoneOptions = [
      { label: '* Select Timezone', value: '' },
      { label: 'America/Los_Angeles GMT-08:00', value: 'GMT-08:00' },
      { label: 'Europe/Amsterdam GMT+01:00', value: 'GMT+01:00' },
      { label: 'Asia/Calcutta GMT+05:30', value: 'GMT+05:30' },
      { label: 'Australia/Adelaide GMT+09:30', value: 'GMT+09:30' },
    ];

    const languageOptions = [
      { label: '* Select Language', value: '' },
      { label: 'English', value: 'English' },
      { label: 'Hindi', value: 'Hindi' },
      { label: 'Spanish', value: 'Spanish' },
      { label: 'French', value: 'French' },
      { label: 'Telugu', value: 'Telugu' },
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-5 m-auto">
              <h2 className="display-8 text-center">Create Your Profile</h2>
              <p className="lead text-center">
                Let's get some information about your profile
              </p>
            
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={this.state.phoneNumber}
                  onChange={this.onChange}
                  error={errors.phoneNumber}
                  info="Enter your phone number"
                />
                <SelectListGroup
                  placeholder="Language"
                  name="language"
                  value={this.state.language}
                  onChange={this.onChange}
                  options={languageOptions}
                  error={errors.language}
                  info="Please select your language"
                />
                <SelectListGroup
                  placeholder="Currency"
                  name="currency"
                  value={this.state.currency}
                  onChange={this.onChange}
                  options={currencyOptions}
                  error={errors.currency}
                  info="Please Select your currency"
                />
                <SelectListGroup
                  placeholder="Time Zone"
                  name="timezone"
                  value={this.state.timezone}
                  onChange={this.onChange}
                  options={timezoneOptions}
                  error={errors.timezone}
                  info="Please select your timezone"
                />
                 <TextFieldGroup
                  placeholder="group_image"
                  type="file"
                  name="group_image"
                  onChange={this.handleFileInputChange}
                  info="Choose Group Image"
                />
                
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(createProfileMutation, { name: "createProfileMutation" })(CreateProfile);