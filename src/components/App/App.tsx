import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {defaultAction} from '../../actions/default';
import Button from '@skbkontur/react-ui/components/Button/Button';
import {State} from '../../reducers';
import {DefaultState} from '../../reducers/default';
import {Dispatch} from 'redux';
import {connectHelper} from '../../connectHelper';

import * as styles from  './App.less';

interface OwnProps {
  own: string;
}

interface StateProps {
  defaultState: DefaultState;
}

interface DispatchProps {
  action: (value: string) => void;
}

const { propsGeneric, connect } =
    connectHelper<StateProps, DispatchProps, OwnProps>(
      (state: State) => ({defaultState: state.default}),
      (dispatch) => ({action: (value) => dispatch(defaultAction(value))}),
    );
type ComponentProps = typeof propsGeneric;

export const App2: React.StatelessComponent<ComponentProps> = (props) => {
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

export class App extends React.Component<ComponentProps, any> {
  render() {
    const handleClick = (e) => {
      this.props.action('Hello, World');
    };
    return (
      <div className={styles.root}>
        <div className={styles.header}>{this.props.defaultState.defaultField}</div>
        <div>{this.props.own}</div>
        <Button onClick={handleClick}>Hello!</Button>
      </div>
    );
  }
}

export default connect(App);
