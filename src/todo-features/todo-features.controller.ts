import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TodoFeaturesService } from './todo-features.service';
import { TodoDto, UpdateTodoDto } from './dto/todo.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

@ApiTags('todo-features')
@Controller('todo-features')
export class TodoFeaturesController {
  constructor(private readonly todoFeaturesService: TodoFeaturesService) {}
  @ApiOperation({ summary: 'It creates a new todo' })
  @ApiResponse({
    status: 201,
    description: 'You have succesfully created a todo',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('createtodo')
  createTodo(
    @Req() req,
    @Body()
    todo: TodoDto,
  ) {
    const userId = req.user.id;
    return this.todoFeaturesService.createTodo(todo.title, todo.body, userId);
  }
  @ApiOperation({ summary: 'It lets you view a todo' })
  @ApiResponse({
    status: 201,
    description: 'returns your todo data',
  })
  @UseGuards(JwtAuthGuard)
  @Get('viewtodo')
  async viewTodo(@Req() req, @Body('todoId') todoId: number) {
    const userId = req.user.id;
    return await this.todoFeaturesService.viewTodo(userId, todoId);
  }
  @ApiOperation({ summary: 'It lets you view all of your todos' })
  @ApiResponse({
    status: 201,
    description: 'returns all of your todo data',
  })
  @UseInterceptors(CacheInterceptor)
  @CacheKey('getTodos')
  @UseGuards(JwtAuthGuard)
  @Get('viewalltodo')
  async viewAllTodo(@Req() req) {
    const userId = req.user.id;
    return await this.todoFeaturesService.viewAllTodo(userId);
  }
  @ApiOperation({ summary: 'It updates an existing todo' })
  @ApiResponse({
    status: 201,
    description: 'It returns the updated version of your todo',
  })
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
  @ApiOperation({ summary: 'It deletes an existing todo' })
  @ApiResponse({
    status: 201,
    description: 'It returns the data of your deleted todo',
  })
  @UseGuards(JwtAuthGuard)
  @Delete('deletetodo')
  async deleteTodo(@Req() req, @Body('todoId') todoId: number) {
    const userId = req.user.id;
    return await this.todoFeaturesService.deleteTodo(todoId, userId);
  }
}
