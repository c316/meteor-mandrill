Mandrill for Meteor
===============

Meteor package for sending email via Mandrill

##  Installation

    $ meteor add wylio:mandrill


### Example Usage for SMTP email
    # in server code
    Meteor.startup(function() {
        return Meteor.Mandrill.config({
            username: "YOUR_MANDRILL_USERNAME",
            key: "YOUR_MANDRILL_API_KEY"
        });
    });

    this.sendEmail = function(to, subject, htmlText) {
        return Meteor.Mandrill.send({
            to: to,
            from: fromEmail,
            subject: subject,
            html: htmlText
        });
    };

### Example API usage
 Read more on how to use merge tags in the [Mandrill docs.](https://mandrill.zendesk.com/hc/en-us/articles/205582487-How-do-I-use-merge-tags-to-add-dynamic-content-)

The `sendTemplate` method uses Mandrill's `https://mandrillapp.com/api/1.0/messages/send-template.json` call.

Find out what else you can send, including how to send [mc:edit](https://mandrill.zendesk.com/hc/en-us/articles/205582497-How-do-I-add-dynamic-content-using-editable-regions-in-my-template-) regions, by reviewing the [Mandrill API documentation.](https://mandrillapp.com/api/docs/messages.JSON.html#method=send-template)

    #server code
    Meteor.Mandrill.sendTemplate({
        "key": "YOUR_MANDRILL_API_KEY", // optional, if you set it in with Meteor.Mandril.config() already
        "template_name": "YOUR_TEMPLATE_SLUG_NAME",
        "template_content": [
          {}
        ],
        "message": {
            "global_merge_vars": [
                {
                    "name": "var1",
                    "content": "Global Value 1"
                }
            ],
            "merge_vars": [
                {
                    "rcpt": "email@example.com",
                    "vars": [
                        {
                            "name": "fname",
                            "content": "John"
                        },
                        {
                            "name": "lname",
                            "content": "Smith"
                        }
                    ]
                }
            ],
            "to": [
            {"email": email@example.com}
            ]
        }
    });
