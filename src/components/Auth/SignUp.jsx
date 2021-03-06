import React, { Component } from 'react';

import {
  Step, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { StepOne } from './StepOne';
import { API } from '../../modules/api/API';
import { StepTwo } from './StepTwo';

export class SignUp extends Component {
  state = {
    email: '',
    password: '',
    username: '',
    /* eslint-disable-next-line */
    userType: 'customer',
    terms: false,
    /* eslint-disable-next-line */
    warning: false,
    /* eslint-disable-next-line */
    step: 1,
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    accountBalance: 0,
  }

  // Update state whenever an input field is edited
   handleFieldChange = (evt) => {
     this.setState({ [evt.target.id]: evt.target.value });
   };

   toggleCheck = () => this.setState(oldState => ({ terms: !oldState.terms }))

   handleUserTypeChange = (userType) => {
     if (userType === 'employee') this.setState({ warning: true, userType });
     else this.setState({ warning: false, userType });
   };

   handleStepOneSubmit = () => {
     const { username } = this.state;


     return API.users.checkExisting({ username });
   }

   createUser = () => {
     const {
       email,
       password,
       username,
       userType,
       warning,
     } = this.state;
     return API.users.register({
       email,
       password,
       username,
       userType,
       // Activates artists or customers immediately, but not employees
       isActive: !warning,
     });
   }

   handleEmployeeSubmit = () => {
     this.createUser().then(({ id }) => {
       API.employees.create({
         userId: id,
         canEditInventory: false,
         canProcessOrders: false,
         canEditEmployees: false,
         canEditUsers: false,
       });
     });
   }

   handleStepTwoSubmit = async () => {
     const {
       userType,
       firstName,
       lastName,
       address,
       city,
       state,
       zipcode,
       accountBalance,
     } = this.state;


     const userObj = {
       firstName,
       lastName,
       address,
       city,
       state,
       zipcode,
       accountBalance,
     };
     if (userType === 'artist') {
       userObj.description = null;
       userObj.imageUrl = null;
       userObj.avatarUrl = null;
       userObj.hometown = null;
       userObj.profitRatio = 0.6;
       userObj.phoneNumber = null;
       userObj.isActive = false;
       userObj.activeDate = null;
     }


     return this.createUser().then(({ id }) => {
       userObj.userId = id;
       API[`${userType}s`].create(userObj);
     });
   }

  showStepTwo = () => {
    this.setState({ step: 2 });
  }


  render() {
    const {
      step,
    } = this.state;
    const {
      login,
      redirect,
      showError,
      showConfirm,
    } = this.props;
    return (
      <>
        <Step.Group widths={2} size="mini">
          <Step active={step === 1}>
            <Icon size="mini" name="lock" />
            <Step.Content>
              <Step.Title>User Account</Step.Title>
              <Step.Description>Your login credentials</Step.Description>
            </Step.Content>
          </Step>

          <Step active={step === 2}>
            <Icon size="mini" name="info circle" />
            <Step.Content>
              <Step.Title>Details</Step.Title>
              <Step.Description>Your Profile</Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>


        {(step === 1) ? (
          <StepOne
            {...this.state}
            handleFieldChange={this.handleFieldChange}
            handleUserTypeChange={this.handleUserTypeChange}
            handleEmployeeSubmit={this.handleEmployeeSubmit}
            handleStepOneSubmit={this.handleStepOneSubmit}
            showStepTwo={this.showStepTwo}
            showError={showError}
            showConfirm={showConfirm}
          />
        ) : (
          <StepTwo
            {...this.state}
            handleFieldChange={this.handleFieldChange}
            handleStepTwoSubmit={this.handleStepTwoSubmit}
            login={login}
            redirect={redirect}
          />
        ) }
      </>
    );
  }
}

SignUp.propTypes = {
  showError: PropTypes.func.isRequired,
  showConfirm: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
};
