'use strict';

import React from 'react';

var OutputBox = React.createClass({
    render: function() {
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

export default OutputBox;
