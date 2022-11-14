import React, { Component } from "react";

//Form component which is used in addition as well as editting
export default class Form extends Component {
  constructor(props) {
    super(props);

    //initializing state
    this.state = {
      name: !this.props.name ? "" : this.props.name,
    };
  }

  //funtion that upadtes state on input change
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  //function that sends the final data when user presses Submit
  handleSubmit = () => {
    const { name } = this.state;
    if (this.props.name) {
      this.props.updateNote({ name });
    } else {
      this.props.addNote({ name });
    }
  };

  //calls parent function to close form
  handleCancel = () => this.props.closeForm();

  render() {
    return (
      <form className='note-row'>
        <div className='note-name'>
          <input
            value={this.state.name}
            onChange={this.handleChange}
            name='name'
            placeholder='Write a note'
            type='text'
          />
        </div>
        <div className='operations'>
          <span onClick={this.handleSubmit} className='btn done'>
            <i className='fas fa-check' />
          </span>
          <span onClick={this.handleCancel} className='btn cancel'>
            <i className='fas fa-times' />
          </span>
        </div>
      </form>
    );
  }
}
