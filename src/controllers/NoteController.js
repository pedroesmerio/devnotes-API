const NoteService = require('../services/NoteService');

module.exports = {
  all: async (req, res) => {
    let jsonResponse = { error: '', result: [] };

    let notes = await NoteService.getAll();

    for (let i in notes) {
      jsonResponse.result.push({
        id: notes[i].id,
        title: notes[i].title,
      });
    }

    res.json(jsonResponse);
  },
  one: async (req, res) => {
    let jsonResponse = { error: '', result: {} };

    let id = req.params.id;
    let note = await NoteService.findById(id);

    if (note) {
      jsonResponse.result = note;
    }

    res.json(jsonResponse);
  },
  new: async (req, res) => {
    let jsonResponse = { error: '', result: {} };

    let title = req.body.title;
    let body = req.body.body;

    if (title && body) {
      let noteId = await NoteService.add(title, body);
      jsonResponse.result = {
        id: noteId,
        title,
        body,
      };
    } else {
      json.error = 'Campos não enviados';
    }

    res.json(jsonResponse);
  },
  edit: async (req, res) => {
    let jsonResponse = { error: '', result: {} };

    let id = req.params.id;
    let title = req.body.title;
    let body = req.body.body;

    if (id && title && body) {
      await NoteService.update(id, title, body);
      jsonResponse.result = {
        id,
        title,
        body,
      };
    } else {
      json.error = 'Campos não enviados';
    }

    res.json(jsonResponse);
  },
  delete: async (req, res) => {
    let jsonResponse = { error: '', result: {} };

    await NoteService.delete(req.params.id);

    res.json(jsonResponse);
  },
};
