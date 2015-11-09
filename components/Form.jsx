import React from 'react';
import OutputBox from './OutputBox.jsx';
import InputBox from './InputBox.jsx';
import $ from 'jquery';
import request from 'superagent';

var Form = React.createClass({
  getInitialState: function() {
    return {inputPassword: '', hashedPassword: 'Waiting...'};
  },
  handleUserInput: function(inputPassword) {
    this.setState({inputPassword: inputPassword});
  },
  updateOutputBox: function(data) {
    this.setState({hashedPassword: data.hash});
  },
  onSubmit: function (e) {
    e.preventDefault();
    var data = {inputPassword: this.state.inputPassword};
    var self = this;
    request
      .post('api/inputPassword')
      .send(data)
      .type('json')
      .end(function(err, res){
        if (res.ok) {
          self.updateOutputBox(JSON.parse(res.text));
        } else {
          console.error('/api/inputPassword', status, err.toString());
        }
      });
  },
  render: function() {
    return(
      <form onSubmit={this.onSubmit}>
        <div>
          <InputBox inputPassword={this.state.inputPassword} onUserInput={this.handleUserInput} />
        </div>
        <div>
          <OutputBox hashedPassword={this.state.hashedPassword}/>
        </div>
        <button type='submit' >Submit</button>
      </form>
    );
  }
});

export default Form;
