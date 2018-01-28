import * as React from 'react';

export interface TourProviderProps {
  predicate: (id: string) => boolean;
  onTourShown: (id: string) => void;
}

export class TourProvider extends React.Component<TourProviderProps, {}> {
  static contextName = '__tour__';
  static childContextTypes = {
    [TourProvider.contextName]: React.PropTypes.object.isRequired,
  };

  currentId: string;
  queue = [] as string[];
  listeners: {
    [id: string]: () => void;
  } = {};

  render() {
    return React.Children.only(this.props.children);
  }

  getChildContext() {
    return {
      [TourProvider.contextName]: {
        subscribe: this.subscribe,
        unsubscribe: this.unsubscribe,
        onShown: this.onShown,
      },
    };
  }

  subscribe = (id, callback) => {
    this.listeners[id] = callback;
    this.pushToQueue(id);
  }

  unsubscribe = (id) => {
    this.removeFromQueue(id);
    delete this.listeners[id];
  }

  onShown = (id) => this.props.onTourShown(id);

  notify(id) {
    this.listeners[id]();
  }

  removeFromQueue(id) {
    if (id !== this.currentId) return;
    this.currentId = this.queue.find(id => this.props.predicate(id));
    this.queue = this.queue.filter(id => id !== this.currentId);
    if (this.currentId) {
      this.notify(this.currentId);
    }
  }

  pushToQueue(id) {
    this.queue = this.currentId ? this.queue.concat(id) : this.queue;
    if (!this.currentId && this.props.predicate(id)) {
      this.currentId = id;
      this.notify(id);
    }
  }
}
