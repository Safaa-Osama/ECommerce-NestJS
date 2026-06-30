import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { RoleEnum } from "../enums/userEnum";
import { TokenEnum } from "../enums/tokenEnum";
import { authorizationGuard } from "../guards/authorization";
import { AuthGuard } from "../guards/auth.guard";


export function auth(
    { roles = [RoleEnum.admin, RoleEnum.user],
        tokenType = TokenEnum.accessToken }
        : { roles?: RoleEnum[], tokenType?: TokenEnum } = {}) {
    return applyDecorators(
        SetMetadata('tokenType', tokenType),
        SetMetadata('roles', roles),
        UseGuards(AuthGuard, authorizationGuard)
    );
}