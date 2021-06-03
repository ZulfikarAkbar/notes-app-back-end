const {nanoid} = require('nanoid');
const notes = require('./notes');
const addNoteHandler = (request, h) => {
  // Baca README.md, Kriteria 1 Poin 3
  const {title, tags, body} = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  notes.push({id, title, body, tags, createdAt, updatedAt});
  // Cek keberhasilan push data
  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  // Baca README.md, Kriteria 1 Poin 4
  if (isSuccess) {
    const response = h.response(
     {
       "status": "success",
       "message": "Catatan berhasil ditambahkan",
       "data": {
       "noteId": id,
       }
     }
    );
    response.code(201);
    return response;

  }
  // Baca README.md, Kriteria 1 Poin 5
  const response = h.response(
   {
     "status": "error",
     "message": "Catatan gagal untuk ditambahkan",
   }
  );
  response.code(500);
  return response;
};
// Baca README.md, Kriteria 2 Poin 2
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.filter((n) => n.id === id)[0];
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }
  // Baca README.md, Kriteria 2 Poin 4
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  // Baca README.md, Kriteria 3 Poin 1
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
    // Baca README.md, Kriteria 3 Poin 2
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  // Baca README.md, Kriteria 3 Poin 3
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    // Baca README.md, Kriteria 4 Poin 1
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  // Baca README.md, Kriteria 4 Poin 2
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
module.exports = {
	addNoteHandler, 
	getAllNotesHandler, 
	getNoteByIdHandler, 
	editNoteByIdHandler,
	deleteNoteByIdHandler
};
