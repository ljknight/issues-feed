var React = require('react');
var Utils = require('./../../helpers/Utils.js');

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

  render: function() {
    var summary = Utils.findMentions(this.props.comment.body);

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
