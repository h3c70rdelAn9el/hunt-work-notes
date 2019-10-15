import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      company: '',
      name: '',
      notes: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('proposals').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const proposal = doc.data();
        this.setState({
          key: doc.id,
          company: proposal.company,
          name: proposal.name,
          notes: proposal.notes
        });
      } else {
        console.log("No such proposal");
      }
    });
  }

  onChange = (e) => {
    const state = this.state 
    state[e.target.name] = e.target.value;
    this.setState({proposal:state});
  }

  onSubmit = (e) => {
    e.preventDefault();
    
    const { company, name, notes } = this.state;

    const updateRef = firebase.firestore().collection('proposals').doc(this.state.key);
    updateRef.set({
      company,
      name,
      notes
    }).then((docRef) => {
      this.setState({
        key: '',
        company: '',
        name: '',
        notes: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.log("error editing: ", error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              EDIT
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link tp={`/show/${this.state.key}`} class="btn btn-primary">Proposal List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input 
                  type="text"
                  className="form-control"
                  name="company"
                  value={this.state.company} 
                  onChange={this.onChange}
                  placeholder="Company" 
                />
              </div>
              <div className="form-group">
                <label htmlFor="company">Name</label>
                <input 
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name} 
                  onChange={this.onChange}
                  placeholder="Name" 
                />
              </div>
              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textArea 
                  class="form-control" 
                  name="notes" 
                  onChange={this.onChange} 
                  placeholder="Notes" 
                  cols="80" 
                  rows="3"
                >{this.state.notes}
                </textArea>
              </div>
              <button type="submit" class="btn btn-success">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
