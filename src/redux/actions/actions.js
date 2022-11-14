import axios from "axios";

//action types created and exported
export const CREATE = "Add new note";
export const READ = "fetch all notes";
export const UPDATE = "update note";
export const DELETE = "delete note";

export const FETCH_NOTES_BEGIN = "begin fetching notes";
export const FETCH_NOTES_SUCESS = "Notes fetched successfully";
export const FETCH_NOTES_FAILURE = "Failed to fetch notes";

//disptached when we fetch notes from database
export const fetchNotesBegin = () => ({
  type: FETCH_NOTES_BEGIN,
});

//dispatched when notes are successfully fetched
export const fetchNotesSuccess = (notes) => ({
  type: FETCH_NOTES_SUCESS,
  payload: { notes },
});

//dispatched when notes are fails to load
export const fetchNotesFailure = (errors) => ({
  type: FETCH_NOTES_FAILURE,
  payload: { errors },
});

//dispatched when note needs to be created
export const createNote = (note) => ({
  type: CREATE,
  payload: { note },
});

//dispatched when all the notes stored in redux store needs to be read
export const readNotes = () => {
  return (dispatch) => {
    dispatch(fetchNotesBegin());
    return axios
      .get("/api/notes")
      .then(({ data }) => {
        console.log(data);
        console.log("success");
        dispatch(fetchNotesSuccess(data));
      })
      .catch((error) => dispatch(fetchNotesFailure(error)));
  };
};

//dispatched when certain note needs to be updated
export const updateNote = (note) => ({
  type: UPDATE,
  payload: { note },
});

//dispatched when certain note needs to be removed from redux store
export const deleteNote = (id) => ({
  type: DELETE,
  payload: { id },
});
