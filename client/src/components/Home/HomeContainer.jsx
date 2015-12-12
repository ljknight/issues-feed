var React = require('react');
var IssueFeed = require('./IssueFeed.jsx');
var Pagination = require('./Pagination.jsx');

var HomeContainer = React.createClass({

  render: function() { 
    // TODO: use bootstrap grid 
    return (
      <div className='home-container'>
        <div className='issue-feed-container'>
          <IssueFeed issues={this.props.issues} />
        </div>
      </div>
    )
  }

});
        // <div className='pagination'>
        //   <Pagination nextLink={this.props.nextLink} />
        // </div>

module.exports = HomeContainer;

// and this parent container has two separate methods, one for rendering the list container and one for rendering a details view or something

// the “right” way to do it would be having a part of state in this parent container that refers to whichever issue you want to view the details of, and then pass down a method to the list container from the parent container that basically does `give me the issue to display, and then tell me to render the issue view`

// and then the list container in turn either directly passes that method to each list item component, or wraps it then passes it

// basically, when you want to cause a change in state higher up the tree of components, the parent component should pass methods down to its children as `props`

// so that the method stays encapsulated in the parent and the children don’t care about the behavior of the method, just that they know when to call it and with what arguments

// the way we did stuff like this on our thesis was having the equivalent of a `viewMode` portion of state in the parent container, which would either be `list` or `details`

