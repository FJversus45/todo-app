import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { title } from 'process';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoFeaturesService {
  constructor(private prismaService: PrismaService) {}
  async createTodo(title: string, body: string, userId: string) {
    console.log(`user: ${userId}`);
    const userExists = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userExists) {
      throw new NotFoundException('User not found');
    }
    const lastTodo = await this.prismaService.todo.findFirst({
      where: {
        id: userId,
      },
      orderBy: {
        myId: 'desc',
      },
    });
    const myId = (lastTodo?.myId ?? 0) + 1;
    const todo = await this.prismaService.todo.create({
      data: {
        title,
        body,
        userId,
        myId,
      },
    });
    return {
      message: `A todo named ${todo.title} has been created`,
      data: {
        title: title,
        body: body,
      },
    };
  }
  async viewTodo(userId: string, todoId: number) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userExists) {
      throw new NotFoundException('User not found');
    }
    const todo = await this.prismaService.todo.findUnique({
      where: {
        myId: todoId,
        userId: userId,
      },
    });
    if (!todo) {
      throw new NotFoundException('the todo for this id does not exist');
    }
    return {
      id: todo.myId,
      title: todo.title,
      body: todo.body,
    };
  }
  async viewAllTodo(userId: string) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userExists) {
      throw new NotFoundException('User not found');
    }
    const todo = await this.prismaService.todo.findMany({
      where: {
        userId: userId,
      },
    });

    return {
      data: todo,
    };
  }
  async updateTodo(
    title: string,
    body: string,
    userId: string,
    todoId: number,
  ) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userExists) {
      throw new NotFoundException('User not found');
    }
    const todo = await this.prismaService.todo.update({
      where: {
        myId: todoId,
        userId: userId,
      },
      data: {
        title: title,
        body: body,
      },
    });
    return todo;
  }

  async deleteTodo(todoId: number, userId: string) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userExists) {
      throw new NotFoundException('User not found');
    }
    const todo = await this.prismaService.todo.delete({
      where: {
        myId: todoId,
      },
    });
    return todo;
  }
}
