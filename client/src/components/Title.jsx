var React = require('react');
var Link = require('react-router').Link;
var HomeContainer = require('./Home/HomeContainer.jsx');

var Title = React.createClass({

  render: function(){
    return (
      <header>
        <h1><Link to={`/`}>npm/issues</Link></h1>
      </header>
    )
  }
});

module.exports = Title;
