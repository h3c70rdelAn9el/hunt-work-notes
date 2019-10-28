// import React, { Component } from 'react';
// import firebase from '../Firebase';
// import { Link } from 'react-router-dom';

// class Show extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       proposal: {},
//       key: ''
//     };
//   }

//   componentDidMount() {
//     const ref = firebase.firestore().collection('proposals').doc(this.props.match.params.id);
//     ref.get().then(() => {
//       if (doc.exists) {
//         this.setState({
//           proposal: doc.data(),
//           key: doc.id,
//           isLoading: false
//         });
//       } else {
//         console.log("No such file!");
//       }
//     });
//   }

//   delete(id) {
//     firebase.firestore().collection('proposals').doc(id).delete().then(() => {
//       this.props.history.push("/")
//     }).catch((error) => {
//       console.error("Error removing: ", error);
//     });
//   }

//   render() {
//     return (
//       <div className="container">
//         <div className="panel panel-default">
//           <div className="panel-heading">
//             <h4><Link tp="/">Proposals</Link></h4>
//             <h3 className="panel-title">
//               {this.state.proposal.title}
//             </h3>
//           </div>
//           <div className="panel-body">
//             <dl>
//               <dt>Description</dt>
//               <dd>{this.state.proposal.description}</dd>
//               <dt>Name: </dt>
//               <dd>{this.state.proposal.name}</dd>
//             </dl>
//             <Link to={`/edit/${this.state.key}`} className="btn btn-success">Edit</Link>
//             <button onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Show;





/////////////




import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      proposal: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('proposals').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          proposal: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('proposals').doc(id).delete().then(() => {
      alert("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/">Proposal List</Link></h4>
            <h3 class="panel-title">
              {this.state.proposal.title}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Description:</dt>
              <dd>{this.state.proposal.company}</dd>
              <dt>Author:</dt>
              <dd>{this.state.proposal.name}</dd>
              <dt>Notes:</dt>
              <dd>{this.state.proposal.notes}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;