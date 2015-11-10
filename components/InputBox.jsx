'use strict';

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
          placeholder='Enter a password to bcrypt'
          ref='inputPassword'
          className='inputBox'
          onChange={this.handleChange}
          required />
      );
    }
});

export default InputBox;
