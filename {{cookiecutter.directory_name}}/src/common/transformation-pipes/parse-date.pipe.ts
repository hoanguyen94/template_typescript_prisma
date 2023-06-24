import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isArray } from 'class-validator';

@Injectable()
export class ParseDatePipe implements PipeTransform<any> {
  constructor(private readonly fieldName?: string) {}
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      return value;
    }

    if (typeof value === 'string') {
      return new Date(value);
    }

    if (isArray(value)) {
      const newArray = value.map((obj) => this.transformDate(obj));
      return newArray;
    }
    if (value.Data) {
      const data = this.transformDate(value.Data);
      return { ...value, Data: data };
    }

    if (value.createOrderDto) {
      let data: Record<string, any> | Record<string, any>[];
      if (isArray(value.createOrderDto)) {
        data = value.createOrderDto.map((obj: Record<string, any>) =>
          this.transformDate(obj),
        );
      } else {
        data = this.transformDate(value.createOrderDto);
      }
      return { ...value, createOrderDto: data };
    }

    return this.transformDate(value);
  }

  private transformDate(value: Record<string, any>): Record<string, any> {
    const field = this.fieldName;
    if (value[field]) {
      try {
        value[field] = new Date(value[field]);
        return value;
      } catch (error) {
        throw new BadRequestException('Transformation to date failed', {
          cause: error,
          description: error.message,
        });
      }
    }
    return value;
  }
}
