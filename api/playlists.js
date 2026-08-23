import { createPlaylist, getPlaylistById, getPlaylists } from "#db/queries/playlists";
import { createPlaylistsTracks } from "#db/queries/playlists_tracks";
import { getPlaylistTracks, getTrackById } from "#db/queries/tracks";
import express from "express";

export const playlistsRouter = express.Router();

// "/playlists" routes
playlistsRouter.get("/", async (req, res, next) => {
  const playlists = await getPlaylists();
  res.status(200).send(playlists);
});

playlistsRouter.post("/", async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send("Please provide name and description.");
  }

  const { name, description } = req.body;

  if (!name || !description) {
    res
      .status(400)
      .send(
        `One or more fields are missing. We received name: ${name} description: ${description}`,
      );
  }

  const newPlaylist = await createPlaylist(name, description);
  res.status(201).send(newPlaylist);
});

// "/:id" routes
playlistsRouter.param("id", async (req, res, next, id) => {
  if (!Number.isFinite(id * 1)) {
    return res.status(400).send("Please provide a valid id number.");
  }
  if (req.method === `POST`) {
    req.id = id;
    next();
  }
  const playlist = await getPlaylistById(id);
  if (!playlist) {
    return res.status(404).send("Playlist with the provided ID does not exist.");
  }

  req.playlist = playlist;
  next();
});

playlistsRouter.get("/:id", async (req, res, next) => {
  res.status(200).send(req.playlist);
});

// "/:id/tracks" routes
playlistsRouter.get("/:id/tracks", async (req, res, next) => {
  const playlistTracks = await getPlaylistTracks(req.playlist.id);
  res.status(200).send(playlistTracks);
});

playlistsRouter.post("/:id/tracks", async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send("Please provide a playlist id and a track id");
  }
  const { trackId } = req.body;
  if (!Number.isFinite(trackId * 1)) {
    return res.status(400).send("Track ID must be a number");
  }
  if (!req.id || !trackId) {
    return res
      .status(400)
      .send(`One or more fields are missing. We received playlistId: ${id} trackId: ${trackId}`);
  }
  const track = await getTrackById(trackId);
  if (!track) {
    return res.status(400).send(`Track with provided id: ${trackId} does not exist.`);
  }

  const playlistTrack = await createPlaylistsTracks(req.id, trackId);
  if (!playlistTrack) {
    return res.status(400).send("Track already exists within this playlist");
  }
  res.status(201).send(playlistTrack);
});
