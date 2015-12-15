var React = require('react');
var IssueEntry = require('./IssueEntry.jsx');
var ErrorClass = require('./Error.jsx');

var IssueFeed = React.createClass({

  render: function(){
    var issues = this.props.issues;
    var error = this.props.error;

    if (error.length > 0) {
      return <ErrorClass error={error} />
    } else {
      return (
        <ul className='issuefeed'>
          {issues.map(function(issue) {
            return <IssueEntry key={issue.id} issue={issue} />
          })}
        </ul>
      )      
    }
  }
});

module.exports = IssueFeed;
