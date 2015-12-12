var React = require('react');
var IssueFeed = require('./IssueFeed.jsx');
var Pagination = require('./Pagination.jsx');

var HomeContainer = React.createClass({

  render: function() { 
    // TODO: use bootstrap grid 
    return (
      <div className='home-container'>
        <div className='issue-feed-container'>
          <IssueFeed issues={this.props.issues} />
        </div>
      </div>
    )
  }

});

module.exports = HomeContainer;

