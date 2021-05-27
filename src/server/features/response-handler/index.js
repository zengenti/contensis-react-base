/* eslint-disable no-console */
import { ResponseMethod } from './types';

/**
 * Web Application Response handler, sends a prepared express js response
 * with the supplied content sending in the specified manner
 * @param {response} request express js request object
 * @param {response} response express js response object
 * @param {string | object} content the content to send in the response body
 * @param {function} send the response function to call e.g res.send() res.json() res.end()
 */
const handleResponse = (
  request,
  response,
  content,
  send = ResponseMethod.send
) => {
  // console.log('---', response.statusCode, '---');
  response[send](content);
};

export default handleResponse;
