import { ResonseData } from "../../common/responseData";
import { CreateCarDto } from "./dto/user-create.dto";
import { UserEntity } from "./entity/user.entity";
import { UserRepository } from "./user.repository";
import {UserRepository as OwnerRepository} from "../user/user.repository"

export class UserService {
  private readonly repository;
  private readonly ownerRepository;

  constructor() {
    this.repository = new UserRepository();
    this.ownerRepository = new OwnerRepository();

  }

  async findAll(): Promise<ResonseData<UserEntity[]>> {

    const data = await this.repository.getAll()

    const resData = new ResonseData<UserEntity[]>("all cars", 201, data);

    return resData;
  }


  async findOne(id: number): Promise<ResonseData<UserEntity>> {

    const data = await this.repository.getOne(id);

    const resData = new ResonseData<UserEntity>("one car by id", 201, data);
    if(!resData.data){
      throw new ResonseData("car not found by id", 404, null)
    }

    return resData;
  }


  async update(dto: CreateCarDto, id: number): Promise<ResonseData<UserEntity>> {
    
    const {data: foundUser} = await this.findOne(id);
    foundUser as UserEntity
    if(foundUser){
      let newEntity = UserEntity.builder(dto);
      const entity: UserEntity = Object.assign(foundUser, newEntity);
      
      const data: UserEntity = await this.repository.update(entity, id)
      return new ResonseData<UserEntity>("updated", 200, data);
      
    }
    throw new ResonseData("car not found by id", 404, null)

  }

  async create(dto: CreateCarDto) {
    const checkIndexExist = await this.repository.getByIndex(dto.index);
    if(checkIndexExist){
      throw new ResonseData("This index already exist", 400);
    }

    const checkUserExist = await this.ownerRepository.getOne(dto.ownerId);
    if(!checkUserExist){
      throw new ResonseData("User not found", 404)
    }


    let entity = UserEntity.builder(dto);

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
