import { Request, Response } from 'express';
import { ResponseMethod } from './types';
/**
 * Web Application Response handler, sends a prepared express js response
 * with the supplied content sending in the specified manner
 * @param {response} request express js request object
 * @param {response} response express js response object
 * @param {string | object} content the content to send in the response body
 * @param {"send" | "json" | "end"} send the response function to call e.g res.send() res.json() res.end()
 */
declare const handleResponse: (request: Request, response: Response, content: any, send?: keyof typeof ResponseMethod) => void;
export default handleResponse;
