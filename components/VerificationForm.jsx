'use strict';

import React from 'react';
import $ from 'jquery';
import request from 'superagent';
import Spinner from 'react-spinkit';

import InputBox from './InputBox.jsx';

const unicode = {
      correct: '\u2713',
      cross: '\u274c'
};

export default React.createClass({
  getInitialState () {
    return {
      inputPassword: '',
      hashedPassword: '',
      isVerificationBoxVisible: false,
      showSpinner: false
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
    this.setState({showSpinner: true});
    request
      .post('api/hashedPassword')
      .send(data)
      .type('json')
      .end(function(err, res) {
        if (res.ok) {
          var res = JSON.parse(res.text);
          var verified = res.verified;
          self.setState({showSpinner: false});
          if (verified) {
            self.setState({isVerified: true});
          } else {
            self.setState({isVerified: false});
          }
        } else {
          console.error('/api/hashedPassword', status, err.toString());
          self.setState({isVerificationBoxVisible: false});
        }
        self.setState({isVerificationBoxVisible: true});
      });
  },
  renderVerificationBox () {
      if (this.state.showSpinner) {
        return (<Spinner spinnerName='circle' />);
      }
      if (this.state.isVerified === undefined) {
        return;
      }
      if (this.state.isVerified) {
        return (
          <div className="verification-box verified" >
            { unicode.correct + ' ' + 'Match.' }
          </div>
        );
      }
      return (
        <div className="verification-box unverified">
          { unicode.cross + ' ' + 'No match.' }
        </div>
      );
  },
  render () {
    return (
      <div className="form-container">
        <div className="form-title"> Verify </div>
        <form onSubmit={this.onSubmit}>
          <InputBox inputPassword={this.state.inputPassword} placeholder='Enter plain text to verify' onUserInput={this.handleUserInput} />
          <InputBox inputPassword={this.state.hashedPassword} placeholder='Enter hashed password to check against plain text' onUserInput={this.handleHashedPassword} />
          <div>
            <button className="form-button" type='submit'>Verify</button>
            {this.renderVerificationBox()}
          </div>
        </form>
      </div>
    );
  }
});
