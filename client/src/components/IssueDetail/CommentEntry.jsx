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

var CommentUsername = React.createClass({

  render: function() {
    return (
      <div className='commentfeed-username'><a href={this.props.comment.user.html_url} target='window'>{this.props.comment.user.login}</a> commented</div>
    )
  }
});

var CommentAvatar = React.createClass({

  render: function() {
    return (
      <div className='commentfeed-avatar'><img src={this.props.comment.user.avatar_url}/></div>
    )
  }
});

var CommentSummary = React.createClass({
  
  findMentions: function(text) {
    // Check for @mentions

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
    var summary = this.findMentions(this.props.comment.body);
    console.log(summary)

    return (
      <div className='commentfeed-summary'>{summary}</div>
    )
 }
});

module.exports = CommentEntry;


