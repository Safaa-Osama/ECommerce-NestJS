import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"



export class ResponceInterceptor<T> implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                return {
                    success: true,
                    statusCode: 200,
                    message: "Success",
                    data
                }
            })
        )
    }
}