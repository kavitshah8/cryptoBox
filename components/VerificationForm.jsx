'use strict';

import React from 'react';
import $ from 'jquery';
import request from 'superagent';

import InputBox from './InputBox.jsx';
import VerificationBox from './VerificationBox.jsx';

export default React.createClass({
  getInitialState () {
    return {
      inputPassword: '',
      hashedPassword: '',
      isVerified: null,
      verificationMessage: '',
      unicode:'',
      isVerificationBoxVisible: false
    };
  },
  handleUserInput (inputPassword) {
    this.setState({inputPassword: inputPassword});
  },
  handleHashedPassword (hashedPassword) {
    this.setState({hashedPassword: hashedPassword});
  },
  onSubmit (e) {
    e.preventDefault();
    var self = this;
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
            self.setState({isVerified: true});
            self.setState({verificationMessage:'Match.'});
            self.setState({unicode: '\u2713'});
          } else {
            self.setState({isVerified: false});
            self.setState({verificationMessage:'No match.'});
            self.setState({unicode: '\u274c'});
          }
        } else {
          console.error('/api/hashedPassword', status, err.toString());
          self.setState({isVerificationBoxVisible: false});
        }
        self.setState({isVerificationBoxVisible: true});
      });
  },

  render () {
    return (
      <form className='formContainer' onSubmit={this.onSubmit}>
        <InputBox inputPassword={this.state.inputPassword} placeholder='Enter plain text to verify' style={{margin: '10px'}} onUserInput={this.handleUserInput} />
        <InputBox inputPassword={this.state.hashedPassword} placeholder='Enter hashed password to check against plain text' style={{margin: '10px'}} onUserInput={this.handleHashedPassword} />
        <div>
          <button className='formButton' type='submit'>Verify</button>
          <VerificationBox isVerified={this.state.isVerified} verificationMessage={this.state.verificationMessage} unicode={this.state.unicode} />
        </div>
      </form>
    );
  }
});
