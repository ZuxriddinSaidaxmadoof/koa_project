import { PostgresDriver } from "../../lib/postgresDriver";
import { UserEntity } from "./entity/user.entity";

export class UserRepository extends PostgresDriver {
  async insert(userEntity: UserEntity) {
    return await this.fetch(
      "insert into users (balance, password, phone_number, role) values ($1, $2, $3, $4) returning *",
      userEntity.balance,
      userEntity.password,
      userEntity.phone_number,
      userEntity.role
    );
  }


  async getAll():Promise<UserEntity[]>{
    return await this.fetchAll(
      "select * from users"
    );
  }

  async getOne(id: number):Promise<UserEntity>{
    return await this.fetch(
      "select * from users where id = $1",
      id
    );
  }

  async getOneByPhone(phone: string):Promise<UserEntity>{
    return await this.fetch(
      "select * from users where phone_number = $1",
      phone
    );
  }

  async update(userEntity: UserEntity, id: number): Promise<UserEntity> {
    return await this.fetch(
      "update users set phone_number = $1, password = $2, balance = $3, role = $4 where id = $5 returning *",
      userEntity.phone_number,
      userEntity.password,
      userEntity.balance,
      userEntity.role,
      id
    );
  }

  async delete(id: number):Promise<UserEntity>{
    return await this.fetch(
      "delete from users where id = $1 returning *",
      id
    );
  }

}
