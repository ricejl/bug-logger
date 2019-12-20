import mongoose from "mongoose";
import Bugs from "../models/Bugs";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Bugs", Bugs);

class BugsService {
  async getAll() {
    return await _repository.find({});
  }

  async getById(id) {
    await _repository.findById(id);
    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }
  }

  async create(rawData) {
    let data = await _repository.create(rawData);
    return data;
  }

  async edit(id, update) {
    let data = await _repository.findOneAndUpdate({ _id: id }, update, {
      new: true
    });
    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }
    return data;
  }

  async delete(id) {
    let data = await _repository.findOneAndUpdate(
      { _id: id },
      { closed: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }
  }

  //for delete, get, check, and if passes check findOneAndUpdate
}

const bugsService = new BugsService();
export default bugsService;
