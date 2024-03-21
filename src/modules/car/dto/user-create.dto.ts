import Joi from "joi";

export const createUserSchema = Joi.object<CreateCarDto, true>({
  index: Joi.string().required(),
  ownerId: Joi.number().integer().required(),
});


export type CreateCarDto = {
  index: string;
  ownerId: number;
};
