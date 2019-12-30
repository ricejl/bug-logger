import mongoose from "mongoose";
import Note from "../models/Note";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Note", Note);

class NotesService {
  //   async getAll() {
  //     return await _repository.find({});
  //   }

  async getNotesByBugId(bugId) {
    return await _repository.find({ bug: bugId });
  }

  //   async getById(id) {
  //     let data = await _repository.findById(id);
  //     if (!data) {
  //       throw new ApiError("Invalid ID", 400);
  //     }
  //     return data;
  //   }

  async create(rawData) {
    return await _repository.create(rawData);
  }

  async edit(id, update) {
    let data = await _repository.findOneAndUpdate(
      { _id: id, closed: false },
      update
    );
    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }
    return data;
  }

  async delete(id) {
    let data = await _repository.findOneAndRemove({ _id: id });
    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }
  }
}

const notesService = new NotesService();
export default notesService;
