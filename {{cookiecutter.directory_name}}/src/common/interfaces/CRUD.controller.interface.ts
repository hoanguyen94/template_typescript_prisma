import { Prisma } from '@prisma/client';

export interface CRUDController<T> {
  create(data: any): Promise<T | T[] | Prisma.BatchPayload>;
  findById(id: string): Promise<T>;
  findMany(...data: any): Promise<T | T[]>;
  updateById(id: string, update: any): Promise<T>;
  updateMany?(body: any): Promise<Prisma.BatchPayload>;
  deleteById(id: string): Promise<T>;
  deleteMany(
    conditions: any,
  ): Promise<Prisma.BatchPayload> | Promise<Prisma.BatchPayload[]>;
}
