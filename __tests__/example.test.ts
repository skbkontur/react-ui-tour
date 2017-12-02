import exampleReducer, {defaultState, say} from '../src/exampleFeature/exampleReducer';

describe('it works fine', () => {
  it('', () => {
    const result = exampleReducer(defaultState, say('hello'))
    expect(result.sayText).toBe('hello');
    expect(result.byeText).toBe('');
    expect(result).not.toBe(defaultState)
  })
})
