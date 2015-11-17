'use strict';

import React from 'react';
import VerificationForm from './VerificationForm.jsx';
import EncryptForm from './EncryptForm.jsx';

export default React.createClass({
  render () {
    return (
      <div>
        <EncryptForm />,
        <VerificationForm />
      </div>
    );
  }
});
