var ReactDOM = require('react-dom');
var React = require('react');

// React Router
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var createHistory = require('history/lib/createHashHistory');

// Modules
var HomeContainer = require('./src/components/Home/HomeContainer.jsx');
var IssueDetailContainer = require('./src/components/IssueDetail/IssueDetailContainer.jsx');

// Set up React Router
var history = createHistory({
  queryKey: false
});

ReactDOM.render(
  <Router history={history}>
    <Route path='/' component={HomeContainer}>
    </Route>
    <Route path='/page/:page' component={HomeContainer} handler={HomeContainer}>
    </Route>
    <Route path='issue/:issueId' component={IssueDetailContainer} handler={IssueDetailContainer}>
    </Route>
    <Route path='*' component={HomeContainer} handler={HomeContainer} />
  </Router>,
  document.getElementById('app')
);
