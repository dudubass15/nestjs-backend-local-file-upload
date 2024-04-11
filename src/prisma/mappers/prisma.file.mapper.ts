import { File as RawFile } from '@prisma/client';
import { FileEntity } from '../../entities/File';

export class PrismaFileMapper {
  static toPrisma(data: FileEntity) {
    return {
      id: data.id,
      file: data.file,
      fileName: data.fileName,
      filePath: data.filePath,
      size: data.size,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toEntity(raw: RawFile): FileEntity {
    return new FileEntity({
      id: raw.id,
      file: raw.file,
      fileName: raw.file,
      filePath: raw.filePath,
      size: raw.size,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
