'use strict';

import React from 'react';

export default React.createClass({

  render () {
    return (
      <div className='verificationBox'>
        {this.props.unicode}
        {this.props.verificationMessage}
      </div>
    );
  }
});
