var React = require('react');

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
          {labels.map(function(label) {
            return <li className='issuefeed-label' key={label.id}>{label.name}</li>
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

  // Check for @mentions
  findMentions: function(text) {
    if (text.indexOf('@') !== -1) {
      var re = /(?:^|\W)@(\w+)(?!\w)/g;
      var match;
      var spliceSlice = function(str, index, count, add) {
        var result = [];
        result.push(str.slice(0, index), add, str.slice(index + count)) 
        return result;
      }
        
      while (match = re.exec(text)) {
        var route = 'http://www.github.com/' + match[1];
        text = spliceSlice(text, match.index, match[0].length, <span className='mention'><a href={route}>{match[0]}</a></span>)
      }

      return text;
    } else {
      return text;
    }
  },

  render: function() {
    var summary = this.findMentions(this.props.issue.body);

    return (
      <div className='issuedetail-summary'>{summary}</div>
    )
  }
});

module.exports = IssueDetail;
