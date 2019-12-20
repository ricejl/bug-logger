import mongoose from "mongoose";
import Bugs from "../models/Bugs.js";

const _repository = mongoose.model("Bugs", Bugs);

class BugsService {
  async getAll() {
    return await _repository.find({});
  }
}

const bugsService = new BugsService();
export default bugsService;
