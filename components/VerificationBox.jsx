'use strict';

import React from 'react';

export default React.createClass({
  render () {
    return ( 
      <div class='VerificationBox'>
        {this.props.VerificationMessage}
      </div>
    );
  }
});
