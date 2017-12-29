import * as React from 'react';

const styles = require('./Highlight.less');

export interface Props {
  pos: ClientRect;
  root: React.ReactElement<any>;
  rootOffset?: number;
  backgroundColor?: string;
}

export const Highlight: React.StatelessComponent<Props> = (props: Props) => {
  const {pos, root, backgroundColor, rootOffset} = props;
  const computedStyles: React.CSSProperties = {
    borderColor: backgroundColor,
    padding: rootOffset,
    borderTopWidth: pos.top - rootOffset,
    borderLeftWidth: pos.left - rootOffset,
    borderRightWidth: document.documentElement.offsetWidth - pos.right - rootOffset,
    borderBottomWidth: document.documentElement.offsetHeight - pos.bottom - rootOffset,
    width: pos.width,
    height: pos.height,
  };

  return <div className={styles.wrapper} style={computedStyles}>{root}</div>;
};

Highlight.defaultProps = {
  rootOffset: 0,
};
