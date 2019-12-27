import express from "express";
import notesService from "../services/NotesService";

export default class NotesController {
  constructor() {
    this.router = express
      .Router()
      //NOTE  each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.
      //   .get("", this.getAll)
      //   .get("/:id", this.getById)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete);
  }

  //   async getAll(req, res, next) {
  //     try {
  //       let data = await notesService.getAll();
  //       return res.send(data);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  //   async getById(req, res, next) {
  //     try {
  //       let data = await notesService.getById(req.params.id);
  //       return res.send(data);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  async create(req, res, next) {
    try {
      let data = await notesService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await notesService.edit(req.params.id, req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      let data = await notesService.delete(req.params.id);
      return res.send("Note deleted");
    } catch (error) {
      next(error);
    }
  }
}
