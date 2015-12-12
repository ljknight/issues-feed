var React = require('react');
var $ = require('jQuery');
var IssueDetail = require('./IssueDetail.jsx');
var CommentFeed = require('./CommentFeed.jsx');

var IssueDetailContainer = React.createClass({
  getInitialState: function() {
    return {
      issueId: this.props.params.issueId,
      issue: [{
        title: '',
        user: {
          login: ''
        }
      }]
    };
  },

  // componentDidMount: function() {
  //   this.getIssue();
  // },

  componentWillMount: function() {
    this.getIssue();
  },

  getIssue: function() {
    $.ajax({
      url: 'https://api.github.com/repos/npm/npm/issues/' + this.state.issueId,
      dataType: 'json',
      success: function(data, status, request) {
        console.log('data', data)
        if (this.isMounted()) {
          this.setState({
            issue: [data]
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
      <div className='issuedetail-container'>
        <IssueDetail issue={this.state.issue}/>
        <CommentFeed />
      </div>
    )
  }

});

module.exports = IssueDetailContainer;
