import validator from 'email-validator';

const isLocalHost = window.location.host.includes('localhost');

const URL = `${isLocalHost ? 'http://localhost:8888/' : ''}.netlify/functions/subscribe`;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('newsletterForm');

  if (!form) {
    return;
  }

  const showMessage = (type, message) => {
    const messageElements = document.getElementsByClassName('js-newsletter-message');
    const successElement = Array.from(messageElements).find(
      (el) => el.getAttribute('data-message-type') === 'success',
    );
    const failElement = Array.from(messageElements).find(
      (el) => el.getAttribute('data-message-type') === 'fail',
    );

    if (type === 'success') {
      successElement.hidden = false;
      failElement.hidden = true;
      form.remove();
    }

    if (type === 'fail') {
      successElement.hidden = true;
      failElement.hidden = false;
      failElement.textContent = `Subscription failed: ${message}`;
    }
  };

  const postData = async (data = {}) => {
    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    return response.json();
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.elements.EMAIL.value;
    const hiddenInputChecked = form.elements.HIDDEN.checked;

    if (!email) {
      return;
    }

    if (hiddenInputChecked) {
      form.remove();
      return;
    }

    const isValidEmail = validator.validate('test@email.com');

    if (!isValidEmail) {
      showMessage('fail', 'Invalid email');
      return;
    }

    try {
      const response = await postData({
        email,
      });

      if (response.message.statusCode === 200) {
        showMessage('success');
      }

      if (response.message.statusCode === 400) {
        showMessage('fail', response.message.title);
      }
    } catch (error) {
      showMessage('fail', error);
    }
  });
});
