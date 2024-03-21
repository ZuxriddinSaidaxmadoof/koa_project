import { PostgresDriver } from "../../lib/postgresDriver";
import { UserEntity } from "./entity/user.entity";

export class UserRepository extends PostgresDriver {
  async insert(userEntity: UserEntity) {
    return await this.fetch(
      "insert into cars (index, owner_id) values ($1, $2) returning *",
      userEntity.index,
      userEntity.owner_id,
    );
  }


  async getAll():Promise<UserEntity[]>{
    return await this.fetchAll(
      "select * from cars"
    );
  }

  async getOne(id: number):Promise<UserEntity>{
    return await this.fetch(
      "select * from cars where id = $1",
      id
    );
  }
  async getByIndex(index: string):Promise<UserEntity>{
    return await this.fetch(
      "select * from cars where index = $1",
      index
    );
  }

  async update(userEntity: UserEntity, id: number): Promise<UserEntity> {
    return await this.fetch(
      "update cars set index = $1, owner_id = $2 where id = $3 returning *",
      userEntity.index,
      userEntity.owner_id,
      id
    );
  }

  async delete(id: number):Promise<UserEntity>{
    return await this.fetch(
      "delete from cars where id = $1 returning *",
      id
    );
  }

}
