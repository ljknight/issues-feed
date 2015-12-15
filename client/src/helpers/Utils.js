var $ = require('jQuery');

var Utils = {

  // Find @mentions and replace with link
  findMentions: function(text) {
    if (text.indexOf('@') !== -1) {
      // Find words that begin with @
      var reg = /(?:^|\W)@(\w+)(?!\w)/g;
      text = text.replace(reg, function(_, $1, $2) {

        var route = 'http://www.github.com/' + $1;
        return '<a href=' + route + '>' + _ + '</a>';
      });

      return $.parseHTML(text);
    } else {
      return text;
    }
  },

  // Trim text to 140 characters
  trimSummary: function(input) {
    var body = input;
    var summary = '';
    var endIndex;

    if (body.length <= 140) {
      summary = body;
    } else {

      // Check for newlines, space and punctuation
      var re = /(\r\n|\n|\r|\s|[.,\/!$%\^&\*;{}=\`~()])/;

      var check = body[140].match(re);

      // If 140th char is not a newline or space, loop down from end to find closest clean break point
      if (!check) {
        for (var i = 139; i >= 0; i--) {
          if (body[i].match(re)) {
            endIndex = i;
            break;
          }
        }
      } else {
        endIndex = 139;
      }
    }

    // Add each character to summary
    for (var j = 0; j <= endIndex; j++) {
      summary += body[j];
    }

    return summary;
  },

  loadSpinner: function() {
    var $loading = $('.spinner');

    $(document)
      .ajaxStart(function () {
        $loading.show();
      })
      .ajaxStop(function () {
        $loading.hide();
      });
  }

};

module.exports = Utils;
