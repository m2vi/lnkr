import type { NextApiRequest, NextApiResponse } from 'next';
import { getClientIp } from 'request-ip';
import { cfu } from '../../utils/get.helper';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = {
    ip: getClientIp(req),
    accept: cfu(req.headers['accept']),
    acceptLanguage: cfu(req.headers['accept-language']),
    acceptEncoding: cfu(req.headers['accept-encoding']),
  };

  res.status(200).json(Buffer.from(JSON.stringify(data), 'utf-8').toString('base64'));
}
