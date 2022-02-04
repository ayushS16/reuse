const getRole = require('./get-role');

exports.handler = (event, context, callback) => {
  try {
    switch (event.httpMethod) {
      case 'GET':
        return getRole.handler(event, context, callback);
      default:
        console.log('Unsupported http method for role API');
        return callback(null, 'Unsupported method');
    }
  } catch (err) {
    return callback(null, err.message);
  }
};
