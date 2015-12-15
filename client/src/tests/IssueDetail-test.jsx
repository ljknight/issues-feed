var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var expect = require('expect');
var IssueDetailContainer = require('../components/IssueDetail/IssueDetailContainer.jsx');
var Title = require('../components/Title.jsx');
var IssueDetail = require('../components/IssueDetail/IssueDetail.jsx');
var CommentFeed = require('../components/IssueDetail/CommentFeed.jsx');
var CommentEntry = require('../components/IssueDetail/CommentEntry.jsx');
var issuesTestData = require('./issuesstub.js');
var commentsTestData = require('./commentsstub.js');

describe('Issue Detail', function () {

  it('renders a title', function () {
    var title = ReactTestUtils.renderIntoDocument(
        <Title />
    );

    var h1 = ReactTestUtils.findRenderedDOMComponentWithTag(
        title, 'h1'
    );

    expect(h1.textContent).toEqual('npm/issues');
    
  }); // Closes `renders a title`

  it('displays 1 issue', function () {

    var issuedetail = ReactTestUtils.renderIntoDocument( <IssueDetail issue={issuesTestData} /> );
    
    var contents = ReactTestUtils.scryRenderedDOMComponentsWithClass(issuedetail, 'issuedetail');

    expect(contents.length).toEqual(1);

  }); // Closes `displays 1 issue`

  it('displays avatar, title, username, and summary', function () {
    var issuedetail = ReactTestUtils.renderIntoDocument(
      <IssueDetail issue={issuesTestData} />
    );

    var avatar = ReactTestUtils.findRenderedDOMComponentWithClass(
      issuedetail, 'issuedetail-avatar'
    );

    var title = ReactTestUtils.findRenderedDOMComponentWithClass(
      issuedetail, 'issuedetail-title'
    );

    var username = ReactTestUtils.findRenderedDOMComponentWithClass(
      issuedetail, 'issuedetail-username'
    );

    var summary = ReactTestUtils.findRenderedDOMComponentWithClass(
      issuedetail, 'issuedetail-summary'
    );

    expect(issuedetail).toExist();
    expect(avatar).toExist();
    expect(title).toExist();
    expect(username).toExist();
    expect(summary).toExist();

  }); // Closes `displays avatar, title, username, and summary`

    it('displays comments', function () {

    var commentfeed = ReactTestUtils.renderIntoDocument(
      <CommentFeed comments={commentsTestData} />
    );

    var contents = ReactTestUtils.scryRenderedDOMComponentsWithClass(commentfeed, 'commentfeed-entry');

    expect(contents.length).toEqual(5)

  }); // Closes `displays comments`

}); // Closes `describe 'Home`
