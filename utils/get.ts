import mongoose from 'mongoose';
import lnkrSchema from '../models/lnkrSchema';
import { fingerprint } from './fingerprint';

class Get {
  async run() {
    const data = fingerprint();

    const bend = JSON.parse(Buffer.from(await (await fetch('/api/debug')).json(), 'base64').toString('utf-8'));

    return {
      ...bend,
      ...data,
    };
  }

  async save(key: string, data: any) {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: 'smarthub',
      autoIndex: true,
    });

    const doc = new lnkrSchema({
      key,
      data,
    });

    await doc.save();

    return doc;
  }
}

const get = new Get();
export default get;
