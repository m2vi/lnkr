import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const lnkrSchema = new Schema({ any: Schema.Types.Mixed }, { strict: false, collection: 'lnkr', versionKey: false });

export default mongoose?.models?.lnkr || mongoose.model('lnkr', lnkrSchema);
