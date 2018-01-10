import {
  tourReducer,
  defaultState,
  pushToQueue,
  removeFromQueueSync as removeFromQueue,
  TourState,
} from '../src/tour/tourReducer';

describe('', () => {
  it('', () => {
    let newState = tourReducer(defaultState, pushToQueue('id1'));
    expect(newState.current).toBe('id1')
    expect(newState.queue.length).toBe(0)

    newState = tourReducer(newState, pushToQueue('id2'))
    expect(newState.current).toBe('id1')
    expect(newState.queue.length).toBe(1)

    newState = tourReducer(newState, pushToQueue('id3'))
    expect(newState.current).toBe('id1')
    expect(newState.queue.length).toBe(2)
    expect(newState.queue[0]).toBe('id2')

    newState = tourReducer(newState, removeFromQueue('id2'))
    expect(newState.current).toBe('id1')
    expect(newState.queue.length).toBe(2)
    expect(newState.queue[0]).toBe('id2')

    newState = tourReducer(newState, removeFromQueue('id1'))
    expect(newState.current).toBe('id2')
    expect(newState.queue.length).toBe(1)
    expect(newState.queue[0]).toBe('id3')
  })
})
