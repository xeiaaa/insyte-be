import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from 'src/schemas/note.schema';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { UserDocument } from 'src/schemas/user.schema';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  async create(
    @AuthUser() authUser: UserDocument,
    @Body() createNoteDto: CreateNoteDto,
  ): Promise<Note> {
    return this.noteService.create(
      {
        ...createNoteDto,
      },
      authUser._id,
    );
  }

  @Get()
  async getAll(@AuthUser() authUser: UserDocument): Promise<Note[]> {
    return this.noteService.getAll({
      user: authUser._id,
    });
  }

  @Get('/:id')
  async getById(@AuthUser() authUser: UserDocument, @Param('id') id: string) {
    const note = await this.noteService.getById(id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    // TODO: Check how to compare ObjectId
    if (JSON.stringify(note.user) !== JSON.stringify(authUser._id)) {
      throw new ForbiddenException('You do not have access to this note');
    }
    return note;
  }

  @Delete('/:id')
  async delete(
    @AuthUser() authUser: UserDocument,
    @Param('id') id: string,
  ): Promise<Note> {
    const note = await this.noteService.getById(id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    if (JSON.stringify(note.user) !== JSON.stringify(authUser._id)) {
      throw new ForbiddenException('You do not have access to this note');
    }

    return this.noteService.delete(id);
  }

  @Post('/:id/document-loader')
  @UseInterceptors(FileInterceptor('file'))
  async createDocumentLoader(
    @AuthUser() authUser: UserDocument,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const note = await this.noteService.getById(id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    if (JSON.stringify(note.user) !== JSON.stringify(authUser._id)) {
      throw new ForbiddenException('You do not have access to this note');
    }

    return this.noteService.createDocumentLoader(id, file);
  }

  @Post('/:id/upsert/all')
  async upsertAll(@AuthUser() authUser: UserDocument, @Param('id') id: string) {
    const note = await this.noteService.getById(id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    if (JSON.stringify(note.user) !== JSON.stringify(authUser._id)) {
      throw new ForbiddenException('You do not have access to this note');
    }

    return this.noteService.upsertAll(id);
  }

  @Get('/:id/files')
  async getAllFiles(
    @AuthUser() authUser: UserDocument,
    @Param('id') id: string,
  ): Promise<any> {
    const note = await this.noteService.getById(id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    if (JSON.stringify(note.user) !== JSON.stringify(authUser._id)) {
      throw new ForbiddenException('You do not have access to this note');
    }

    return this.noteService.getAllFiles(id);
  }
}
