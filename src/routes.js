const {
	addNoteHandler, 
	getAllNotesHandler, 
	getNoteByIdHandler, 
	editNoteByIdHandler,
	deleteNoteByIdHandler
} = require('./handler');
const routes = [
  // Baca README.md, Kriteria 1 Poin 2
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  // Baca README.md, Kriteria 2 Poin 1
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  // Baca README.md, Kriteria 2 Poin 3
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  // Baca README.md, Kriteria 3 Poin 1
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];
module.exports = routes;
