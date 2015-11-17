'use strict';

import React from 'react';
import $ from 'jquery';
import request from 'superagent';

import InputBox from './InputBox.jsx';

export default React.createClass({
  getInitialState () {
    return {
      inputPassword: '',
      hashedPassword: '',
      showOutputBox: false,
    };
  },

  onSubmit () {
      alert('Form Submitted');
  },

  render () {
    return (
      <form className='formContainer'onSubmit={this.onSubmit}>
        <InputBox inputPassword={this.state.inputPassword} placeholder='Enter plain text to verify' style={{margin: '10px'}} onUserInput={this.handleUserInput} />
        <InputBox inputPassword={this.state.hashedPassword} placeholder='Enter hashed password to check against plain text' style={{margin: '10px'}} onUserInput={this.handleUserInput} />
        <button className='formButton' type='submit'>Verify</button>
      </form>
    );
  }
});
