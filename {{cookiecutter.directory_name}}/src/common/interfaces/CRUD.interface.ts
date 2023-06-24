import { Prisma } from '@prisma/client';

export interface CRUDOperations<T> {
  create(data: any): Promise<T>;
  createMany?(data: any[]): Promise<Prisma.BatchPayload> | Promise<any[]>;
  findById(id: number | string): Promise<T>;
  findMany?(conditions?: any): Promise<T[]>;
  findFirst?(conditions?: any): Promise<T>;
  updateById(id: number | string, update: any): Promise<T>;
  updateMany?(conditions: any, update: any): Promise<Prisma.BatchPayload>;
  deleteById(id: number | string): Promise<T>;
  deleteMany(
    conditions?: any,
  ): Promise<Prisma.BatchPayload> | Promise<Prisma.BatchPayload[]>;
}
