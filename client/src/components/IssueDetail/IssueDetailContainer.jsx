var React = require('react');
var $ = require('jQuery');
var Spinner = require('react-spin');

var Title = require('./../Title.jsx');
var IssueDetail = require('./IssueDetail.jsx');
var CommentFeed = require('./CommentFeed.jsx');
var Constants = require('./../../Constants.js');
var APIkey = require('./../../APIkey.js');

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
      url: 'https://api.github.com/repos/npm/npm/issues/' + this.state.issueId + '&' + APIkey,
      dataType: 'json',
      success: function(data, status, request) {
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
      url: 'https://api.github.com/repos/npm/npm/issues/' + this.state.issueId + '/comments?' + APIkey,
      dataType: 'json',
      success: function(data, status, request) {
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
    var $loading = $('.spinner');

    $(document)
      .ajaxStart(function () {
        $loading.show();
      })
      .ajaxStop(function () {
        $loading.hide();
      });

    return (
      <div className='issuedetail-page'>
        <Title />
        <div className='issuedetail-container'>
          <div className='spinner'>
            <Spinner config={Constants.spinCfg} />
          </div>
          <IssueDetail issue={this.state.issue} />
          <CommentFeed comments={this.state.comments} />
       </div>
      </div>
    )
  }

});

module.exports = IssueDetailContainer;
