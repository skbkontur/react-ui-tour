import * as React from 'react';
import {connectHelper} from '../helpers/reduxHelpers';
import {asyncMessage, say, bye} from './exampleReducer';

interface State {
  value: string;
}

interface Props {
  number: number;
}

const {connect, propsGeneric} = connectHelper(
  (state, props: Props) => state.example,
  {asyncMessage}
)

export class ExampleComponent extends React.Component<typeof propsGeneric, State> {
  state = {
    value: 'Hello',
  }
  render() {
    const {sayText, asyncMessage, number} = this.props;
    const {value} = this.state;
    return (
      <div>
        <div>Example N{number}</div>
        <span className="say">
          You say: {sayText || 'nothing'}
        </span>
        <hr />
        <input value={value} onChange={this.handleChange}/>
        <button onClick={() => asyncMessage(value)}> Say Hello </button>
      </div>
    )
  }
  handleChange = (e) => {
    this.setState({value: e.target.value});
  }
}

export default connect(ExampleComponent);
