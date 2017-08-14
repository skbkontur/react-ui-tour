import * as React from 'react';
import Button from '@skbkontur/react-ui/components/Button/Button';
import * as styles from './styles/App.less';

export const App: React.StatelessComponent<any> = (props) => {
  const handleClick = (e) => {

  };
  const handleBuyClick = (e) => {

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