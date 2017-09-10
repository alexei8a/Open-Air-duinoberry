# email-sending
Email sending module

# Install
```console
npm install email-sending --save
```
# Using

## In your config/application.json

```json
{
    "email": {
        "login": "admin@yandex.ru",
        "password": "bbMe1jQe6MgNML6",
        "smtp": "smtp.yandex.ru"
    }
}
```

## In your controller

```js
var email = require('email-sending');

sms.send('text mail', 'to email', 'subject);
```