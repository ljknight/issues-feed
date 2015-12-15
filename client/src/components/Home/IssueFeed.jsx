var React = require('react');
var IssueEntry = require('./IssueEntry.jsx');

var IssueFeed = React.createClass({

  render: function(){
    var issues = this.props.issues;
  
    return (
      <ul className='issuefeed'>
        {issues.map(function(issue) {
          return <IssueEntry key={issue.id} issue={issue} />
        })}
      </ul>
    )
  }

});

module.exports = IssueFeed;
