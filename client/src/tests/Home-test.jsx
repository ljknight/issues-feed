var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var expect = require('expect');
var HomeContainer = require('../components/Home/HomeContainer.jsx');
var Title = require('../components/Title.jsx');
var IssueEntry = require('../components/Home/IssueEntry.jsx');
var IssueFeed = require('../components/Home/IssueFeed.jsx');
var issuesTestData = require('./issuesstub.js');

describe('Home', function () {

  it('renders a title', function () {
    var title = ReactTestUtils.renderIntoDocument(
        <Title />
    );

    var h1 = ReactTestUtils.findRenderedDOMComponentWithTag(
        title, 'h1'
    );

    expect(h1.textContent).toEqual('npm/issues');
    
  }); // Closes `renders a title`

  it('displays 25 issues', function () {

    var issuefeed = ReactTestUtils.renderIntoDocument( <IssueFeed issues={issuesTestData}/> );
    
    var contents = ReactTestUtils.scryRenderedDOMComponentsWithClass(issuefeed, 'issuefeed-entry');

    expect(contents.length).toEqual(25);

  }); // Closes `displays 25 issues`

  it('displays avatar, issue number, title, username, and summary', function () {
    var issueentry = ReactTestUtils.renderIntoDocument(
      <IssueEntry issue={issuesTestData[0]} />
    );

    var avatar = ReactTestUtils.findRenderedDOMComponentWithClass(
      issueentry, 'issuefeed-avatar'
    );

    var number = ReactTestUtils.findRenderedDOMComponentWithClass(
      issueentry, 'issuefeed-number'
    );

    var title = ReactTestUtils.findRenderedDOMComponentWithClass(
      issueentry, 'issuefeed-title'
    );

    var username = ReactTestUtils.findRenderedDOMComponentWithClass(
      issueentry, 'issuefeed-username'
    );

    var summary = ReactTestUtils.findRenderedDOMComponentWithClass(
      issueentry, 'issuefeed-summary'
    );

    expect(issueentry).toExist();
    expect(avatar).toExist();
    expect(number).toExist();
    expect(title).toExist();
    expect(username).toExist();
    expect(summary).toExist();

  }); // Closes `displays avatar, issue number, title, username, and summary`

}); // Closes `describe 'Home`
