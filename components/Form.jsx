import React from 'react';
import OutputBox from './OutputBox.jsx';
import InputBox from './InputBox.jsx';

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
    $.ajax({
      url: '/api/inputPassword',
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(data) {
        this.updateOutputBox(data);
        console.log('Hashed Password = ', data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/inputPassword', status, err.toString());
      }.bind(this)
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
