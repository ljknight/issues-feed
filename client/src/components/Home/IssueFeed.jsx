var React = require('react');
var Entry = require('./IssueEntry.jsx');

var IssueFeed = React.createClass({

  render: function(){
    var issues = this.props.issues;
    var issuesArray = [];

    issues.forEach(function(issue) {
      issuesArray.push(
        <Entry key={issue.id} issue={issue} />
      );
    });

    return (
      <ul className='issue-feed'>{issuesArray}</ul>
    )
  }
});

module.exports = IssueFeed;

