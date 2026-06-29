import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: createUserDto.email }, { username: createUserDto.username }],
      },
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    const { password, ...result } = user;
    return result;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        avatarUrl: true,
        bio: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    const { password, ...result } = updatedUser;
    return result;
  }

  // --- Watchlist (MyList) ---
  
  async getWatchlist(userId: number) {
    return this.prisma.myList.findMany({
      where: { userId },
      include: { video: true },
      orderBy: { addedAt: 'desc' }
    });
  }

  async addToWatchlist(userId: number, videoId: number) {
    return this.prisma.myList.upsert({
      where: { userId_videoId: { userId, videoId } },
      update: {},
      create: { userId, videoId }
    });
  }

  async removeFromWatchlist(userId: number, videoId: number) {
    return this.prisma.myList.delete({
      where: { userId_videoId: { userId, videoId } }
    });
  }

  // --- Reviews ---

  async addReview(userId: number, videoId: number, rating: number, content?: string) {
    return this.prisma.review.upsert({
      where: { userId_videoId: { userId, videoId } },
      update: { rating, content },
      create: { userId, videoId, rating, content }
    });
  }

  async getUserReviews(userId: number) {
    return this.prisma.review.findMany({
      where: { userId },
      include: { video: true },
      orderBy: { createdAt: 'desc' }
    });
  }
}
