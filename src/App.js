import React, { Component } from 'react';
import './App.css'

import RegisterPage from './components/RegisterPage'
import ModifyPage from './components/ModifyPage'

const liff = window.liff;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: '',
      userId: '',
      pictureUrl: '',
      statusMessage: '',

      userRegistered: false
    };
    
    this.initialize = this.initialize.bind(this);
    this.closeApp = this.closeApp.bind(this);
  }
  
  initialize(){
    liff.init(async (data) => {
      let profile = await liff.getProfile();
      this.setState({
        displayName: profile.displayName,
        userId: profile.userId,
        pictureUrl: profile.pictureUrl,
        statusMessage: profile.statusMessage
      });
    });
  }

  componentDidMount() {
    window.addEventListener('load', this.initialize);

    fetch('/api/check-users', {
      method: 'POST',
      body: JSON.stringify({ userID: this.state.userId }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(
      res => res.json()
    ).then(data => {
      console.log(data);
      if (data.IDregistered === true) {
        console.log("[ERROR] ID registered!")
        this.setState({ userRegistered: true })
      } else {
        // console.log("ID not registered yet")
        this.setState({ userRegistered: false })
      }
    });
  }


  closeApp(event) {
    event.preventDefault();
    liff.sendMessages([{
      type: 'text',
      text: "Bye Bye!!!"
    }]).then(() => {
      liff.closeWindow();
    });
  }


  render() {
    if (this.state.userRegistered === false) {
      return (
        <RegisterPage
          displayName={this.state.displayName}
          userId={this.state.userId}
          pictureUrl={this.state.pictureUrl}
          statusMessage={this.state.statusMessage} />
      );
    } else {
      return (
        <ModifyPage
          displayName={this.state.displayName}
          userId={this.state.userId}
          pictureUrl={this.state.pictureUrl}
          statusMessage={this.state.statusMessage} />
      )
    }
  }
}
export default App;

// <div className="container">
//   <div className="columns m-t-10">
//     <div className="column col-xs-12">
//       <div className="panel">
//         <div className="panel-header text-center">
//           <figure className="avatar avatar-lg">
//             <img src={this.state.pictureUrl} alt="Avatar" />
//           </figure>
//           <div className="panel-title h5 mt-10">{this.state.displayName}</div>
//           <div className="panel-subtitle">{this.state.statusMessage}</div>
//         </div>
//         <div className="panel-footer">
//           <button className="btn btn-primary btn-block" onClick={this.closeApp}>Close</button>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>