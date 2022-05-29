// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = "ACf7b1e67c19f45351473650b3907277c0";
const authToken = "7b6c219a057c62b8397b6c20fa28cc54";
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+12182923587',
     to: '+918921556978'
   })
  .then(message => console.log(message.sid));
