import { IsNumber, IsString } from 'class-validator';

export class TodoDto {
  @IsString()
  title: string;
  @IsString()
  body: string;
}

export class UpdateTodoDto {
  @IsString()
  title: string;
  @IsString()
  body: string;
  @IsNumber()
  todoId: number;
}
