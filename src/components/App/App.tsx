import * as React from 'react';

import Button from '@skbkontur/react-ui/components/Button/Button';
import {connectHelper} from '../../connectHelper';

import {asyncMessage, say, bye, State as HelloState} from '../../reducers/hello';
import ClientApi from '../../clientApi';

import * as styles from  './App.less';

interface OwnProps {
  own: string;
}

interface StateProps {
  hello: HelloState;
}

const {propsGeneric, connect} = connectHelper<StateProps, OwnProps>(
    (state) => ({ hello: state.hello }),
  );
export const App: React.StatelessComponent<typeof propsGeneric> = (props) => {
  const handleClick = (e) => {
    props.dispatch(say('Hello, World!'));
  };
  const handleBuyClick = (e) => {
    props.dispatch(bye('Goodbye!'));
    props.dispatch(asyncMessage());
  };
  return (
    <div className={styles.root}>
      <div className={styles.header}>{props.hello.sayText}</div>
      <div>{props.own}</div>
      <Button onClick={handleClick}>Hello!</Button>
      <Button onClick={handleBuyClick}>Buy!</Button>
      <div className={styles.header}>{props.hello.byeText}</div>
    </div>
  );
};

export default connect(App);
