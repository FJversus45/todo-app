import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class TodoDto {
  @IsString()
  @ApiProperty({
    description: 'this is the title of the todo',
    example: 'buy groceries',
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'this is the description of the todo',
    example: 'buy eggs and cabbage',
  })
  body: string;
}

export class UpdateTodoDto {
  @IsString()
  @ApiProperty({
    description: 'this is the updated title of the todo',
    example: 'buy more groceries',
  })
  title: string;
  @IsString()
  @ApiProperty({
    description: 'this is the updated body of the todo',
    example: 'buy aggs, cabbage and plantain chips',
  })
  body: string;
  @IsNumber()
  @ApiProperty({
    description: 'this is the id of the todo',
    example: '1',
  })
  todoId: number;
}
