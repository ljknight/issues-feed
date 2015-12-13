var React = require('react');

var CommentEntry = React.createClass({
  render: function(){
    return (
      <li>
        {this.props.comment.user.login}
        {this.props.comment.body}
      </li>
    )
  }
});

module.exports = CommentEntry;
