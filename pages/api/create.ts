import type { NextApiRequest, NextApiResponse } from 'next';
import { validURL } from '../../utils/get.helper';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url, key } = Object.freeze(req.query) as any;

  if (!validURL(url) || !key) return res.status(400).json(null);

  const str = `${url}; ${key}`;

  const base64 = Buffer.from(str, 'utf-8').toString('base64');

  res.status(200).json(encodeURIComponent(base64));
}
