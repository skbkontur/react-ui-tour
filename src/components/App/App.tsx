import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {connect} from 'react-redux';
import {defaultAction} from '../../actions/default';
import Button from '@skbkontur/react-ui/components/Button/Button';
import {State} from '../../reducers';
import {DefaultState} from '../../reducers/default';
import {Dispatch} from 'redux';

import * as styles from  './App.less';

interface Props {
  own: string;
}

interface StateProps {
  defaultState: DefaultState;
}

interface DispatchProps {
  action: (value: string) => void;
}

export const App: React.StatelessComponent<Props & StateProps & DispatchProps> = (props) => {
  const handleClick = (e) => {
    props.action('Hello, World');
  };
  return (
    <div className={styles.root}>
      <div className={styles.header}>{props.defaultState.defaultField}</div>
      <div>{props.own}</div>
      <Button onClick={handleClick}>Hello!</Button>
    </div>
  );
};


export default connect<StateProps, DispatchProps, Props>(
  (state: State): StateProps => ({defaultState: state.default}),
  (dispatch): DispatchProps => ({action: (value: string) => dispatch(defaultAction(value))})
)(App);
