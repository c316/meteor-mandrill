Mandrill for Meteor
===================

Meteor package for sending email via [Mandrill's HTTP POST API](https://mandrillapp.com/api/docs/).

To use the [`mandrill-api` npm package](https://www.npmjs.com/package/mandrill-api), see [mjmasn:mandrill](https://atmospherejs.com/mjmasn/mandrill).

NOTE: Mandrill used to offer free accounts that could send up to 12,000 emails per month, but that is [no longer the case](http://www.slant.co/topics/136/viewpoints/1/sections/15/pending).


## Installation

    $ meteor add wylio:mandrill


### Example Usage for SMTP email

`Mandrill.send` simply sets the MAIL_URL environment variable, then calls Meteor's `Email.send`.

```js
// in server code
Meteor.startup(function() {
    Mandrill.config({
        username: "YOUR_MANDRILL_USERNAME",
        key: "YOUR_MANDRILL_API_KEY"
        // port: 587  // 465 by default for secure SMTP
    });
});

this.sendEmail = function(to, subject, htmlText) {
    return Mandrill.send({
        from: /* your app's from email ,e.g. Accounts.emailTemplates.from */,
        to: to,
        subject: subject,
        html: htmlText
    });
};
```

### Example API usage

Read more on how to use merge tags in the [Mandrill docs](https://mandrill.zendesk.com/hc/en-us/articles/205582487-How-do-I-use-merge-tags-to-add-dynamic-content-).

The `sendTemplate` method uses Mandrill's `https://mandrillapp.com/api/1.0/messages/send-template.json` call.

Find out what else you can send, including how to send [mc:edit](https://mandrill.zendesk.com/hc/en-us/articles/205582497-How-do-I-add-dynamic-content-using-editable-regions-in-my-template-) regions, by reviewing the [Mandrill API documentation](https://mandrillapp.com/api/docs/messages.JSON.html#method=send-template).

Mandrill can now use Handlebars instead of the old-style MailChimp `*|MERGEVARS|*`. Read more on [Handlebars in Mandrill](https://mandrill.zendesk.com/hc/en-us/articles/205582537-Using-Handlebars-for-dynamic-content).


```js
// server code
Mandrill.sendTemplate({
    key: "YOUR_MANDRILL_API_KEY", // optional, if you set it in with Meteor.Mandril.config() already
    template_name: "YOUR_TEMPLATE_SLUG_NAME",
    template_content: [
      {
          name: 'body',
          content: 'Breaking news! Federal Agents Raid Gun Shop, Find Weapons'
      }
    ],
    message: {
        subject: 'Meteor Newsletter',
        from_email: /* your app's from email ,e.g. Accounts.emailTemplates.from */,
        to: [
            { email: 'email@example.com' }
        ],
        // global merge variable in the *|VARIABLE|* format
        global_merge_vars: [
            {
                name: 'var1',
                content: 'Global Value 1'
            }
        ],
        // per-recipient merge vars
        merge_vars: [
            {
                rcpt: 'email@example.com',
                vars: [
                    {
                        name: 'fname',
                        content: 'John'
                    },
                    {
                        name: 'lname',
                        content: 'Smith'
                    }
                ]
            }
        ]
    }
});
```

For now, errors are caught by the package and dumped to the console. This is likely to change in the future.


## Deprecation notices

`Meteor.Mandrill` is now deprecated. Use the `Mandrill` global.
