
// import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

// @Injectable()
// export class FileSizeValidationPipe implements PipeTransform {
//   transform(value: any, metadata: ArgumentMetadata) {
//     // "value" is an object containing the file's attributes and metadata
//     console.log({value, metadata]});
//     const oneKb = 1000;
//     // return value.size < oneKb;
//     return true
//   }
// }



// export abstract class FileValidator<TValidationOptions = Record<string, any>> {
//   constructor(protected readonly validationOptions: TValidationOptions) {}

//   /**
//    * Indicates if this file should be considered valid, according to the options passed in the constructor.
//    * @param file the file from the request object
//    */
//   abstract isValid(file?: any): boolean | Promise<boolean>;

//   /**
//    * Builds an error message in case the validation fails.
//    * @param file the file from the request object
//    */
//   abstract buildErrorMessage(file: any): string;
// }
