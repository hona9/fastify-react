import React, { Component } from "react";
import Form from "./form";

//component that renders individual note stored in redux store
export default class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      openEditForm: false,
    };
  }

  //setting necessary values on mounting of component
  componentDidMount() {
    const { name } = this.props;
    this.setState({ name });
  }

  //function to trigger form view and close item view
  handleEditClick = () => this.setState({ openEditForm: true });

  //calls parent's function to updated note
  handleUpdate = ({ name }) => {
    const updatedNote = {
      id: this.props.id,
      name,
    };
    this.props.handleUpdate(updatedNote);
    this.handleCancel();
  };

  //calls parent's function to delete note from store
  handleDelete = () => this.props.handleDelete(this.props.id);

  //function to close form
  handleCancel = () => this.setState({ openEditForm: false });

  render() {
    return (
      <>
        {!this.state.openEditForm ? (
          <div className='note-row'>
            <div className='note-name'>{this.state.name}</div>
            <div className='operations'>
              <span onClick={this.handleEditClick} className='btn edit'>
                <i className='fas fa-pen'></i>
              </span>
              <span onClick={this.handleDelete} className='btn delete'>
                <i className='fas fa-trash'></i>
              </span>
            </div>
          </div>
        ) : (
          <Form
            name={this.state.name}
            closeForm={this.handleCancel}
            updateNote={this.handleUpdate}
          />
        )}
      </>
    );
  }
}
