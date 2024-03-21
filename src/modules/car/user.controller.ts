import { Context, DefaultContext } from "koa";
import { ResonseData } from "../../common/responseData";
import { CreateCarDto, createUserSchema } from "./dto/user-create.dto";
import { checkDto } from "../../lib/cheackDto";
import { UserService } from "./user.service";

export class UserController {
  constructor(private readonly service: UserService) {}

  async getAllUsers(ctx: Context) {
    try {
      const resData = await this.service.findAll()

      ctx.message = resData.message;
      ctx.body = resData;
      ctx.status = resData.statusCode;
    } catch (error: any) {
      const resData = new ResonseData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      ctx.body = resData;
      ctx.status = resData.statusCode;

      return;
    }
  }

  async getOneUser(ctx: Context) {
    try {
    const id = ctx.params.id
    

      const resData = await this.service.findOne(Number(id))

      ctx.message = resData.message;
      ctx.body = resData;
      ctx.status = resData.statusCode;
    } catch (error: any) {
      const resData = new ResonseData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      ctx.body = resData;
      ctx.status = resData.statusCode;

      return;
    }
  }

  async create(ctx: Context) {
    try {
      const dto = ctx.request.body as CreateCarDto;

      checkDto(createUserSchema, dto);

      const resData = await this.service.create(dto);

      ctx.message = resData.message;
      ctx.body = resData;
      ctx.status = resData.statusCode;
    } catch (error: any) {
      const resData = new ResonseData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      ctx.body = resData;
      ctx.status = resData.statusCode;

      return;
    }
  }


  async update(ctx: Context) {
    try {
      const dto = ctx.request.body as CreateCarDto;
      const id = ctx.params.id;

      checkDto(createUserSchema, dto);

      const resData = await this.service.update(dto, +id);

      ctx.message = resData.message;
      ctx.body = resData;
      ctx.status = resData.statusCode;
    } catch (error: any) {
      const resData = new ResonseData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      ctx.body = resData;
      ctx.status = resData.statusCode;

      return;
    }
  }

  async deleteUser(ctx: Context) {
    try {
    const id = ctx.params.id

      const resData = await this.service.delete(+id)

      ctx.message = resData.message;
      ctx.body = resData;
      ctx.status = resData.statusCode;
    } catch (error: any) {
      const resData = new ResonseData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      ctx.body = resData;
      ctx.status = resData.statusCode;

      return;
    }
  }

}
