import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';


export default class Create extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('proposals');
    this.state = {
      company: '',
      name: '',
      notes: ''
    };
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { company, name, notes } = this.state;

    this.ref.add({
      company,
      name,
      notes
    }).then((docRef) => {
      this.setState({
        company: '',
        name: '',
        notes: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding proposal: ", error);
    });
  };

  render() {
    const { company, name, notes } = this.state;
    return (
      <div className = "container">
        <div className = "panel-default">
          <div className = "panel-heading">
            <h3 className = "panel-title">
              Add Proposal
            </h3>
          </div>
          <div className = "panel-body">
            <h4><Link to = "/" className = "btn btn-primary">Proposal List</Link></h4>
            <form onSubmit = {this.onSubmit}>
              <div className = "form-group">
                <label htmlFor = "company">Company:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="company"
                  onChange={this.onChange}
                  placeholder="Company"
                  value={company}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="name"
                  onChange={this.onChange}
                  placeholder="Full Name"
                  value={name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="notes">Notes:</label>
                <textarea  
                  className="form-control"
                  name="notes"
                  onChange={this.onChange}
                  placeholder="Notes" 
                  cols="80"
                  rows="4"
                >
                {notes}
                </textarea>
              </div>
              <button type="submit" class="btn btn-success">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
