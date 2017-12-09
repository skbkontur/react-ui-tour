import {createAction, handleActions, combineActions as combine, Action} from 'redux-actions';

export const defaultState = {
  current: '',
  queue: [] as string[]
}

export type TourState = typeof defaultState;

//add pushToQueueSync with reading of already shown tours
export const pushToQueue = createAction('push', (id) => id);
export const removeFromQueueSync = createAction('remove', (id) => id);

export const removeFromQueue = (id) =>
  (d, s, api) => {
    //add to adjustments shown time [id => time]
    setTimeout(() => d(removeFromQueueSync(id)), 5000);
  }

export const tourReducer = handleActions({
  [combine(pushToQueue)]: (state, action: Action<string>) => {
    const {current, queue} = state;
    const {payload: id} = action;
    return {
      current: current || id, queue: current ? queue.concat(id) : queue
    };
  },
  [combine(removeFromQueueSync)]: (state, action: Action<string>) => {
    const {payload: id} = action;
    const {current, queue} = state;
    if (id !== current) return state;
    return {
      current: queue[0],
      queue: queue.filter(id => id !== queue[0])
    };
  },
}, defaultState)
