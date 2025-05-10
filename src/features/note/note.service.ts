import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, PaginateModel, PaginateResult, Types } from 'mongoose';
import { Note } from 'src/schemas/note.schema';
import { v4 as uuid } from 'uuid';
import { flowise } from 'src/libs/flowise';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NoteService {
  constructor(@InjectModel(Note.name) private noteModel: PaginateModel<Note>) {}

  getAll(filter: FilterQuery<Note> = {}) {
    return this.noteModel.find(filter);
  }

  getById(_id: string) {
    return this.noteModel.findById(_id);
  }

  getAllByUserId(userId: string) {
    return this.noteModel.find({ user: userId });
  }

  async create(
    body: { title: string; description?: string },
    user: Types.ObjectId,
  ) {
    const noteId = new Types.ObjectId();

    // Create flowise document store
    const documentStoreId = uuid();
    const { data } = await flowise.documentStores.create({
      id: documentStoreId,
      name: `note-${noteId.toString()}`,
    });

    return this.noteModel.create({
      ...body,
      documentStoreId: data.id,
      user,
    });
  }

  async update(_id: string, body: UpdateNoteDto) {
    const note = await this.getById(_id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    Object.assign(note, body);
    await note.save();
    return note;
  }

  async delete(_id: string) {
    const note = await this.getById(_id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    const { documentStoreId } = note;

    await note.deleteOne();

    // Also delete the assigned Flowise document store
    try {
      await flowise.documentStores.delete(documentStoreId);
    } catch (err) {
      console.log(err);
    }
    return note;
  }

  count(filter: FilterQuery<Note> = {}) {
    return this.noteModel.countDocuments(filter);
  }

  async paginate(
    page: number = 1,
    limit: number = 10,
    filter: FilterQuery<Note> = {},
    sort: string,
  ): Promise<PaginateResult<Note>> {
    return this.noteModel.paginate(filter, {
      page,
      limit,
      sort,
    });
  }
}
