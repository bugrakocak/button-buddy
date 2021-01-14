const Mailchimp = require('mailchimp-api-v3');
const validator = require('email-validator');

const mailchimp = new Mailchimp(process.env.MAILCHIMP_API);

exports.handler = async function (event) {
  const { email } = JSON.parse(event.body);

  const isValidEmail = validator.validate(email);

  if (!isValidEmail) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message: 'Invalid email' }),
    };
  }

  try {
    const result = await mailchimp.post(`/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`, {
      email_address: email,
      status: 'subscribed',
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message: result }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message: error }),
    };
  }
};
