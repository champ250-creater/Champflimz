import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: any) {
    return this.usersService.findById(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateProfile(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  // --- Watchlist ---

  @UseGuards(JwtAuthGuard)
  @Get('me/watchlist')
  getWatchlist(@Req() req: any) {
    return this.usersService.getWatchlist(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me/watchlist/:videoId')
  addToWatchlist(@Req() req: any, @Param('videoId') videoId: string) {
    return this.usersService.addToWatchlist(req.user.id, parseInt(videoId, 10));
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me/watchlist/:videoId')
  removeFromWatchlist(@Req() req: any, @Param('videoId') videoId: string) {
    return this.usersService.removeFromWatchlist(req.user.id, parseInt(videoId, 10));
  }

  // --- Reviews ---

  @UseGuards(JwtAuthGuard)
  @Get('me/reviews')
  getUserReviews(@Req() req: any) {
    return this.usersService.getUserReviews(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me/reviews/:videoId')
  addReview(
    @Req() req: any, 
    @Param('videoId') videoId: string, 
    @Body() body: { rating: number; content?: string }
  ) {
    return this.usersService.addReview(req.user.id, parseInt(videoId, 10), body.rating, body.content);
  }
}
