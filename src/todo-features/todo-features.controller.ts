import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodoFeaturesService } from './todo-features.service';
import { TodoDto, UpdateTodoDto } from './dto/todo.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guards';

@Controller('todo-features')
export class TodoFeaturesController {
  constructor(private readonly todoFeaturesService: TodoFeaturesService) {}
  @UseGuards(JwtAuthGuard)
  @Post('createtodo')
  createTodo(
    @Req() req,
    @Body()
    todo: TodoDto,
  ) {
    const userId = req.user.id;
    return this.todoFeaturesService.createTodo(todo.title, todo.body, userId);
  }
  @UseGuards(JwtAuthGuard)
  @Get('viewtodo')
  async viewTodo(@Req() req, @Body('todoId') todoId: number) {
    const userId = req.user.id;
    return await this.todoFeaturesService.viewTodo(userId, todoId);
  }
  @UseGuards(JwtAuthGuard)
  @Get('viewalltodo')
  async viewAllTodo(@Req() req) {
    const userId = req.user.id;
    return await this.todoFeaturesService.viewAllTodo(userId);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('updatetodo')
  async updateTodo(@Req() req, @Body() dto: UpdateTodoDto) {
    const userId = req.user.id;
    return await this.todoFeaturesService.updateTodo(
      dto.title,
      dto.body,
      userId,
      dto.todoId,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Delete('deletetodo')
  async deleteTodo(@Req() req, @Body('todoId') todoId: number) {
    const userId = req.user.id;
    return await this.todoFeaturesService.deleteTodo(todoId, userId);
  }
}
