// src/tags/tags.controller.ts
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  // Crear tag (solo usuarios logueados)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateTagDto) {
    return this.tagsService.create(dto);
  }

  // Listar todos los tags (público)
  @Get()
  findAll() {
    return this.tagsService.findAll();
  }
}
