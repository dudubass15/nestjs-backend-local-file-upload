import {
  Controller,
  Post,
  Param,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileHelper } from '@helpers/FileHelper';
import { FileViewModel } from '../view/file.view.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileUseCase } from '@application/usecases/UploadFileUseCase';
import { ListAllFilesUseCase } from '@application/usecases/ListAllFilesUseCase';
import { EditUploadFileUseCase } from '@application/usecases/EditUploadFileUseCase';
import { RemoveFileFromBaseUseCase } from '@application/usecases/RemoveFileFromBaseUseCase';

@Controller('')
export class FileController {
  constructor(
    private uploadFileUseCase: UploadFileUseCase,
    private listAllFilesUseCase: ListAllFilesUseCase,
    private editFileDataUseCase: EditUploadFileUseCase,
    private removeFileFromBaseUseCase: RemoveFileFromBaseUseCase,
  ) {}

  @Post('')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: FileHelper.randomName,
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const { filename, path, size } = file;

    const data = await this.uploadFileUseCase.execute({
      file: filename,
      filePath: path,
      size: size,
    });

    return { file: FileViewModel.toHTTP(data) };
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: FileHelper.randomName,
      }),
    }),
  )
  async editFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { filename, path, size } = file;

    const data = await this.editFileDataUseCase.execute({
      id,
      file: filename,
      filePath: path,
      size: size,
    });

    return { file: FileViewModel.toHTTP(data) };
  }
}
