var React = require('react');
var $ = require('jQuery');

var Title = require('./../Title.jsx');
var IssueFeed = require('./IssueFeed.jsx');
var Pagination = require('./Pagination.jsx');

var HomeContainer = React.createClass({

  getInitialState: function(){
    return {
      issues: [],
      page: this.props.params.page || 1
    };
  },

  componentDidMount: function() {
    this.getIssues();
  },

  getIssues: function(page) {
    $.ajax({
      url: 'https://api.github.com/repos/npm/npm/issues?page=' + page + '&',
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

  render: function() { 
    return (
      <div className='home-page'>
        <Title />
        <div className='issuefeed-container'>
          <IssueFeed issues={this.state.issues} />
        </div>
        <Pagination getIssues={this.state.getIssues} page={this.state.page} />
      </div>
    )
  }

});

module.exports = HomeContainer;

