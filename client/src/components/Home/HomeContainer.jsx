var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jQuery');

var Title = require('./../Title.jsx');
var IssueFeed = require('./IssueFeed.jsx');
var Pagination = require('./Pagination.jsx');

var HomeContainer = React.createClass({

  getInitialState: function(){
    return {
      issues: [],
      page: 1
    };
  },

  componentDidMount: function() {
    this.getIssues();
  },

  // Scroll to top after page change
  componentDidUpdate: function() {
    ReactDOM.findDOMNode(document.body).scrollTop = 0;
  },

  getIssues: function() {
  
    $.ajax({
      url: 'https://api.github.com/repos/npm/npm/issues?page=' + this.state.page + '&',
      dataType: 'json',
      success: function(data, status, request) {
        console.log('data', data, this.state.page, this.props.params)
        if (this.isMounted()) {
          this.setState({
            issues: data,
            page: this.props.params.page || 1
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
          <Pagination getIssues={this.getIssues} page={this.state.page} />
        </div>
      </div>
    )
  }

});

module.exports = HomeContainer;

