var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jQuery');
var Link = require('react-router').Link;
var Spinner = require('react-spin');

var Title = require('./../Title.jsx');
var IssueFeed = require('./IssueFeed.jsx');
var Constants = require('./../../Constants.js');
var APIkey = require('./../../APIkey.js');

var HomeContainer = React.createClass({

  getInitialState: function(){
    return {
      issues: [],
      prevIssues: [],
      data: [],
      page: this.props.params.page || 1,
      lastPage: ''
    };
  },

  componentDidMount: function() {
    this.paginate(this.state.page);
  },

  // Scroll to top after page change
  componentDidUpdate: function() {
    ReactDOM.findDOMNode(document.body).scrollTop = 0;
  },

  paginate:function(page) {
    var nextPage = Number(this.state.page) + 1;
    var prevPage = Number(this.state.page) - 1;
    var prevAPIPage;
    var APIpage;

    // Step tells us how many API pages back we need to look
    var step = Math.ceil(page/6);

    if (page === 1) {
      this.getIssues(page);
      return;
    } else if (page === 'next') {
      prevAPIPage = nextPage - step;
      APIpage = nextPage - step + 1;
      // Set new current page
      this.setState({
        page: nextPage
      });

    } else if (page === 'prev') {
      prevAPIPage = prevPage - step;
      APIpage = prevPage - step + 1;
      // Set new current page
      this.setState({
        page: prevPage
      });

    } else {        
      prevAPIPage = page - step;
      APIpage = page - step + 1;
      // Set new current page
      this.setState({
        page: page
      });
    }
    
    // Get issues needed for page 
    this.getPrevIssues(prevAPIPage, APIpage);
  },

  getPrevIssues: function(prevAPIPage, APIpage) {
    // Get previous page's issues in background for pagination
    $.ajax({
      url: 'https://api.github.com/repos/npm/npm/issues?page=' + APIpage + '&' + APIkey,
      dataType: 'json',
      success: function(data, status, request) {
        if (this.isMounted()) {
          this.setState({
            prevIssues: data
          });
        }
        // Chained call to catch both async responses
        this.getIssues(APIpage);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getIssues: function(APIpage) {
    // Get current page's issues for displaying
    APIpage = APIpage || this.state.page;
    
    $.ajax({
      url: 'https://api.github.com/repos/npm/npm/issues?page=' + APIpage + '&' + APIkey,
      dataType: 'json',
      success: function(data, status, request) {
        // var header = request.getResponseHeader('Link');
        // var lastPage = this.parseHeaders(header).last;

        if (this.isMounted()) {
          this.setState({
            data: data,
            // lastPage: this.findLastPage(lastPage)
          });
          this.showIssues(data);
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  // Credit: https://gist.github.com/niallo/3109252
  // parseHeaders: function(header) {
  //   if (header.length === 0) {
  //     throw new Error("input must not be of zero length");
  //   }

  //   // Split parts by comma
  //   var parts = header.split(',');
  //   var links = {};
    
  //   // Parse each part into a named link
  //   parts.forEach(function(p) {
  //     var section = p.split(';');
  //     if (section.length != 2) {
  //       throw new Error("section could not be split on ';'");
  //     }
  //     var url = section[0].replace(/<(.*)>/, '$1').trim();
  //     var name = section[1].replace(/rel="(.*)"/, '$1').trim();
  //     links[name] = url;
  //   });

  //   return links;
  
  // },

  // findLastPage: function(lastLink) {
  //   var matches = lastLink.match(/page=([^&]*)/);
  //   return matches[1];
  // },

  // Load 25 per page
  showIssues: function(currAPIPageIssues) {  
    var page = this.state.page;
    var currentIssues = [];

    if (page === 1) {
      for (var i = 0; i < 25; i++) {
        currentIssues.push(currAPIPageIssues[i]);
      }
    } else {
      // Get previous API page's issues for displaying
      var prevAPIPageIssues = this.state.prevIssues;
      console.log(prevAPIPageIssues, currAPIPageIssues)

      // Patterns for pagination
      var issuesPerPage = {
        1: {
          prevPage: [0,24]
        },
        2: {
          prevPage: [25,29],
          page: [0,19]
        },
        3: {
          prevPage: [20,29],
          page: [0,14]
        },
        4: {
          prevPage: [15,29],
          page: [0,9]
        },
        5: {
          prevPage: [10,29],
          page: [0,4]
        },
        0: {
          prevPage: [5,29]
        }
      };

      // Lookup tells us which items on those pages we need
      var lookup = issuesPerPage[page % 6];
      console.log(page, page % 6)
      
      var get25 = function(obj) {
        var prevPageArr = obj.prevPage;
        var pageArr = obj.page;

        // First add issues from prev API page
        for (var i = prevPageArr[0]; i <= prevPageArr[1]; i++) {
          currentIssues.push(prevAPIPageIssues[i]);
        }

        // Add issues from current API page
        if (pageArr) {
          for (var j = pageArr[0]; j <= pageArr[1]; j++) {
            currentIssues.push(currAPIPageIssues[j]);
          }
        }
      };

      get25(lookup);
    }

    // Set new issues to render page
    this.setState({
      issues: currentIssues
    });
  },

  render: function() { 
    var $loading = $('.spinner');
    var currPage = Number(this.state.page);

    // Hide prev link on first page & next on last page
    if (currPage === 1) {
      $('.prev').hide();
    } else if (currPage === this.state.lastPage) {
      $('.next').hide();
    }

    // Spinner
    $(document)
      .ajaxStart(function () {
        $loading.show();
      })
      .ajaxStop(function () {
        $loading.hide();
      });

    return (
      <div className='home-page'>
        <Title />
        <div className='issuefeed-container'>
          <div className='spinner'>
            <Spinner config={Constants.spinCfg} />
          </div>
          <IssueFeed issues={this.state.issues} />
          <nav className='pagination-nav'>
            <ul className='pagination'>
              <li className='prev' onClick={this.paginate.bind(this,'prev')}><Link to={`/page/${currPage - 1}`}> Previous</Link></li>
              <li className='next' onClick={this.paginate.bind(this, 'next')}><Link to={`/page/${currPage + 1}`}> Next</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
});

module.exports = HomeContainer;

