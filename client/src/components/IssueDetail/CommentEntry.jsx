var React = require('react');
var $ = require('jQuery');

var CommentEntry = React.createClass({
  
  render: function(){
    return (
      <li className='commentfeed-entry'>
        <CommentAvatar comment={this.props.comment} />
        <div className='commentfeed-entrycontent'>
          <CommentUsername comment={this.props.comment} />
          <CommentSummary comment={this.props.comment} />
        </div>
      </li>
    )
  }
});

var CommentAvatar = React.createClass({

  render: function() {
    return (
      <div className='commentfeed-avatar'><img src={this.props.comment.user.avatar_url} alt='User Avatar'/></div>
    )
  }
});

var CommentUsername = React.createClass({

  render: function() {
    return (
      <div className='commentfeed-username'><a href={this.props.comment.user.html_url} target='window'>{this.props.comment.user.login}</a> commented</div>
    )
  }
});

var CommentSummary = React.createClass({
  
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
    var summary = this.findMentions(this.props.comment.body);

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

module.exports = CommentEntry;
