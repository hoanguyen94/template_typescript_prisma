import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isArray } from 'class-validator';

@Injectable()
export class ParseAddUUIDPipe implements PipeTransform<any> {
  constructor(
    private readonly fieldName: string,
    private readonly newFieldName: string,
  ) {}
  transform(value: any, metadata: ArgumentMetadata) {
    const uuidField = this.fieldName;

    if (!value) {
      return value;
    }
    if (isArray(value)) {
      // const newArray = value.map((obj) => this.addUUID(obj));
      const uuid = ParseAddUUIDPipe.createUUID(value[0][uuidField]);
      const newArray = value.map((order: Record<string, any>) =>
        this.addUUID(order, uuid),
      );
      return newArray;
    }
    if (value.Data) {
      const data = this.addUUID(value.Data);
      return { ...value, Data: data };
    }
    if (value.createOrderDto) {
      let data: Record<string, any> | Record<string, any>[];
      if (isArray(value.createOrderDto)) {
        const uuid = ParseAddUUIDPipe.createUUID(
          value.createOrderDto[0][uuidField],
        );
        data = value.createOrderDto.map((order: Record<string, any>) =>
          this.addUUID(order, uuid),
        );
      } else {
        data = this.addUUID(value.createOrderDto);
      }
      return { ...value, createOrderDto: data };
    }

    return this.addUUID(value);
  }

  private addUUID(
    value: Record<string, any>,
    uuid?: string,
  ): Record<string, any> {
    const field = this.fieldName;
    const newField = this.newFieldName;
    if (value[field] && !value[newField]) {
      if (uuid) {
        value[newField] = uuid;
      } else {
        value[newField] = ParseAddUUIDPipe.createUUID(value[field]);
      }
      return value;
    }
    return value;
  }

  static createUUID(value: string) {
    try {
      const now = new Date();
      return `${value}${now.toJSON()}`;
    } catch (error) {
      throw new BadRequestException('Adding UUID failed', {
        cause: error,
        description: error.message,
      });
    }
  }
}
