
import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { GenderEnum, ProviderEnum, RoleEnum } from 'src/common/enums/userEnum';

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true,
    strictQuery: true,
    strict: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})
export class User {
    @Prop({ type: String, required: true })
    userName: string;

    @Prop({ type: String, unique: true,  required: true })
    email: string;

    @Prop({ type: Boolean, default: false })
    confirmEmail: Boolean;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String, required: true })
    phone: string;

    @Prop(Number)
    age: number;

    @Prop({ type: String })
    profilePic: string;

    @Prop({ type: String, enum: RoleEnum, default: RoleEnum.user })
    role: RoleEnum;

    @Prop({ type: String, enum: GenderEnum, default: GenderEnum.male })
    gender: GenderEnum;

    @Prop({ type: String, enum: ProviderEnum, default: ProviderEnum.system })
    provider: ProviderEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);

const userModel = MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
export default userModel