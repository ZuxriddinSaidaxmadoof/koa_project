import { ResonseData } from "../../common/responseData";
import { CreateUserDto } from "./dto/user-create.dto";
import { UserEntity } from "./entity/user.entity";
import { UserRepository } from "./user.repository";

export class UserService {
  private readonly repository;
  constructor() {
    this.repository = new UserRepository();
  }

  async findAll(): Promise<ResonseData<UserEntity[]>> {

    const data = await this.repository.getAll()

    const resData = new ResonseData<UserEntity[]>("all users", 201, data);

    return resData;
  }


  async findOne(id: number): Promise<ResonseData<UserEntity>> {

    const data = await this.repository.getOne(id);

    const resData = new ResonseData<UserEntity>("one user by id", 201, data);
    if(!resData.data){
      throw new ResonseData("User not found by id", 404, null)
    }

    return resData;
  }


  async update(dto: CreateUserDto, id: number): Promise<ResonseData<UserEntity>> {
    
    const {data: foundUser} = await this.findOne(id);
    foundUser as UserEntity
    if(foundUser){
      let newEntity = UserEntity.builder(dto);
      const entity: UserEntity = Object.assign(foundUser, newEntity);
      
      const data: UserEntity = await this.repository.update(entity, id)
      return new ResonseData<UserEntity>("updated", 200, data);
      
    }
    throw new ResonseData("User not found by id", 404, null)

  }

  async create(dto: CreateUserDto) {
    let entity = UserEntity.builder(dto);

    const checkPhoneExist = await this.repository.getOneByPhone(entity.phone_number);
    if(checkPhoneExist){
      throw new ResonseData("This phone number already exist", 400)
    }

    entity = Object.assign(entity, dto);

    const data = await this.repository.insert(entity);

    const resData = new ResonseData("created", 201, data);

    return resData;
  }

  async delete(id: number): Promise<ResonseData<UserEntity>> {
    
    await this.findOne(id);
    const deleted = await this.repository.delete(id);

    return new ResonseData<UserEntity>("deleted", 200, deleted);
  }
}
