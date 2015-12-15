var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jQuery');
var Link = require('react-router').Link;
var Spinner = require('react-spin');

var Title = require('./../Title.jsx');
var IssueFeed = require('./IssueFeed.jsx');
var constants = require('./../../helpers/constants.js');
var utils = require('./../../helpers/utils.js');
var APIkey = require('./../../helpers/APIkey.js');

var HomeContainer = React.createClass({

  getInitialState: function(){
    return {
      issues: [],
      prevIssues: [],
      page: Number(this.props.params.page) || 1,
      lastPage: ''
    };
  },

  componentDidMount: function() {
    // Starts chain of otherwise async AJAX calls
    this.getLastPage();
  },

  // Scroll to top after page change
  componentDidUpdate: function() {
    ReactDOM.findDOMNode(document.body).scrollTop = 0;
  },

  getLastPage: function() {
    $.ajax({
      url: 'https://api.github.com/search/issues?q=repo:npm/npm+type:issue+state:open&' + APIkey,
      dataType: 'json',
      success: function(data) {
        var issuesCount = data.total_count;
        this.setState({
          lastPage: Math.ceil(issuesCount/25) + 1
        });

        this.paginate(this.state.page);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  paginate:function(page) {
    // If page doesn't exist
    if (page > this.state.lastPage || page < 1) {
      this.setState({
        issues: [{
          title: 'nothin\' here',
          number: 404,
          user: {
            login: 'sorry',
            avatar_url: 'https://d30y9cdsu7xlg0.cloudfront.net/png/17361-200.png'
          },
          body: '',
          id: 1
        }],
      });
      return;
    }

    var nextPage = Number(this.state.page) + 1;
    var prevPage = Number(this.state.page) - 1;
    var prevAPIPage;
    var APIpage;
    // Step tells us how many API pages back we need to look
    var step;

    var setPages = function(pageToSet) {
      step = Math.ceil(pageToSet/6);
      if (pageToSet % 6 === 1) {
        prevAPIPage = pageToSet - step + 1;        
      } else {
        prevAPIPage = pageToSet - step;
      }
      APIpage = pageToSet - step + 1;
      // Set new current page
      this.setState({
        page: pageToSet
      });
    };

    if (page === 1) {
      this.getIssues(page);
      return;
    } else if (page === 'next') {
      setPages.call(this, nextPage);
    } else if (page === 'prev') {
      setPages.call(this, prevPage);
    } else {     
      setPages.call(this, page);
    }
    
    // Get issues needed for page 
    this.getPrevIssues(prevAPIPage, APIpage);
  },

  getPrevIssues: function(prevAPIPage, APIpage) {
    // Get previous page's issues in background for pagination
    $.ajax({
      url: 'https://api.github.com/repos/npm/npm/issues?order=desc&page=' + prevAPIPage + '&' + APIkey,
      dataType: 'json',
      success: function(data) {
        this.setState({
          prevIssues: data
        });
        // Chained call to catch both async responses
        this.getIssues(APIpage);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getIssues: function(APIpage) {
    $.ajax({
      url: 'https://api.github.com/repos/npm/npm/issues?order=desc&page=' + APIpage + '&' + APIkey,
      dataType: 'json',
      success: function(data) {
        this.showIssues(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  // Load 25 per page
  showIssues: function(currAPIPageIssues) {  
    var page = this.state.page;
    var currentIssues = [];
    // Get previous API page's issues for displaying
    var prevAPIPageIssues = this.state.prevIssues;

    if (page === 1) {
      for (var i = 0; i < 25; i++) {
        currentIssues.push(currAPIPageIssues[i]);
      }
    
    } else {  
      // Lookup tells us which items on those pages we need
      var lookup = constants.issuesPerPage[page % 6];
      
      var get25 = function(obj) {
        var prevPageArr = obj.prevPage;
        var pageArr = obj.page;

        // First add issues from prev API page
        for (var i = prevPageArr[0]; i <= prevPageArr[1]; i++) {
          if (prevAPIPageIssues[i]){
            currentIssues.push(prevAPIPageIssues[i]);
          }
        }

        // Add issues from current API page
        if (pageArr) {
          for (var j = pageArr[0]; j <= pageArr[1]; j++) {
            if (currAPIPageIssues[j]) {
              currentIssues.push(currAPIPageIssues[j]);
            }
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
    var currPage = Number(this.state.page);

    // Hide prev link on first page & next on last page
    if (currPage === 1) {
      $('.prev').hide();
    } else if (currPage === this.state.lastPage) {
      $('.next').hide();
    } else {
      $('.prev').show();
      $('.next').show();
    }

    utils.loadSpinner();

    return (
      <main className='home-page'>
        <Title />
        <div className='issuefeed-container'>
          <div className='spinner'>
            <Spinner config={constants.spinCfg} />
          </div>
          <IssueFeed issues={this.state.issues} />
          <nav className='pagination-nav'>
            <ul className='pagination'>
              <li className='prev' onClick={this.paginate.bind(this,'prev')}><Link to={`/page/${currPage - 1}`}> Previous</Link></li>
              <li className='next' onClick={this.paginate.bind(this, 'next')}><Link to={`/page/${currPage + 1}`}> Next</Link></li>
            </ul>
          </nav>
        </div>
      </main>
    )
  }
});

module.exports = HomeContainer;

