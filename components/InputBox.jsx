import React from 'react';

var InputBox = React.createClass({
    handleChange: function() {
        this.props.onUserInput(this.refs.inputPassword.value);
    },

    render: function() {
      return (
        <input
          type='text'
          value={this.props.inputPassword}
          ref='inputPassword'
          onChange={this.handleChange} />
      );
    }
});

export default InputBox;
