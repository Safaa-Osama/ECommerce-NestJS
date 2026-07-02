
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log({value, metadata});
    // "value" is an object containing the file's attributes and metadata
    const oneKb = 1000;
    return true;
  }
}
