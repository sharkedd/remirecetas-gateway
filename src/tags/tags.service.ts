// src/tags/tags.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @Inject('TAGS_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async create(dto: CreateTagDto) {
    return firstValueFrom(this.client.send({ cmd: 'create_tag' }, dto));
  }

  async findAll() {
    return firstValueFrom(this.client.send({ cmd: 'get_all_tags' }, {}));
  }
}
