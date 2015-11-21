'use strict';

import React from 'react';
import $ from 'jquery';
import request from 'superagent';
import VerificationBox from './VerificationBox';
import InputBox from './InputBox.jsx';

export default React.createClass({
  getInitialState () {
    return {
      inputPassword: '',
      hashedPassword: '',
      VerificationMessage: '',
      isVerificationBoxVisible: false
    };
  },
  renderVerificationBox () {
    if (isVerificationBoxVisible) {
      return <VerificationBox VerificationMessage={this.VerificationMessage} />;
    }
  },
  handleUserInput (inputPassword) {
    this.setState({inputPassword: inputPassword});
  },
  handleHashedPassword (hashedPassword) {
    this.setState({hashedPassword: hashedPassword});
  },
  onSubmit (e) {
    e.preventDefault();
    var data = {
      inputPassword: this.state.inputPassword,
      hashedPassword: this.state.hashedPassword
    };
    request
      .post('api/hashedPassword')
      .send(data)
      .type('json')
      .end(function(err, res) {
        if (res.ok) {
          var res = JSON.parse(res.text);
          var verified = res.verified;
          if (verified) {
            this.setState({VerificationMessage: 'Match.'});
            // alert('Match');
          } else {
            this.setState({VerificationMessage: 'No match.'});
            // alert('No match');
          }
        } else {
          console.error('/api/hashedPassword', status, err.toString());
        }
        this.setState({isVerificationBoxVisible: true});
      });
  },

  render () {
    return (
      <form className='formContainer' onSubmit={this.onSubmit}>
        <InputBox inputPassword={this.state.inputPassword} placeholder='Enter plain text to verify' style={{margin: '10px'}} onUserInput={this.handleUserInput} />
        <InputBox inputPassword={this.state.hashedPassword} placeholder='Enter hashed password to check against plain text' style={{margin: '10px'}} onUserInput={this.handleHashedPassword} />
        <button className='formButton' type='submit'>Verify</button>
        {this.renderVerificationBox()}
      </form>
    );
  }
});
