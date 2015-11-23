'use strict';

import React from 'react';
import VerificationForm from './VerificationForm.jsx';
import EncryptForm from './EncryptForm.jsx';

export default React.createClass({
  render () {
    return (
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">Bcrypt Encrypt And Verification</a>
        </div>
        <div className="forms-container">
          <EncryptForm />
          <VerificationForm />
        </div>
      </div>
    );
  }
});
