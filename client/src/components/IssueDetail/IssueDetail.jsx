var React = require('react');

var IssueDetail = React.createClass({
  
  render: function(){
    var issue = this.props.issue[0];

    return (
      <div className='issuedetail'>
        <IssueTitle issue={issue} />
        <IssueState issue={issue} />
        <IssueLabels issue={issue}/>
        <IssueUsername issue={issue} />
        <IssueAvatar issue={issue} />
        <IssueSummary issue={issue} />
      </div>
    )
  }
});

var IssueTitle = React.createClass({
  
  render: function() {
    return (
     <span className='issuedetail-title'>{this.props.issue.title}</span>
    )
  }
});

var IssueState = React.createClass({

  render: function() {
    return (
      <div></div>
    )
  }
});

var IssueLabels = React.createClass({
  
  render: function() {
    var labels = this.props.issue.labels;

    if (labels !== undefined) {
      return (
        <ul className='issuedetail-labels'>
          {labels.map(function(label) {
            return <li key={label.id}>{label.name}</li>
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

var IssueUsername = React.createClass({

  render: function() {
    return (
      <span className='issuedetail-username'>{this.props.issue.user.login}</span>
    )
  }
});

var IssueAvatar = React.createClass({

  render: function() {
    return (
      <div className='issuedetail-avatar'><img src={this.props.issue.user.avatar_url}/></div>
    )
  }
});

var IssueSummary = React.createClass({

  render: function() {

    return (
      <div className='issuedetail-summary'>{this.props.issue.body}</div>
    )
  }
});

module.exports = IssueDetail;
