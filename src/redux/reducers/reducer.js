//import action types that are required by the reducer
import { CREATE, READ, UPDATE, DELETE } from "../actions/actions";
import {
  FETCH_NOTES_BEGIN,
  FETCH_NOTES_SUCESS,
  FETCH_NOTES_FAILURE,
} from "../actions/actions";

//initial state for redux store
const initialState = {
  notes: [],
};

//reducer function
export default function (state = initialState, action) {
  switch (action.type) {
    //handless creation of data
    case CREATE:
      return {
        notes: [...state.notes, action.payload.note],
      };

    //reads all the data from the store
    case READ:
      return state;

    //handles note updates in redux store
    case UPDATE: {
      const updatedNote = { ...action.payload.note };
      return {
        notes: [...state.notes].map((note) => {
          if (note.id === updatedNote.id) {
            return updatedNote;
          } else return note;
        }),
      };
    }

    //handles note deletion from redux store
    case DELETE: {
      const { id } = action.payload;
      return {
        notes: [...state.notes].filter((note) => note.id !== id),
      };
    }

    //indicates when fetching begins
    case FETCH_NOTES_BEGIN:
      return {
        ...state,
        loading: true,
        errors: null,
      };

    //indicates when notes are fetched successfully
    case FETCH_NOTES_SUCESS:
      return {
        ...state,
        loading: false,
        notes: action.payload.notes,
      };

    //indicates when there is a failure in fetching notes
    case FETCH_NOTES_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
        notes: [],
      };

    //returns default state, in case some unknown action type is discovered
    default:
      return state;
  }
}
