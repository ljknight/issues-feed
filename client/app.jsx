var ReactDOM = require('react-dom');
var React = require('react');
var $ = require('jQuery');

var Title = require('./src/components/Title.js');
var Home = require('./src/components/Home/Home.js');

var App = React.createClass({
  getInitialState: function(){
    return {
      issues: [],
    };
  },

  componentDidMount: function() {
    // ajax call
     $.ajax({
      url: 'https://api.github.com/repos/npm/npm/issues',
      dataType: 'json',
      success: function(data) {
        console.log('data', data)
        this.setState({
          issues: data, 
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  // create method to fetch 25 entries - call when componentdidmount

  render: function(){
    return (
      <div>
      <Title />
      <Home issues={this.state.issues}/>
      </div>
    );
  }
});

// use react router

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.exports = App;
