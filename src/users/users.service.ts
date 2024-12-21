import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = {
  id: number;
  userName: string;
  password: string;
  role: string;
  roleId: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      userName: 'praveen',
      password: '1234',
      role: 'admin',
      roleId: '1',
    },
    {
      id: 2,
      userName: 'maria',
      password: '1234',
      role: 'clerk',
      roleId: '2',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.userName === username);
  }
}
