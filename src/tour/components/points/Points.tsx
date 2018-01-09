import * as React from 'react';

import * as styles from './Points.less';

export interface Props {
  count: number;
  activePointIndex: number;
}

export function Points(props: Props) {
  const points = [];
  for (let i = 1; i <= props.count; i++) {
    if (i === props.activePointIndex) {
      points.push(<span key={i} className={
        `${styles.tooltipPoint} ${styles.tooltipPointActive}`}
      />);
    } else {
      points.push(<span key={i} className={styles.tooltipPoint}/>);
    }
  }
  return (
    <div className={styles.tooltipSelector}>
      {points}
    </div>
  );
}
