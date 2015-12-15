var React = require('react');
var $ = require('jQuery');
var Link = require('react-router').Link;

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

  // Trim down to 140 characters
  trimSummary: function() {
   var body = this.props.issue.body;
   var summary = '';
    
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
        
    // Add each character to summary
    for (var j = 0; j < endIndex; j++) {
      summary += body[j];
    }

    return summary;
  },

  // Check for @mentions
  findMentions: function(text) {
    if (text.indexOf('@') !== -1) {
      var reg = /(?:^|\W)@(\w+)(?!\w)/g;
      var text = text.replace(reg, function(_, $1, $2) {
        var route = 'http://www.github.com/' + $1;
        return '<a href='+route+'>'+_+'</a>' + text[$2] 
      });

      return $.parseHTML(text);
    } else {
      return text;
    }
  },

  render: function() {
    var text = this.trimSummary();
    var summary = this.findMentions(text);

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
