import React from 'react';
import Board from './components/Board';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDarkMode: false,
    }
  }

  changeTheme() {
    this.setState({
      isDarkMode: this.state.isDarkMode ? false : true
    });
  }

  // componentDidMount() {
  //   // Alert when closing or refreshing page
  //   window.onbeforeunload = function(e) {
  //     var dialogText = '';
  //     e.returnValue = dialogText;
  //     return dialogText;
  //   }
  // }

  render() {
    return (
      <div className={this.state.isDarkMode? "app-darkMode" : "app"} >
        <Board changeTheme={() => this.changeTheme()}/>
      </div>
    );
  }
}

export default App;
