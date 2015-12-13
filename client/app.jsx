var ReactDOM = require('react-dom');
var React = require('react');
var $ = require('jQuery');

// React Router
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

// Modules
var Title = require('./src/components/Title.jsx');
var HomeContainer = require('./src/components/Home/HomeContainer.jsx');
var IssueDetailContainer = require('./src/components/IssueDetail/IssueDetailContainer.jsx');


var App = React.createClass({
  getInitialState: function(){
    return {
      issues: []
    };
  },

  componentDidMount: function() {
    this.getIssues();
  },

  getIssues: function() {
    $.ajax({
      url: 'https://api.github.com/repos/npm/npm/issues?page=1?TOKEN',
      dataType: 'json',
      success: function(data, status, request) {
        console.log('data', data)
        if (this.isMounted()) {
          this.setState({
            issues: data
          });
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function(){
    return (
      <div className='app'>
        <Title />
        <HomeContainer issues={this.state.issues} />
      </div>
    );
  }
});

ReactDOM.render(
  <Router>
    <Route path='/' component={App}>
    </Route>
    <Route path='issue/:issueId' component={IssueDetailContainer} handler={IssueDetailContainer}>
    </Route>
  </Router>,
  document.getElementById('app')
);

module.exports = App;
