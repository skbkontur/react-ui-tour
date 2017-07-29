import {connect, DispatchProp} from 'react-redux';

interface Func<T> {
  ([...args]: any): T;
}

interface ConnectHelper<TProps, TOwnProps> {
  propsGeneric: TProps & TOwnProps;
  connect: (component) => React.ComponentClass<TOwnProps>;
}

export function connectHelper<TStateProps, TDispatchProps, TOwnProps>(
  mapStateToProps: Func<TStateProps>,
  mapDispatchToProps: Func<TDispatchProps>
): ConnectHelper<TStateProps & TDispatchProps, TOwnProps>;

export function connectHelper<TStateProps, TOwnProps>(
  mapStateToProps: Func<TStateProps>,
): ConnectHelper<TStateProps & DispatchProp<TStateProps>, TOwnProps>;

export function connectHelper(mapStateToProps, mapDispatchToProps?) {
  return {
    propsGeneric: null,
    connect: (component) =>
      connect(mapStateToProps, mapDispatchToProps)
        (component),
  };
}
