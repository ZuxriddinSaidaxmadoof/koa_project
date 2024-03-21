import Joi from "joi";
import { Role } from "../../../common/enums/role";

export const createUserSchema = Joi.object<CreateUserDto, true>({
  phoneNumber: Joi.string().required(),
  balance: Joi.number().integer().min(0).required(),
  password: Joi.string().required(),
  role: Joi.string().valid("admin", "client").required(),

});

export const updateUserSchema = Joi.object<Partial<CreateUserDto>, true>({
  phoneNumber: Joi.string(),
  balance: Joi.number().integer().min(0),
  password: Joi.string(),
  role: Joi.string().valid("admin","client"),
});

export type CreateUserDto = {
  balance: number;
  role: Role;
  phoneNumber: string;
  password: string;
};
