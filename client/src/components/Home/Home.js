// Created Home component so that input fields or other features could be added later
var React = require('react');
var IssueFeed = require('./IssueFeed.js');

var Home = React.createClass({

  render: function(){ 
    // use bootstrap grid 
    return (
      <div>
        < IssueFeed issues={this.props.issues}/>
      </div>
    )
  }
});

module.exports = Home;
