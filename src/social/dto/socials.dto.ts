// src/socials/dto/socials.dto.ts

export class AddLikeDto {
  recipeId: string;
}

export class AddDislikeDto {
  recipeId: string;
}

export class IncrementLikeDto {
  recipeId: string;
}

export class IncrementDislikeDto {
  recipeId: string;
}

export class AddCommentDto {
  recipeId: string;
  text: string;
}

export class UpdateCommentDto {
  commentId: string;
  text: string;
}
