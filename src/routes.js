const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require("./handler");

const routes = [
  {
    //ini buat nyimpen
    method: "POST",
    path: "/notes",
    handler: addNoteHandler,
  },
  {
    //buat handler notes
    method: "GET",
    path: "/notes",
    handler: getAllNotesHandler,
  },
  {
    //detail notes
    method: "GET",
    path: "/notes/{id}",
    handler: getNoteByIdHandler,
  },
  {
    //edit notes
    method: "PUT",
    path: "/notes/{id}",
    handler: editNoteByIdHandler,
  },
  {
    //hapus notes
    method: "DELETE",
    path: "/notes/{id}",
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
