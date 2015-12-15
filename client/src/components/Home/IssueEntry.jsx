var React = require('react');
var $ = require('jQuery');
var Link = require('react-router').Link;
var Utils = require('./../../helpers/Utils.js');

var IssueEntry = React.createClass({
  
  render: function(){
    var issue = this.props.issue;
    
    return (
      <li className='issuefeed-entry'>
        <IssueAvatar issue={issue} />
        <div className='issuefeed-entrycontent'>
          <IssueNumber issue={issue} />
          <IssueTitle issue={issue} />
          <IssueUsername issue={issue} />
          <IssueLabels issue={issue}/>
          <IssueSummary issue={issue} />
        </div>
        <div className='clear'></div>
      </li>
    )
  }
});

var IssueAvatar = React.createClass({

  render: function() {
    return (
      <div className='issuefeed-avatar'><img src={this.props.issue.user.avatar_url} alt='User Avatar'/></div>
    )
  }
});

var IssueNumber = React.createClass({
  
  render: function() {
    return (
      <div className='issuefeed-number'>#{this.props.issue.number}</div>
    )
  }
});

// Title links to Issue Detail page
var IssueTitle = React.createClass({
  
  render: function() {
    return (
     <div className='issuefeed-title'><Link to={`/issue/${this.props.issue.number}`}>{this.props.issue.title}</Link></div>
    )
  }
});

var IssueUsername = React.createClass({

  render: function() {
    return (
      <div className='issuefeed-username'>opened by <a href={this.props.issue.user.html_url} target='window'>{this.props.issue.user.login}</a></div>
    )
  }
});

var IssueLabels = React.createClass({
  
  render: function() {
    var labels = this.props.issue.labels;

    return (
      <ul className='issuefeed-labels'>
        {labels.map(function(label, i) {
          return <li className='issuefeed-label' key={i}>{label.name}</li>
        })}
      </ul>
    )      
  }
});

var IssueSummary = React.createClass({

  render: function() {
    var text = Utils.trimSummary(this.props.issue.body);
    var summary = Utils.findMentions(text);

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

module.exports = IssueEntry;
