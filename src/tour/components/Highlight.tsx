import * as React from 'react';

export interface Props {
  pos: ClientRect;
  root: React.ReactElement<any>;
  rootOffset?: number;
  backgroundColor?: string;
}

export const Highlight: React.StatelessComponent<Props> = (props: Props) => {
  const {pos, root, backgroundColor, rootOffset} = props;
  const wrapperStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    borderStyle: 'solid',
    borderColor: backgroundColor,
    padding: rootOffset,
    borderTopWidth: pos.top - rootOffset,
    borderLeftWidth: pos.left - rootOffset,
    borderRightWidth: document.documentElement.offsetWidth - pos.right - rootOffset,
    borderBottomWidth: document.documentElement.offsetHeight - pos.bottom - rootOffset,
    width: pos.width,
    height: pos.height,
  };

  return <div style={wrapperStyles}>{root}</div>;
};

Highlight.defaultProps = {
  rootOffset: 0,
  backgroundColor: 'rgba(0,0,0,0)',
};
