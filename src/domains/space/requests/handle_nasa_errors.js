const { createError } = require('apollo-errors');

const errors = {
  default: createError('NasaAPIError', { message: 'NASA API Error' }),
  429: createError('OverRateLimit', { message: 'Over NASA Rate Limit' }),
};

const handleNasaErrors = ({ statusCode }) => {
  throw new (errors[statusCode] || errors.default)({ data: { statusCode }});
};

module.exports = handleNasaErrors;
