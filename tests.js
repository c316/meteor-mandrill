// Set MANDRILL_API_USER and MANDRILL_API_KEY to your Mandrill credentials.
// You'll receive emails as part of the test.

Mandrill.config({
  username: process.env.MANDRILL_API_USER,
  key: process.env.MANDRILL_API_KEY
});


Tinytest.add('users.ping', function (test) {
  try {
    var result = Mandrill.users.ping();
    test.equal(result.data, 'PONG!');
  } catch (error) {
    test.fail('Invalid API key' + error.toString());  // TODO should bail out here, but unclear how to do that from Tinytest
  }
});

Tinytest.add('templates.add', function (test) {

  var result = Mandrill.templates.add({
    name: 'Meteor package test template',
    from_email: process.env.MANDRILL_API_USER,
    from_name: 'Meteor package tester',
    subject: 'Testing Meteor package wylio:mandrill',
    code: '<html><body><p mc:edit="body">Test: is this mc:edit section replaced?</p><p>Test: is this merge var replaced? *|REPLACEME|*</p></body></html>',
    text: 'Text part of the email',
    publish: true
  });

  test.equal(result.data.slug, 'meteor-package-test-template');
});

Tinytest.add('templates.render', function (test) {
  var result = Mandrill.templates.render({
    template_name: 'meteor-package-test-template',
    template_content: [
      {
        name: 'body',
        content: 'Replacing mc:edit worked'
      }
    ],
    merge_vars: [
      {
        name: 'REPLACEME',
        content: 'Replacing global merge var worked.'
      }
    ]
  });
  test.equal(result.data.html, '<html><body><p>Replacing mc:edit worked</p><p>Test: is this merge var replaced? Replacing global merge var worked.</p></body></html>');
});


Tinytest.add('messages.sendTemplate', function (test) {

  var result = Mandrill.messages.sendTemplate({
    template_name: 'meteor-package-test-template',
    template_content: [
      {
        name: 'body',
        content: 'Replacing mc:edit worked'
      }
    ],
    message: {
      subject: 'Meteor package test philly',
      from_email: process.env.MANDRILL_API_USER,
      to: [
        {email: process.env.MANDRILL_API_USER}
      ],
      global_merge_vars: [
        {
          name: 'REPLACEME',
          content: 'Replacing global merge var worked.'
        }
      ]
    }
  });
  test.equal(result.data[0].email, process.env.MANDRILL_API_USER);
  test.equal(result.data[0].status, 'sent');
});


// test async calls too
Tinytest.addAsync('templates.delete', function (test, done) {

  Mandrill.templates.delete({
    name: 'Meteor package test template'
  }, function callback(error, result) {
    if (error) {
      test.fail(error.toString());
    } else {
      test.equal(result.data.slug, 'meteor-package-test-template');
    }
    done();
  });

});

// templates.search-time-series is laggy - it won't return anything for a minute or two after sending the first emails matching the query