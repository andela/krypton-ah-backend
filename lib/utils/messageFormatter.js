const formatErrorMessage = (msgArr) => {
  const message = {};
  const messageSpliter = arr => arr.split(' ')[0];
  msgArr.forEach((msg) => {
    if (!message[messageSpliter(msg)]) {
      message[messageSpliter(msg)] = [msg];
    } else {
      message[messageSpliter(msg)].push(msg);
    }
  });
  return message;
};

module.exports = formatErrorMessage;
