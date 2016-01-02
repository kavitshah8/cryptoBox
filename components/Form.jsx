'use strict';

import React from 'react';
import VerificationForm from './VerificationForm.jsx';
import EncryptForm from './EncryptForm.jsx';

export default React.createClass({
  render () {
    return (
      <div className="container">
        <div className="navbar-header">
          <a href="/"><i className="fa fa-home fa-2x fa-fw"></i></a>
          <a className="navbar-brand" href="/tools/bcrypt-verify/">Bcrypt And Verify</a>
        </div>
        <div className="forms-container">
          <EncryptForm />
          <VerificationForm />
        </div>
      </div>
    );
  }
});
