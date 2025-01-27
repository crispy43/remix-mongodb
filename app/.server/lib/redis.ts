import Redis from 'ioredis';

import { ToJson } from '~/common/types';

import { getEnv } from './utils';

const REDIS_URI = getEnv('REDIS_URI');

// * Redis Database
// TODO: 사용하는 Redis DB 인덱스에 따라 RedisDB enum을 변경
export enum RedisDB {
  DEFAULT = 0,
}

export const redis = (db?: RedisDB) => new Redis(`${REDIS_URI}/${db ?? RedisDB.DEFAULT}`);

export const getRedisJson = async <T = any>(key: string, db?: RedisDB) => {
  const data = await redis(db).get(key);
  return data ? (JSON.parse(data) as ToJson<T>) : null;
};

export const setRedisJson = async (
  key: string,
  value: any,
  db?: RedisDB,
  expireTime?: number, // 만료시간 (초)
) => {
  return expireTime
    ? await redis(db).set(key, JSON.stringify(value), 'EX', expireTime)
    : await redis(db).set(key, JSON.stringify(value));
};

export const delRedis = async (key: string, db?: RedisDB) => {
  return await redis(db).del(key);
};
