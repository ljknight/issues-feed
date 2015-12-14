var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jQuery');
var Link = require('react-router').Link;
var Spinner = require('react-spin');

var Title = require('./../Title.jsx');
var IssueFeed = require('./IssueFeed.jsx');
var Pagination = require('./Pagination.jsx');
var Constants = require('./../../Constants.js');
var APIkey = require('./../../APIkey.js');

var HomeContainer = React.createClass({

  getInitialState: function(){
    return {
      issues: [],
      prevIssues: [],
      data: [],
      page: this.props.params.page || 1
    };
  },

  componentDidMount: function() {
    var currPage = this.state.page;
    var prevPage = this.state.page - 1;
    
    if (currPage > 1) {
      // Gets prev page issues & calls getIssues to handle async responses
      this.getPrevIssues(prevPage);
    } else {
      this.getIssues();
    }

  },

  // Scroll to top after page change
  componentDidUpdate: function() {
    ReactDOM.findDOMNode(document.body).scrollTop = 0;
  },

  getPrevIssues: function(APIpage) {
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
        this.getIssues();
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
        if (this.isMounted()) {
          this.setState({
            data: data
          });
          this.showIssues(data);
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  paginate:function(page) {
    var nextPage = Number(this.state.page) + 1;
    var prevPage = Number(this.state.page) - 1;

    if (page === 'next') {
      this.getIssues(nextPage);
      // Set new current page
      this.setState({
        page: nextPage
      });
    } else if (page === 'prev') {
      this.getIssues(prevPage);
      // Set new current page
      this.setState({
        page: prevPage
      });
    }

  },

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
      var prevPage = page-1;
      var prevAPIPageIssues = this.state.prevIssues;

      // Pattern for pagination
      var dictionary = {
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
        6: {
          prevPage: [5,29]
        }
      };

      var lookup = dictionary[page % 6];
      
      var get25 = function(obj) {
        var prevPageArr = obj.prevPage;
        var pageArr = obj.page;

        // First add issues from prev API page
        for (var i = prevPageArr[0]; i <= prevPageArr[1]; i++) {
          currentIssues.push(prevAPIPageIssues[i]);
        }

        // Add any issues from current API page
        if (pageArr) {
          for (var j = pageArr[0]; j <= pageArr[1]; j++) {
            currentIssues.push(currAPIPageIssues[j]);
          }
        }
      };

      get25(lookup);
      console.log(currentIssues)

    }

    // Set new issues to render page
    this.setState({
      issues: currentIssues
    });
  },

  render: function() { 
    var $loading = $('.spinner');
    var currPage = Number(this.state.page);

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
              <li onClick={this.paginate.bind(this,'prev')}><Link to={`/page/${currPage - 1}`}> Previous</Link></li>
              <li onClick={this.paginate.bind(this, 'next')}><Link to={`/page/${currPage + 1}`}> Next</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
          // <Pagination getIssues={this.getIssues} page={this.state.page} data={this.state.data} />

});

module.exports = HomeContainer;

