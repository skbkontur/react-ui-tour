import * as React from 'react';

import {connectHelper} from '../../connectHelper';

interface OwnProps {
}

interface StateProps {
}

interface DispatchProps {
}

const {propsGeneric, connect} = connectHelper<StateProps, DispatchProps, OwnProps>(
    (state) => ({ }),
    (dispatch) => ({ })
  );
export const App: React.StatelessComponent<typeof propsGeneric> = (props) => {
  return (
    <div>
    </div>
  );
};

export default connect(App);
