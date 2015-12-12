var React = require('react');

var IssueEntry = React.createClass({
  
  render: function(){

    var issue = this.props.issue;
    return (
      <li className='issuefeed-entry'>
        <IssueNumber issue={issue} />
        <IssueTitle issue={issue}/>
        <IssueLabels issue={issue}/>
        <IssueUsername issue={issue} />
        <IssueAvatar issue={issue} />
        <IssueSummary issue={issue} />
      </li>
    )
  }
});

var IssueNumber = React.createClass({
  
  render: function() {
    return (
      <span className='issuefeed-number'>#{this.props.issue.number}</span>
    )
  }
});

var IssueTitle = React.createClass({
  
  render: function() {
    return (
      <span className='issuefeed-title'>{this.props.issue.title}</span>
    )
  }
});

// TODO: add label colors

var IssueLabels = React.createClass({
  
  render: function() {
    var labels = this.props.issue.labels;

    return (
      <ul className='issuefeed-labels'>
        {labels.map(function(label) {
          return <li key={label.id}>{label.name}</li>
        })}
      </ul>
    )
  }
});

var IssueUsername = React.createClass({

  render: function() {
    return (
      <span className='issuefeed-username'>{this.props.issue.user.login}</span>
    )
  }
});

var IssueAvatar = React.createClass({

  render: function() {
    return (
      <div className='issuefeed-avatar'><img src={this.props.issue.user.avatar_url}/></div>
    )
  }
});

var IssueSummary = React.createClass({

  render: function() {
   var body = this.props.issue.body;
   var summary = '';
    
    // Edit down to 140 characters
    if (body.length <= 140) {
      summary = body;
    } else {
      var endIndex;

      // Check for newlines and spaces
      var check = body[139].match( /(\r\n|\n|\r|\s)/ );

      // If 140th char is not a newline or space, loop down from end to find closest clean break point
      if (!check) {
        for (var i = 139; i >= 0; i--) {
          if (body[i].match( /(\r\n|\n|\r|\s)/ )) {
            endIndex = i;
            break;
          }
        }
      } else {
        endIndex = 139;
      }
    }

    for (var j = 0; j < endIndex; j++) {
      summary += body[j];
    }

    return (
      <div className='issuefeed-summary'>{summary} <span className='issuefeed-summary-readmore'>...</span></div>
    )
  }
});

module.exports = IssueEntry;
