// src/socials/socials.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  AddLikeDto,
  AddDislikeDto,
  IncrementLikeDto,
  IncrementDislikeDto,
  AddCommentDto,
  UpdateCommentDto,
} from './dto/socials.dto';

@Injectable()
export class SocialsService {
  constructor(
    @Inject('SOCIALS_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  // ========== LIKES/DISLIKES - USUARIOS REGISTRADOS ==========

  async addLike(dto: AddLikeDto, userId: string) {
    return firstValueFrom(
      this.client.send({ cmd: 'add_like' }, { recipeId: dto.recipeId, userId }),
    );
  }

  async removeLike(dto: AddLikeDto, userId: string) {
    return firstValueFrom(
      this.client.send(
        { cmd: 'remove_like' },
        { recipeId: dto.recipeId, userId },
      ),
    );
  }

  async addDislike(dto: AddDislikeDto, userId: string) {
    return firstValueFrom(
      this.client.send(
        { cmd: 'add_dislike' },
        { recipeId: dto.recipeId, userId },
      ),
    );
  }

  async removeDislike(dto: AddDislikeDto, userId: string) {
    return firstValueFrom(
      this.client.send(
        { cmd: 'remove_dislike' },
        { recipeId: dto.recipeId, userId },
      ),
    );
  }

  // ========== LIKES/DISLIKES - INVITADOS ==========

  async incrementLikes(dto: IncrementLikeDto) {
    return firstValueFrom(
      this.client.send({ cmd: 'increment_likes' }, { recipeId: dto.recipeId }),
    );
  }

  async decrementLikes(dto: IncrementLikeDto) {
    return firstValueFrom(
      this.client.send({ cmd: 'decrement_likes' }, { recipeId: dto.recipeId }),
    );
  }

  async incrementDislikes(dto: IncrementDislikeDto) {
    return firstValueFrom(
      this.client.send(
        { cmd: 'increment_dislikes' },
        { recipeId: dto.recipeId },
      ),
    );
  }

  async decrementDislikes(dto: IncrementDislikeDto) {
    return firstValueFrom(
      this.client.send(
        { cmd: 'decrement_dislikes' },
        { recipeId: dto.recipeId },
      ),
    );
  }

  // ========== CONSULTAS LIKES/DISLIKES ==========

  async getRecipeStats(recipeId: string) {
    return firstValueFrom(
      this.client.send({ cmd: 'get_recipe_stats' }, recipeId),
    );
  }

  async getUserReaction(recipeId: string, userId: string) {
    return firstValueFrom(
      this.client.send({ cmd: 'get_user_reaction' }, { recipeId, userId }),
    );
  }

  // ========== COMENTARIOS ==========

  async addComment(dto: AddCommentDto, userId: string) {
    return firstValueFrom(
      this.client.send(
        { cmd: 'add_comment' },
        { recipeId: dto.recipeId, userId, text: dto.text },
      ),
    );
  }

  async getCommentsByRecipe(recipeId: string) {
    return firstValueFrom(
      this.client.send({ cmd: 'get_comments_by_recipe' }, recipeId),
    );
  }

  async updateComment(dto: UpdateCommentDto) {
    return firstValueFrom(
      this.client.send(
        { cmd: 'update_comment' },
        { commentId: dto.commentId, text: dto.text },
      ),
    );
  }

  async deleteComment(commentId: string) {
    return firstValueFrom(
      this.client.send({ cmd: 'delete_comment' }, commentId),
    );
  }

  async getCommentsByUser(userId: string) {
    return firstValueFrom(
      this.client.send({ cmd: 'get_comments_by_user' }, userId),
    );
  }

  // ========== ESTADÍSTICAS COMPLETAS ==========

  async getRecipeSocialStats(recipeId: string) {
    return firstValueFrom(
      this.client.send({ cmd: 'get_recipe_social_stats' }, recipeId),
    );
  }
}
