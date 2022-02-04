exports.handler = async (event, context, callback) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    console.log('GET Role called');
    return callback(null, {});
  } catch (err) {
    console.log('Error get role:', err);
    return callback(null, err);
  }
};
