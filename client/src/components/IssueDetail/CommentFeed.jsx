var React = require('react');
var CommentEntry = require('./CommentEntry.jsx');

var CommentFeed = React.createClass({
  
  render: function(){
    var comments = this.props.comments;

    return (
      <div className='comments clear'>
        <ul className='commentfeed'>
          {comments.map(function(comment) {
            return <CommentEntry key={comment.id} comment={comment} />
          })}
        </ul>
      </div>
    )
  }
});

module.exports = CommentFeed;
