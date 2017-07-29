import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Button from '@skbkontur/react-ui/components/Button/Button';
import {State} from '../../reducers';
import {Dispatch, Action} from 'redux';
import {connectHelper} from '../../connectHelper';
import {createAction, handleAction} from 'redux-actions';

import {action, State as HelloState} from '../../reducers/awesomeReducer';

import * as styles from  './App.less';

interface OwnProps {
  own: string;
}

const { propsGeneric, connect } =
    connectHelper<HelloState, OwnProps>(
      (state: State) => state.hello,
    );
type ComponentProps = typeof propsGeneric;

export const App: React.StatelessComponent<ComponentProps> = (props) => {
    const handleClick = (e) => {
      props.dispatch(action('Hello, World!'));
    };
    return (
      <div className={styles.root}>
        <div className={styles.header}>{props.value}</div>
        <div>{props.own}</div>
        <Button onClick={handleClick}>Hello!</Button>
      </div>
    );
};

export default connect(App);
