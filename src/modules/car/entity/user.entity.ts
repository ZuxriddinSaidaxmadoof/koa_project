import { Role } from "../../../common/enums/role";
import { CreateCarDto } from "../dto/user-create.dto";

export class UserEntity {
  id: number = 0;
  index!: string;
  owner_id!: number;

  static builder(dto: CreateCarDto) {
     const newUser = new UserEntity();
    newUser.index = dto.index;
    newUser.owner_id = dto.ownerId;
    return newUser;
  }

}
