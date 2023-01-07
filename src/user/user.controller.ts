import { Body, Param, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto, GetUserByEmailDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  // @Get(':email')
  // getUserByEmail(@Param() getUserByEmailDto: GetUserByEmailDto) {
  //   return this.userService.getUserByEmail(getUserByEmailDto);
  // }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
