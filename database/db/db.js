import mongoose from 'mongoose';
import dotenv from 'dotenv';
import transaction from '../models/TransactionModel.js';

dotenv.config();

const db = {};
db.mongoose = mongoose;
db.url = process.env.DB_CONNECTION;
db.transaction = transaction(mongoose);

export { db };
