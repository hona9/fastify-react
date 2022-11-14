const {
  getAllNotes,
  addNote,
  deleteNote,
  updateNote,
} = require("./controller");

const routes = [
  {
    method: "GET",
    url: "/api/notes",
    handler: getAllNotes,
  },
  {
    method: "POST",
    url: "/api/notes",
    handler: addNote,
  },
  {
    method: "PUT",
    url: "/api/notes/:id",
    handler: updateNote,
  },
  {
    method: "DELETE",
    url: "/api/notes/:id",
    handler: deleteNote,
  },
];

module.exports = routes;
