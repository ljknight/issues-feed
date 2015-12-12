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

/*
var App = React.createClass({
  getInitialState: function(){
    return {
      issues: [],
      // overflow: [],
      // currentLink: 'https://api.github.com/repos/npm/npm/issues?page=1',
      // nextLink: '',
      // prevLink: '',
      // lastLink: '',
      // pageStorage: {}
    };
  },

  componentDidMount: function() {
    this.getIssues();
  },

  getIssues: function() {
    $.ajax({
      url: 'https://api.github.com/repos/npm/npm/issues?page=1',
      dataType: 'json',
      success: function(data, status, request) {
        console.log('data', data)
        // var linkHeader = request.getResponseHeader('Link');
        // this.state.nextLink = this.parseLinkHeader(linkHeader).next;
        // this.pagination(data);
        this.setState({
          issues: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  // parseLinkHeader: function(header) {
  // // Credit: https://gist.github.com/niallo/3109252
  //   if (header.length === 0) {
  //       throw new Error("input must not be of zero length");
  //   }

  //   // Split parts by comma
  //   var parts = header.split(',');
  //   var links = {};
  //   // Parse each part into a named link
  //   for(var i=0; i<parts.length; i++) {
  //       var section = parts[i].split(';');
  //       if (section.length !== 2) {
  //           throw new Error("section could not be split on ';'");
  //       }
  //       var url = section[0].replace(/<(.*)>/, '$1').trim();
  //       var name = section[1].replace(/rel="(.*)"/, '$1').trim();
  //       links[name] = url;
  //   }
  //   return links;
  // },

  // pagination: function(resp) {
  //   var addToIssues = 25 - this.state.issues.length;
  //   var overflowIndex = 0;

  //   // Check if page is already in storage
  //   for (var key in this.state.storage) {
  //     if (key === this.state.currentLink) {
  //       var currentIssues = this.state.storage[this.state.currentLink];
  //       this.setState({
  //         issues: currentIssues
  //       });
  //       return;
  //     }
  //   }
    
  //   // Fill issues up to 25 from overflow
  //   if (this.state.overflow.length > 0) {
  //     for (var i = 0; i < addToIssues; i++) {
  //       this.state.issues.push(this.state.overflow[i]);
  //     }
  //   }

  //   // If there's room, add from AJAX call to issues
  //   addToIssues = 25 - this.state.issues.length;
  //   if (addToIssues > 0) {
  //     for (var j = 0; j < addToIssues; j++) {
  //       this.state.issues.push(resp[j]);
  //       overflowIndex = j;
  //     }
  //   } 

  //   // Push rest into overflow
  //   for (var k = overflowIndex; k < resp.length; k++) {
  //     this.state.overflow.push(resp[k]);
  //   }

  //   // If issues is still less than 25, make new AJAX call on next page and repeat
  //   if (this.state.issues.length < 25) {
  //     this.state.currentLink = this.state.nextLink;
  //     this.getIssues();
  //   }

  //   this.state.pageStorage[this.state.currentLink] = this.state.issues;

  //   this.setState({
  //     issues: this.state.issues,
  //     overflow: this.state.overflow,
  //     storage: this.state.pageStorage
  //   });

  //   console.log(this.state.pageStorage)

  // },
*/
