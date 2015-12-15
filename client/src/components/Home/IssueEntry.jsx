var React = require('react');
var Link = require('react-router').Link;
var utils = require('./../../helpers/utils.js');

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
      <span className='issuefeed-number'>#{this.props.issue.number}</span>
    )
  }
});

// Title links to Issue Detail page
var IssueTitle = React.createClass({
  
  render: function() {
    return (
     <h3 className='issuefeed-title'><Link to={`/issue/${this.props.issue.number}`}>{this.props.issue.title}</Link></h3>
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

    if (labels !== undefined) {
      return (
        <ul className='issuefeed-labels'>
          {labels.map(function(label, i) {
            return <li className='issuefeed-label' key={i}>{label.name}</li>
          })}
        </ul>
      )      
    } else {
      return (
        <ul className='issuefeed-labels'></ul>
      )
    }
  }
});

var IssueSummary = React.createClass({

  render: function() {
    var text = utils.trimSummary(this.props.issue.body);
    var summary = utils.findMentions(text);

    if (Array.isArray(summary)) {
      return (
        <p className='issuefeed-summary'>
          {summary.map(function(segment, i) {
            if (segment.nodeName === '#text') {
              return <span key={i}>{segment.textContent}</span>
            } else {
              return <a key={i} href={segment.href} className='mention' target='window'>{segment.innerHTML}</a>
            }
          })} 
        </p>
      )
    } else {
      return (
        <p className='issuefeed-summary'>{summary} <span className='issuefeed-summary-readmore'><Link to={`/issue/${this.props.issue.number}`}>(More)</Link></span></p>
      )    
    }
  }
});

module.exports = IssueEntry;
