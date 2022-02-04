const loggingLevel = process.env.LOGGING_LEVEL;
const { util } = require('reuse-api-utility');
const deletePostSystemUser = require('./delete-system-user');
const getSystemUser = require('./get-system-user');
const getSystemUserById = require('./get-system-user-by-id');
const getPatchSystemUser = require('./patch-system-user');
const getPostSystemUser = require('./post-system-user');

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
