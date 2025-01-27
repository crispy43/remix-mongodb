/* eslint-disable no-var */
import type { Connection } from 'mongoose';
import mongoose from 'mongoose';

import { ToJson } from '~/common/types';

import { getEnv } from './utils';

declare module 'mongoose' {
  interface Document {
    toJSON(): ToJson<this>;
  }
}

// * MongoDB Database
// TODO: 사용하는 MongoDB 데이터베이스 이름에 따라 Enum과 Connection을 추가
export enum MongoDB {
  DB = 'db',
}

const MONGODB_URI = getEnv('MONGODB_URI');

export const db: Connection = mongoose.createConnection(`${MONGODB_URI}/${MongoDB.DB}`, {
  bufferCommands: true,
  // authSource: 'admin', // 만약 인증 소스가 admin DB라면 추가
});
