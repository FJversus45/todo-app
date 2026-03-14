import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'this is the first name of the user',
    example: 'folajimi',
  })
  firstName: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'this is the last name of the user',
    example: 'Aduwo',
  })
  lastName: string;
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'this is the email of the user',
    example: 'fjaduwo@gmail.com',
  })
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'this is the password of the user',
    example: 'Password1@',
  })
  password: string;
}

export class LoginDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'this is the email of the user',
    example: 'test@gmail.com',
  })
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'this is the password of the user',
    example: 'Password1@',
  })
  password: string;
}
