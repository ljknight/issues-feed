var React = require('react');

var ErrorClass = React.createClass({
  
  render: function(){
    var error = this.props.error[0];
    
    return (
      <div className='error-entry'>
        <ErrorAvatar error={error} />
        <div className='error-entrycontent'>
          <ErrorNumber error={error} />
          <ErrorTitle error={error} />
          <ErrorUsername error={error} />
        </div>
      </div>
    )
  }
});

var ErrorAvatar = React.createClass({

  render: function() {
    return (
      <div className='error-avatar'><img src={this.props.error.user.avatar_url} alt='Error Avatar'/></div>
    )
  }
});

var ErrorNumber = React.createClass({
  
  render: function() {
    return (
      <span className='error-number'>#{this.props.error.number}</span>
    )
  }
});

var ErrorTitle = React.createClass({
  
  render: function() {
    return (
     <h3 className='error-title'>{this.props.error.title}</h3>
    )
  }
});

var ErrorUsername = React.createClass({

  render: function() {
    return (
      <div className='error-username'>opened by <span className='error-userlink'>{this.props.error.user.login}</span></div>
    )
  }
});

module.exports = ErrorClass;
