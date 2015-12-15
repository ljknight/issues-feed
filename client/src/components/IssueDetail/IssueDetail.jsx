var React = require('react');
var utils = require('./../../helpers/utils.js');

var IssueDetail = React.createClass({
  
  render: function(){
    var issue = this.props.issue[0];

    return (
      <div className='issuedetail'>
        <IssueAvatar issue={issue} />
        <div className='issuedetail-entrycontent'>
          <IssueTitle issue={issue} />
          <IssueState issue={issue} />
          <IssueUsername issue={issue} />
          <IssueLabels issue={issue}/>
          <IssueSummary issue={issue} />
        </div>
      </div>
    )
  }
});

var IssueAvatar = React.createClass({

  render: function() {
    return (
      <div className='issuedetail-avatar'><img src={this.props.issue.user.avatar_url} alt='User Avatar'/></div>
    )
  }
});

var IssueTitle = React.createClass({
  
  render: function() {
    return (
     <div className='issuedetail-title'><a href={this.props.issue.html_url} target='window'>{this.props.issue.title}</a></div>
    )
  }
});

var IssueState = React.createClass({

  render: function() {
    return (
      <span className='issuedetail-state'>{this.props.issue.state}</span>
    )
  }
});

var IssueUsername = React.createClass({

  render: function() {
    return (
      <div className='issuedetail-username'>&nbsp;&mdash;&nbsp;opened by <a href={this.props.issue.user.html_url} target='window'>{this.props.issue.user.login}</a></div>
    )
  }
});

var IssueLabels = React.createClass({
  
  render: function() {
    var labels = this.props.issue.labels;

    if (labels !== undefined) {
      return (
        <ul className='issuedetail-labels'>
          {labels.map(function(label, i) {
            return <li className='issuefeed-label' key={i}>{label.name}</li>
          })}
        </ul>
      )      
    } else {
      return (
        <ul className='issuedetail-labels'></ul>
      )
    }
  }
});

var IssueSummary = React.createClass({

  render: function() {
    var summary = utils.findMentions(this.props.issue.body);

    if (Array.isArray(summary)) {
      return (
        <div className='commentfeed-summary'>
          {summary.map(function(segment, i) {
            if (segment.nodeName === '#text') {
              return <span key={i}>{segment.textContent}</span>
            } else {
              return <a key={i} href={segment.href} className='mention'>{segment.innerHTML}</a>
            }
          })} 
        </div>
      )
    } else {
      return (
        <div className='commentfeed-summary'>{summary}</div>
      )    
    }
  }
});

module.exports = IssueDetail;
