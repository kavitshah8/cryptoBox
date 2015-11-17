'use strict';

import React from 'react';
import $ from 'jquery';
import request from 'superagent';
import Spinner from 'react-spinkit';

import OutputBox from './OutputBox.jsx';
import InputBox from './InputBox.jsx';
import Select from './Select.jsx';

export default React.createClass({
  getInitialState () {
    return {
      inputPassword: '',
      hashedPassword: '',
      showOutputBox: false,
      options: [
        { value: 8, label: '8' },
        { value: 9, label: '9' },
        { value: 10, label: '10' },
        { value: 11, label: '11' },
        { value: 12, label: '12' },
        { value: 13, label: '13' },
        { value: 14, label: '14' }
      ],
      matchPos: 'any',
      matchValue: true,
      value: '',
      matchLabel: true,
      multi: false,
      showSpinner: false
    };
  },

  handleUserInput (inputPassword) {
    this.setState({inputPassword: inputPassword});
  },
  handleUserSelect (value) {
    this.setState({value: value});
  },
  updateOutputBox (data) {
    this.setState({hashedPassword: data.hash, showOutputBox: true});
  },
  onSubmit (e) {
    e.preventDefault();
    var data = {
      inputPassword: this.state.inputPassword,
      SALT_WORK_FACTOR: this.state.value,
    };
    this.setState({showSpinner: true});
    if (data.inputPassword === '') {
      return;
    }
    if (data.SALT_WORK_FACTOR === '') {
      data.SALT_WORK_FACTOR = 12;
    }
    var self = this;
    request
      .post('api/inputPassword')
      .send(data)
      .type('json')
      .end(function(err, res){
        if (res.ok) {
          self.updateOutputBox(JSON.parse(res.text));
          self.setState({inputPassword: '', showSpinner: false});
        } else {
          console.error('/api/inputPassword', status, err.toString());
        }
      });
  },
  renderOutputBoxOrSpinner () {
    var ret;
    if( this.state.showSpinner )
      ret = <Spinner spinnerName='circle' />;
    else if( this.state.showOutputBox ) {
      ret = <div> <OutputBox hashedPassword={this.state.hashedPassword}/> </div>;
    } else {
      ret = null;
    }
    return ret;
  },
  render () {
    return(
        <form className='formContainer'onSubmit={this.onSubmit}>
          <InputBox inputPassword={this.state.inputPassword} autoFocus placeholder='Enter a password to bcrypt' style={{margin: '10px'}} onUserInput={this.handleUserInput} />
          <Select options={this.state.options} style={{margin:'10px', width: '160px'}} value={this.state.value} onSelect={this.handleUserSelect} required/>
          <button className='formButton' type='submit'>Encrypt</button>
          {this.renderOutputBoxOrSpinner()}
        </form>
    );
  }
});
