import React, { Component } from "react";
import Note from "./components/note";
import Form from "./components/form";
import "./style.css";
import { connect } from "react-redux";
import {
  createNote,
  deleteNote,
  updateNote,
  readNotes,
} from "./redux/actions/actions";
import axios from "axios";
import uuid from "uuid";

//main component that wraps major part of application
class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = { openAddForm: false };
  }

  componentDidMount() {
    this.props.readNotes();
    console.log("props", this.props);
    console.log(this.props.notes);
  }

  //function to trigger form rendering
  handleAddClick = () => this.setState({ openAddForm: true });

  //function to handle note addition
  handleAddNote = ({ name }) => {
    if (name == "") name = "untitled";

    const newNote = {
      id: uuid.v4(),
      name,
    };

    axios
      .post("/api/notes", { ...newNote })
      .then(({ data: { name } }) => {
        console.log(`Note - ${name} added successfully`);
      })
      .catch((e) => console.log("Addition failed , Error ", e));

    this.props.createNote(newNote);
    this.handleCancel();
  };

  //function to handle note deletion
  handleDeleteNote = (id) => {
    axios
      .delete(`/api/notes/${id}`)
      .then(({ data: { name } }) => {
        console.log(`Note - ${name} deleted successfully`);
      })
      .catch((e) => console.log("Deletion failed, Error ", e));

    this.props.deleteNote(id);
  };

  //function to handle note updates
  handleUpdateNote = (note) => {
    axios
      .put(`/api/notes/${note.id}`, { note })
      .then(({ data: { name } }) => {
        console.log(`Note - ${name} updated successfully`);
      })
      .catch((e) => console.log("Updation failed, Error ", e));

    this.props.updateNote(note);
  };

  //function to unmount form component or in short close it
  handleCancel = () => this.setState({ openAddForm: false });

  render() {
    const { loading, errors } = this.props;

    return (
      <>
        {/* Heading */}
        <h1>
          <i className='fas fa-list-alt'></i> Add Notes
        </h1>

        {/* Notes component starts */}
        <div className='note'>
          <div className='heading note-row'>
            <div className='note-name'>Name</div>
            <div className='operations'> Operations</div>
          </div>

          {this.state.loading ? (
            <div className='note-row'>
              <div className='msg'>Loading Notes...</div>
            </div>
          ) : this.state.errors ? (
            <div className='note-row'>
              <div className='err msg'>Error in loading Notes</div>
            </div>
          ) : (
            <>
              {this.props.notes.length > 0 ? (
                this.props.notes.map((note, i) => {
                  return (
                    <Note
                      key={note.name + "-" + note.id}
                      id={note.id}
                      name={note.name}
                      handleDelete={this.handleDeleteNote}
                      handleUpdate={this.handleUpdateNote}
                      closeForm={this.handleCancel}
                    />
                  );
                })
              ) : (
                <div className='note-row'>
                  <div className='msg'>List is empty.</div>
                </div>
              )}
            </>
          )}
        </div>
        {/* Notes component ends */}

        {!this.state.openAddForm ? (
          <span onClick={this.handleAddClick} className='add btn'>
            <i className='fas fa-plus'></i>
          </span>
        ) : (
          <div className='note'>
            <Form addNote={this.handleAddNote} closeForm={this.handleCancel} />
          </div>
        )}
      </>
    );
  }
}

//subscribing to redux store updates
const mapStateToProps = ({ notes, loading, errors }) => ({
  notes,
  loading,
  errors,
});

//connecting our main component to redux store
export default connect(mapStateToProps, {
  createNote,
  deleteNote,
  updateNote,
  readNotes,
})(Notes);
