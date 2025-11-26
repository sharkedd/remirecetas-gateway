import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { MultimediaService } from './multimedia.service';
import { CreateMultimediaDto } from './dto/create-multimedia.dto';
import { UpdateMultimediaDto } from './dto/update-multimedia.dto';

@Controller('multimedia')
export class MultimediaController {
  constructor(private readonly multimediaService: MultimediaService) {}

  @Post()
  create(@Body() dto: CreateMultimediaDto) {
    return this.multimediaService.createMultimedia(
      dto.id_receta,
      dto.url_photo,
    );
  }

  @Get('recipe/:id')
  findByRecipe(@Param('id') id: string) {
    return this.multimediaService.findByRecipe(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.multimediaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMultimediaDto) {
    return this.multimediaService.updateMultimedia(id, dto.url_photo);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.multimediaService.deleteMultimedia(id);
  }

  @Delete('recipe/:id')
  deleteByRecipe(@Param('id') id: string) {
    return this.multimediaService.deleteByRecipe(id);
  }
}
