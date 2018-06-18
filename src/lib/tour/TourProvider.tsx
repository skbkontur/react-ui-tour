import * as React from "react";

export interface TourContextValue {
  subscribe: (id: string, callback: () => void) => void;
  unsubscribe: (id: string) => void;
  onShown: (id: string) => void;
}

export const TourContext = React.createContext({} as TourContextValue);

export interface TourProviderProps {
  predicate?: (id: string) => boolean;
  onTourShown?: (id: string) => void;
}

export class TourProvider extends React.Component<TourProviderProps, {}> {
  currentId: string | undefined;
  queue = [] as string[];
  listeners: {
    [id: string]: () => void;
  } = {};

  render() {
    return (
      <TourContext.Provider
        value={{
          subscribe: this.subscribe,
          unsubscribe: this.unsubscribe,
          onShown: this.onShown
        }}
      >
        {React.Children.only(this.props.children)}
      </TourContext.Provider>
    );
  }

  subscribe = (id: string, callback: () => void) => {
    this.listeners[id] = callback;
    this.pushToQueue(id);
  };

  unsubscribe = (id: string) => {
    this.removeFromQueue(id);
    delete this.listeners[id];
  };

  onShown = (id: string) =>
    this.props.onTourShown && this.props.onTourShown(id);

  idPredicate = id => {
    const predicate = this.props.predicate;
    return predicate ? predicate(id) : true;
  };

  notify(id) {
    this.listeners[id]();
  }

  removeFromQueue(id) {
    if (id !== this.currentId) return;
    this.currentId = this.queue.find(this.idPredicate);
    this.queue = this.queue.filter(id => id !== this.currentId);
    if (this.currentId) {
      this.notify(this.currentId);
    }
  }

  pushToQueue(id) {
    this.queue = this.currentId ? this.queue.concat(id) : this.queue;
    if (!this.currentId && this.idPredicate(id)) {
      this.currentId = id;
      this.notify(id);
    }
  }
}
