const { nanoid } = require("nanoid"); //npm install nanoid@3.x.x (buat generate id)
const notes = require("./notes"); //require notes.js

//menyimpan isi note
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload; //payload buat mendapatkan isi body (isi dari data)

  const id = nanoid(16); //nanoid generate 16 karakter string id
  const createdAt = new Date().toISOString(); //ini buat bikin tanggal real time notes
  const updatedAt = createdAt; //buat munculin tanggal

  //ini struktur dari notesnya
  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  //untuk memasukan isi notes ke array (nyimpen)
  notes.push(newNote);

  //menentukan apakah notesnya sudah tersimpan di array
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Catatan gagal ditambahkan",
  });
  response.code(500);
  return response;
};

//mendapatkan fungsi fungsi pada notes
const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

//buat nampilin isi notenya dan detailnya
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

//ini buat edit notesnya
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Catatan berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui catatan. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  //cari id nya
  const index = notes.findIndex((note) => note.id === id);
  //kalo ketemu idnya (-1 itu ga ketemu)
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Catatan berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  //kalo gagal
  const response = h.response({
    status: "fail",
    message: "Catatan gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
