var React = require('react');
var _ = require('underscore');
var Entry = require('./IssueEntry.js');

var IssueFeed = React.createClass({
  renderEntries: function() {
        return _.map(this.props.issues, function(issue) {
            return <Entry issue={issue} />;
        });
    },

  render: function(){
    var issues = this.props.issues;
    return (
      <ul className='issue-feed'>
        {this.renderEntries()}
      </ul>
    )
  }
});

module.exports = IssueFeed;

// return (
//       <ol>
//         {results.map(function(result) {
//           return <li key={result.id}>{result.text}</li>;
//         })}
//       </ol>
//     );
