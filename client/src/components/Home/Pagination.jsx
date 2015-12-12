var React = require('react');

var Pagination = React.createClass({

  render: function() {
    return (
      // TODO: use better tags
      <div>{this.props.nextLink}</div>
    )
  }
});

module.exports = Pagination;


