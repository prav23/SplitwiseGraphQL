import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { createGroupMutation } from "../../mutation/mutations";
import { graphql } from 'react-apollo';
class CreateGroup extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      group_name:'',
      group_image: '',
      user_ids: [],
      errors: {},
      file: null,
      base64URL: ""
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
    this.props.createGroupMutation({
      variables: {
        group_name: this.state.group_name,
        group_image: this.state.base64URL,
      }
    }).then(mutationResponse => {
      let response = mutationResponse.data.createGroup;
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

  handleChange = (e) => {
    let value = Array.from(e.target.selectedOptions, option => option.value);
    console.log(value);
    this.setState({user_ids: value});
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
    //const { allUsers } = this.props.dashboard;
    let allUserList = [];
    // if(allUsers){
    //   allUserList = allUsers.data.allUsers;
    // }
    return (
        <div className="create-group">
        <div className="container">
          <div className="row">
            <div className="col-md-5 m-auto">
              <h2 className="display-8 text-center">Create New Group</h2>
              
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Group Name"
                  name="group_name"
                  value={this.state.group_name}
                  onChange={this.onChange}
                  error={errors.group_name}
                  info="Enter Group Name"
                />

                <TextFieldGroup
                  placeholder="group_image"
                  type="file"
                  name="group_image"
                  onChange={this.handleFileInputChange}
                  info="Choose Group Image"
                />

                {/* <input className = "mb-2 mt-2 " type="file" name="file" onChange={this.handleFileInputChange} /> */}

                <select multiple class="form-select" id="multiple-select-friends" onChange={this.handleChange}>
                  <option disabled selected value>Please Add Friends To Group </option>
                  {allUserList.map(su => <option value = {su.user_id} > {su.name} </option>)}
                </select>
                
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

export default graphql(createGroupMutation, { name: "createGroupMutation" })(CreateGroup);