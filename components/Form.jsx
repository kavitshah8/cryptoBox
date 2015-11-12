'use strict';

import React from 'react';
import $ from 'jquery';
import request from 'superagent';

import OutputBox from './OutputBox.jsx';
import InputBox from './InputBox.jsx';
import Select from './Select.jsx';

var Form = React.createClass({
  getInitialState () {
    return {inputPassword: '', hashedPassword: '', displayOutputBox: false,
        options: [
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
        multi: false
    };
  },
  handleUserInput (inputPassword) {
    this.setState({inputPassword: inputPassword});
  },
  handleUserSelect (value) {
    this.setState({value: value});
  },
  updateOutputBox (data) {
    this.setState({hashedPassword: data.hash, displayOutputBox: true});
  },
  onSubmit (e) {
    e.preventDefault();
    var data = {inputPassword: this.state.inputPassword, SALT_WORK_FACTOR: this.state.value};
    if (data.inputPassword === '') {
      return;
    }
    if (data.SALT_WORK_FACTOR === '') {
      alert('Selecting SALT_WORK_FACTOR is required');
      return;
    }
    var self = this;
    request
      .post('api/inputPassword')
      .send(data)
      .type('json')
      .end(function(err, res){
        if (res.ok) {
          self.updateOutputBox(JSON.parse(res.text));
          self.setState({inputPassword: ''});
        } else {
          console.error('/api/inputPassword', status, err.toString());
        }
      });
  },
  renderOutputBox () {
    return !this.state.displayOutputBox ? null : (
        <div>
            <OutputBox hashedPassword={this.state.hashedPassword}/>
        </div>
    );
  },
  render () {
    return(
        <form className='formContainer'onSubmit={this.onSubmit}>
          <InputBox inputPassword={this.state.inputPassword} onUserInput={this.handleUserInput} />
          <Select options={this.state.options} value={this.state.value} onSelect={this.handleUserSelect} required/>
          <button className='formButton' type='submit'>Encrypt</button>
          {this.renderOutputBox()}
        </form>
    );
  }
});

export default Form;
