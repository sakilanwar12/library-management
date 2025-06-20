import express, { Request, Response } from "express";
import Note from "../models/notes.model";

const notesRouter = express.Router();

notesRouter.post("/create-note", async (req: Request, res: Response) => {
  try {
    const { title, content, category, pinned, user } = req.body;

    const note = await Note.create({
      title,
      content,
      category,
      pinned,
      user,
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create note",
      error,
    });
  }
});

notesRouter.get("/notes", async (req: Request, res: Response) => {
  try {
    const notes = await Note.find();
    res.status(200).json({
      success: true,
      notes,
      message: "Notes fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch notes",
      error,
    });
  }
});

notesRouter.get("/notes/:id", async (req: Request, res: Response) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).json({
        success: false,
        message: "Note not found",
      });
    } else {
      res.status(200).json({
        success: true,
        note,
        message: "Note fetched successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch note",
      error,
    });
  }
});

notesRouter.patch("/notes/:id", async (req: Request, res: Response) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!note) {
      res.status(404).json({
        success: false,
        message: "Note not found",
      });
    } else {
      res.status(200).json({
        success: true,
        note,
        message: "Note updated successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update note",
      error,
    });
  }
});

notesRouter.delete("/notes/:id", async (req: Request, res: Response) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      res.status(404).json({
        success: false,
        message: "Note not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Note deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete note",
      error,
    });
  }
});

export default notesRouter;
