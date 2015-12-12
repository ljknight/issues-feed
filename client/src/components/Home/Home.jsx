// Created Home component so that input fields or other features could be added later

var React = require('react');
var IssueFeed = require('./IssueFeed.jsx');

var Home = React.createClass({

  render: function(){ 
    // TODO: use bootstrap grid 
    return (
      <div className='issue-feed-container'>
        < IssueFeed issues={this.props.issues}/>
      </div>
    )
  }
});

module.exports = Home;
