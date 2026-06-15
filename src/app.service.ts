import { Injectable } from '@nestjs/common';

let users = [
  { id: '1', name: 'John Doe', email: 'john@mail.com', age: 30 },
  { id: '2', name: 'dodo', email: 'dodo@mail.com', age: 35 },
  { id: '3', name: 'ahmed', email: 'ahmed@mail.com', age: 40 },
  { id: '4', name: 'sara', email: 'sara@mail.com', age: 25 },
];

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }

  sayHi(): string {
    return 'Hi from new project';
  }

  createUser(user: any) {
    users.push(user);
    return {
      message: 'User created successfully',
      users,
    };
  }

  updateUser(email: string, data: any) {
    const user = users.find((u) => u.email === email);
    if (!user) {
      return {
        message: 'User not found',
      };
    }

    if (data.name) {
      user.name = data.name;
    }

    if (data.age) {
      user.age = data.age;
    }

    return {
      message: 'User updated successfully',
      user,
    };
  }
}