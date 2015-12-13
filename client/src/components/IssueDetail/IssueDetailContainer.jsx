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
        },
        body: ''
      }],
      commentCount: '',
      commentURL: '',
      comments: []
    };
  },

  componentDidMount: function() {
    this.getIssue();
    this.getComments();
  },

  getIssue: function() {
    $.ajax({
      url: 'https://api.github.com/repos/npm/npm/issues/' + this.state.issueId + 'TOKEN',
      dataType: 'json',
      success: function(data, status, request) {
        console.log('data', data)
        if (this.isMounted()) {
          this.setState({
            issue: [data],
            commentCount: data.comments,
            commentURL: data.comments_url
          });          
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getComments: function() {
    $.ajax({
      url: 'https://api.github.com/repos/npm/npm/issues/' + this.state.issueId + 'TOKEN',
      dataType: 'json',
      success: function(data, status, request) {
        console.log('data', data)
        if (this.isMounted()) {
          this.setState({
            comments: data
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
        <IssueDetail issue={this.state.issue} />
        <CommentFeed comments={this.state.comments} commentCount={this.state.commentCount} />
      </div>
    )
  }

});

module.exports = IssueDetailContainer;
