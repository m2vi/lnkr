import type { NextApiRequest, NextApiResponse } from 'next';
import get from '../../utils/get';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const raw = JSON.parse(Buffer.from(Object.freeze(req.query).send.toString(), 'base64').toString('utf-8'));
    if (raw.auth !== "morbin'") throw Error();

    const key = raw.key;
    const data = JSON.parse(raw.data);

    await get.save(key, data);

    res.status(200).send('OK');
  } catch (error) {
    res.status(500).send('ERR');
  }
}
