import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {connect} from 'react-redux';
import {defaultAction} from '../../actions/default';
import Button from '@skbkontur/react-ui/components/Button/Button';

import * as styles from  './App.less';

export const App = (props) => {
  const handleClick = (e) => {
    props.dispatch(defaultAction('Hello, World'));
  };
  return (
    <div className={styles.root}>
      <div className={styles.header}>{props.defaultState.defaultField}</div>
      <Button onClick={handleClick}>Hello!</Button>
    </div>
  );
};

export default connect(state => ({defaultState: state.defaultReducer}))(App);
