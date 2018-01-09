import * as React from 'react';

import * as styles from './TourButton.less';

export interface Props {
  color: string;
  arrow?: string;
  style?: Object;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactText;
}

export function TourButton(props: Props) {
  let className = `${styles.tourButton} ${styles[props.color + 'TourButton']}`;
  if (props.arrow === 'right' || props.arrow === 'left') {
    className = `${className} ${styles.tourButtonArrow} ${styles[props.arrow + 'TourButtonArrow']}`;
  }
  return (
    <div style={{display: 'inline-block'}}>
      <button style={props.style} className={className} onClick={props.onClick}>
        <div style={{position: 'relative'}}>
          {props.children}
        </div>
      </button>
    </div>
  );
}
