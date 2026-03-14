import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async findUserById(id: string) {
    const cacheKey = `user:${id}`;
    // const cachedUser = await this.cacheManager.get(cacheKey);

    // if (cachedUser) {
    //   console.log('Cache hit! Returning cached user.');
    //   return cachedUser;
    // }
    console.log('Cache miss. Fetching from database');
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (user) {
      console.log('We reached here');
      // await this.cacheManager.set(cacheKey, user, 600);
    }
    return user;
  }

  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: { equals: email, mode: 'insensitive' },
      },
    });
    if (existingUser) {
      throw new ConflictException({
        message:
          'Account already exists with this email. Please login instead.',
        userInfo: { email: existingUser.email },
      });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
      },
    });
    const token = this.generateToken(user);
    return {
      message: `${user.firstName}'s account has been created successfully. You can now create a todo`,
      token: token,
    };
  }
  async login(email: string, password: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!existingUser) {
      throw new UnauthorizedException({
        message: 'No account found with this email. PLease sign up instead.',
        email: email,
      });
    }
    const hashedPassword = existingUser.password;
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      throw new UnauthorizedException({
        message: 'Incorrect password. Please try again',
      });
    }
    const token = this.generateToken(existingUser);
    return {
      message: "You've logged in succesfully",
      token: token,
    };
  }
  generateToken(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return this.jwtService.sign(payload);
  }
}
