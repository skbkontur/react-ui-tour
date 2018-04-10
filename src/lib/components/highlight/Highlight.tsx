import * as React from 'react';

const styles = require('./Highlight.less');

export interface HighlightProps {
  pos: ClientRect;
  highlight: React.ReactElement<any>;
  color?: string;
}

export function Highlight(props: HighlightProps) {
  const { pos, highlight, color } = props;

  const highlightRoot = React.cloneElement(highlight, {
    ...highlight.props,
    style: {
      ...highlight.props.style,
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }
  });

  const width = pos.right - pos.left;
  const height = pos.bottom - pos.top;
  const computedStyles: React.CSSProperties = {
    borderColor: color,
    borderTopWidth: pos.top + document.documentElement.scrollTop,
    borderLeftWidth: pos.left + document.documentElement.scrollLeft,
    borderRightWidth: document.documentElement.offsetWidth - pos.right,
    borderBottomWidth: document.documentElement.offsetHeight - pos.bottom,
    width: width,
    height: height
  };

  return (
    <div className={styles.wrapper} style={computedStyles}>
      {highlightRoot}
    </div>
  );
}
