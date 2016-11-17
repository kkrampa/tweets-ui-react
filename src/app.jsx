import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.scss';
import React from 'react';


export default class App extends React.Component {
  render() {
    return (
      <div className="container">
          {this.props.children}
      </div>
    );
  }
}
