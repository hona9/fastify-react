const { Note } = require("./models");

const getAllNotes = async (req, reply) => {
  try {
    const notes = await Note.findAll();
    return notes;
  } catch (err) {
    console.log(err);
  }
};

const addNote = async (req, reply) => {
  try {
    const newNote = Note.create({ name: req.body.name });
    return newNote;
  } catch (err) {
    console.log(err);
  }
};

const updateNote = async (req, reply) => {
  try {
    const { id } = req.params;
    const note = req.body.note.name;
    const update = await Note.update({ name: note }, { where: { id: id } });
    return update;
  } catch (err) {
    console.log(err);
  }
};

const deleteNote = async (req, reply) => {
  try {
    const { id } = req.params;
    const note = await Note.destroy({ where: { id: id } });
    return note;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAllNotes, addNote, updateNote, deleteNote };
