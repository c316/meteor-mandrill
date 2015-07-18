// Set MANDRILL_API_USER and MANDRILL_API_KEY to your Mandrill credentials.
// You'll receive emails as part of the test.

Tinytest.add('sendTemplate', function (test) {

  Mandrill.config({
    username: process.env.MANDRILL_API_USER,
    key: process.env.MANDRILL_API_KEY
  });
  
  var result = Mandrill.sendTemplate({
    template_name: 'meteor-package-test',
    template_content: [
      {
          name: 'body',
          content: 'Replacing mc:edit worked'
      }
    ],
    message: {
        subject: 'Meteor package test',
        from_email: process.env.MANDRILL_API_USER,
        to: [
            { email: process.env.MANDRILL_API_USER }
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
