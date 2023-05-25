import { Injectable } from '@nestjs/common';

import { writeFile } from 'fs/promises';

@Injectable()
export class FileService {
  async upload(banner: Express.Multer.File, path: string) {
    return writeFile(path, banner.buffer);
  }
}
