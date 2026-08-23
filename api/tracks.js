import { getTrackById, getTracks } from "#db/queries/tracks";
import express from "express";

export const tracksRouter = express.Router();

//GET routes
tracksRouter.get("/", async (req, res, next) => {
  const tracks = await getTracks();
  res.status(200).send(tracks);
});

tracksRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id * 1;

  if (!Number.isFinite(id)) {
    return res.status(400).send("Id must be a number");
  }

  const track = await getTrackById(id);

  if (!track) {
    return res.status(404).send("No track with that id exists");
  }
  res.status(200).send(track);
});
