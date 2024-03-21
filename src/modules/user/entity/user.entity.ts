import { Role } from "../../../common/enums/role";
import { CreateUserDto } from "../dto/user-create.dto";

export class UserEntity {
  id: number = 0;
  balance!: number;
  role!: Role;
  phone_number!: string;
  password!: string;


  static builder(dto: CreateUserDto) {
     const newUser = new UserEntity();
    newUser.phone_number = dto.phoneNumber;
    newUser.password = dto.password;
    newUser.balance = dto.balance;
    newUser.role = dto.role;
    return newUser;
  }

//   static builderForUpdate(dto: CreateUserDto) {
//     const newUser = new UserEntity();
//    newUser.phone_number = dto.phoneNumber;
//    newUser.password = dto.password;
//    newUser.balance = dto.balance;
//    newUser.role = dto.role;
//    return newUser;
//  }
}
