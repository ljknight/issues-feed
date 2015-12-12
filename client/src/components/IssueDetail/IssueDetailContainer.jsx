var React = require('react');

var IssueContainer = React.createClass({

  componentDidMount: function() {
    this.setState({
      issue: findIssueById(this.props.params.issueId)
    });
  },

  render: function() {
    return(
      <div>HI</div>
    )
  }

});
