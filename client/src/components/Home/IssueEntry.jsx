var React = require('react');

var IssueEntry = React.createClass({
  render: function(){
    return (
      <li className='issue-entry'>
        <span className='issue-number'>#{this.props.issue.number}</span>
        <span className='issue-title'>{this.props.issue.title}</span>
        <ul className='issue-labels'>
          
          {this.props.issue.number}
        </ul>
      </li>
    )
  }
});

// var Avatar = React.createClass({
//   render: function() {
//     return (
//       <div>
//         <ProfilePic username={this.props.username} />
//         <ProfileLink username={this.props.username} />
//       </div>
//     );
//   }
// });

// var ProfilePic = React.createClass({
//   render: function() {
//     return (
//       <img src={'https://graph.facebook.com/' + this.props.username + '/picture'} />
//     );
//   }
// });

// var ProfileLink = React.createClass({
//   render: function() {
//     return (
//       <a href={'https://www.facebook.com/' + this.props.username}>
//         {this.props.username}
//       </a>
//     );
//   }
// });

module.exports = IssueEntry;
