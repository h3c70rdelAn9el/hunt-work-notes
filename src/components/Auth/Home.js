import React, { Component } from 'react';
import firebase from '../../Firebase';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class Home extends Component {
    constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('proposals');
    this.unsubscribe = null;
    this.state = {
      proposals: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const proposals = [];
    querySnapshot.forEach((doc) => {
      const { company, name, notes } = doc.data();
      proposals.push({
        key: doc.id,
        doc,
        company,
        name,
        notes,
      });
    });
    this.setState({
      proposals
    });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }


  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Proposal List
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/create" activeClassName="current">Add</Link></h4>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Name</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {this.state.proposals.map(proposal =>
                  <tr>
                    <td><a href={`/show/${proposal.key}`}>{proposal.company}</a></td>
                    <td>{proposal.name}</td>
                    <td>{proposal.notes}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <button onClick={() => firebase.auth().signOut()}>Sign out</button>
      </div> 
    )
  };
}
