import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { UserMSG } from '../common/constants';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserMSG.CREATE)
  create(@Payload() userDTO: UserDTO) {
    return this.userService.create(userDTO);
  }

  @MessagePattern(UserMSG.FIND_ALL)
  getUsersAll() {
    return this.userService.getUsersAll();
  }

  @MessagePattern(UserMSG.FIND_ONE)
  getUserById(@Payload() id: string) {
    return this.userService.getUserById(id);
  }

  @MessagePattern(UserMSG.UPDATE)
  updateUser(@Payload() payload: any) {
    return this.userService.updateUser(payload.id, payload.userDTO);
  }

  @MessagePattern(UserMSG.DELETE)
  deleteUser(@Payload() id: string) {
    return this.userService.deleteUser(id);
  }

  @MessagePattern(UserMSG.VALID_USER)
  async validateUser(@Payload() payload: any) {
    const user = await this.userService.findByUsername(payload.username);

    const isValidPassword = await this.userService.checkPassword(
      payload.password,
      user.password,
    );

    if (isValidPassword && user) return user;

    return null;
  }
}
