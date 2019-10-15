import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from '../../Firebase';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         Placeholder
//       </div>
//     );
//   }
// }


class App extends Component {
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
            <h4><Link to="/create">Add</Link></h4>
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
                    <td><Link to={`/show/${proposal.key}`}>{proposal.company}</Link></td>
                    <td>{proposal.name}</td>
                    <td>{proposal.notes}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
