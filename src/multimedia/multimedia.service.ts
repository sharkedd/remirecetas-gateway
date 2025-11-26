import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MultimediaService {
  client: any;
  constructor(
    @Inject('MULTIMEDIA_SERVICE')
    private readonly multimediaClient: ClientProxy,
  ) {}

  async createMultimedia(id_receta: string, url_photo: string) {
    return firstValueFrom(
      this.multimediaClient.send(
        { cmd: 'create_multimedia' },
        { id_receta, url_photo },
      ),
    );
  }

  async findByRecipe(id_receta: string) {
    return firstValueFrom(
      this.client.send({ cmd: 'find_multimedia_by_recipe' }, id_receta),
    );
  }

  findOne(id: string) {
    return this.multimediaClient.send({ cmd: 'find_multimedia' }, id);
  }

  updateMultimedia(id: string, url_photo: string) {
    return this.multimediaClient.send(
      { cmd: 'update_multimedia' },
      { id, dto: { url_photo } },
    );
  }

  deleteMultimedia(id: string) {
    return this.multimediaClient.send({ cmd: 'delete_multimedia' }, id);
  }

  deleteByRecipe(id_receta: string) {
    return this.multimediaClient.send(
      { cmd: 'delete_multimedia_by_recipe' },
      id_receta,
    );
  }

  async obtainAll() {
    return firstValueFrom(
      this.multimediaClient.send({ cmd: 'obtain_all_multimedia' }, {}),
    );
  }
}
