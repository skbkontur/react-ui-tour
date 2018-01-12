import * as React from 'react';

const styles = require('./Highlight.less');

export interface HighlightProps {
  pos: ClientRect;
  root: React.ReactElement<any>;
  backgroundColor?: string;
}

export function Highlight(props: HighlightProps) {
  const {pos, root, backgroundColor} = props;
  const computedStyles: React.CSSProperties = {
    borderColor: backgroundColor,
    borderTopWidth: pos.top,
    borderLeftWidth: pos.left,
    borderRightWidth: document.documentElement.offsetWidth - pos.right,
    borderBottomWidth: document.documentElement.offsetHeight - pos.bottom,
    width: pos.width,
    height: pos.height,
  };

  return (
    <div className={styles.wrapper} style={computedStyles}>
      {root}
    </div>
  );
}
