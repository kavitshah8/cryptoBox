'use strict';

import React from 'react';

export default React.createClass({
    render () {
      return (
        <input
          readOnly
          type='text'
          className='outputBox'
          value={this.props.hashedPassword}
          style={{cursor: 'not-allowed', backgroundColor: '#eeeeee'}} />
      );
    }
});
