import * as React from 'react';
import styles from './Points.less';

export interface PointsProps {
  count: number;
  activePointIndex: number;
}

export function Points(props: PointsProps) {
  const points = [] as React.ReactElement<any>[];
  for (let i = 1; i <= props.count; i++) {
    if (i === props.activePointIndex) {
      points.push(
        <span
          key={i}
          className={`${styles.tooltipPoint} ${styles.tooltipPointActive}`}
        />
      );
    } else {
      points.push(<span key={i} className={styles.tooltipPoint} />);
    }
  }

  return <div className={styles.tooltipSelector}>{points}</div>;
}
