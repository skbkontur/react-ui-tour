import {connect, DispatchProp} from 'react-redux';
import {State} from './reducers';

interface Func<T> {
  ([...args]: any): T;
}

interface MapStateToProps<TStateProps, TOwnProps> {
  (state: State, ownProps?: TOwnProps): TStateProps;
}

interface ConnectHelper<TProps, TOwnProps> {
  propsGeneric: TProps & TOwnProps;
  connect: (component) => React.ComponentClass<TOwnProps>;
}

export function connectHelper<TStateProps, TDispatchProps, TOwnProps>(
  mapStateToProps: MapStateToProps<TStateProps, TOwnProps>,
  mapDispatchToProps: Func<TDispatchProps>
): ConnectHelper<TStateProps & TDispatchProps, TOwnProps>;

export function connectHelper<TStateProps, TOwnProps>(
  mapStateToProps: MapStateToProps<TStateProps, TOwnProps>,
): ConnectHelper<TStateProps & DispatchProp<TStateProps>, TOwnProps>;

export function connectHelper(mapStateToProps, mapDispatchToProps?) {
  return {
    propsGeneric: null,
    connect: (component) =>
      connect(mapStateToProps, mapDispatchToProps)
        (component),
  };
}
