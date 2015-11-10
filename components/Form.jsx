'use strict';

import React from 'react';
import OutputBox from './OutputBox.jsx';
import InputBox from './InputBox.jsx';
import $ from 'jquery';
import request from 'superagent';

var Form = React.createClass({
  getInitialState: function() {
    return {inputPassword: '', hashedPassword: '', displayOutputBox: false};
  },
  handleUserInput: function(inputPassword) {
    this.setState({inputPassword: inputPassword});
  },
  updateOutputBox: function(data) {
    this.setState({hashedPassword: data.hash, displayOutputBox: true});
  },
  onSubmit: function(e) {
    e.preventDefault();
    var data = {inputPassword: this.state.inputPassword};
    if (data.inputPassword === '') {
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
  renderOutputBox: function() {
    return !this.state.displayOutputBox ? null : (
        <div>
            <OutputBox hashedPassword={this.state.hashedPassword}/>
        </div>
    );
  },
  render: function() {
    return(
      <form className='formContainer'onSubmit={this.onSubmit}>
        <InputBox inputPassword={this.state.inputPassword} onUserInput={this.handleUserInput} />
        <button className='formButton' type='submit'>Submit</button>
        {this.renderOutputBox()}
      </form>
    );
  }
});

export default Form;
