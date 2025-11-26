// src/socials/socials.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SocialsService } from './social.service';
import {
  AddLikeDto,
  AddDislikeDto,
  IncrementLikeDto,
  IncrementDislikeDto,
  AddCommentDto,
  UpdateCommentDto,
} from './dto/socials.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.decorator';

@Controller('socials')
export class SocialsController {
  constructor(private readonly socialsService: SocialsService) {}

  // ================== LIKES/DISLIKES - USUARIOS REGISTRADOS ==================

  @UseGuards(JwtAuthGuard)
  @Post('likes')
  addLike(@Body() dto: AddLikeDto, @User() user) {
    const userId = user.userId ?? user.id ?? user.sub;
    return this.socialsService.addLike(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('likes')
  removeLike(@Body() dto: AddLikeDto, @User() user) {
    const userId = user.userId ?? user.id ?? user.sub;
    return this.socialsService.removeLike(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('dislikes')
  addDislike(@Body() dto: AddDislikeDto, @User() user) {
    const userId = user.userId ?? user.id ?? user.sub;
    return this.socialsService.addDislike(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('dislikes')
  removeDislike(@Body() dto: AddDislikeDto, @User() user) {
    const userId = user.userId ?? user.id ?? user.sub;
    return this.socialsService.removeDislike(dto, userId);
  }

  // ================== LIKES/DISLIKES - INVITADOS ==================

  // Invitado incrementa likes (no requiere JWT)
  @Post('guest/likes/increment')
  incrementLikes(@Body() dto: IncrementLikeDto) {
    return this.socialsService.incrementLikes(dto);
  }

  @Post('guest/likes/decrement')
  decrementLikes(@Body() dto: IncrementLikeDto) {
    return this.socialsService.decrementLikes(dto);
  }

  @Post('guest/dislikes/increment')
  incrementDislikes(@Body() dto: IncrementDislikeDto) {
    return this.socialsService.incrementDislikes(dto);
  }

  @Post('guest/dislikes/decrement')
  decrementDislikes(@Body() dto: IncrementDislikeDto) {
    return this.socialsService.decrementDislikes(dto);
  }

  // ================== CONSULTAS LIKES/DISLIKES ==================

  @Get('recipes/:recipeId/stats')
  getRecipeStats(@Param('recipeId') recipeId: string) {
    return this.socialsService.getRecipeStats(recipeId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('recipes/:recipeId/my-reaction')
  getMyReaction(@Param('recipeId') recipeId: string, @User() user) {
    const userId = user.userId ?? user.id ?? user.sub;
    return this.socialsService.getUserReaction(recipeId, userId);
  }

  // ================== COMENTARIOS ==================

  @UseGuards(JwtAuthGuard)
  @Post('recipes/:recipeId/comments')
  addComment(
    @Param('recipeId') recipeId: string,
    @Body() dto: Omit<AddCommentDto, 'recipeId' | 'userId'>,
    @User() user,
  ) {
    const userId = user.userId ?? user.id ?? user.sub;
    return this.socialsService.addComment({ recipeId, text: dto.text }, userId);
  }

  @Get('recipes/:recipeId/comments')
  getCommentsByRecipe(@Param('recipeId') recipeId: string) {
    return this.socialsService.getCommentsByRecipe(recipeId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('comments/:commentId')
  updateComment(
    @Param('commentId') commentId: string,
    @Body() dto: Omit<UpdateCommentDto, 'commentId'>,
  ) {
    return this.socialsService.updateComment({
      commentId,
      text: dto.text,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('comments/:commentId')
  deleteComment(@Param('commentId') commentId: string) {
    return this.socialsService.deleteComment(commentId);
  }

  @Get('users/:userId/comments')
  getCommentsByUser(@Param('userId') userId: string) {
    return this.socialsService.getCommentsByUser(userId);
  }

  // ================== ESTADÍSTICAS COMPLETAS ==================

  @Get('recipes/:recipeId/full-stats')
  getRecipeSocialStats(@Param('recipeId') recipeId: string) {
    return this.socialsService.getRecipeSocialStats(recipeId);
  }
}
