import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';
import { nextAvailKeywordsSelector } from './selectors';

import Flex from 'components/General/Flex';
import { ReplayPathSelect } from 'components/Replay/Detail/ReplayPlay/ReplayPathSelect';
import { ReplayKeywordSelect } from 'components/Replay/Detail/ReplayPlay/ReplayKeywordSelect';

import { StateType, ActionContentType } from 'reducers/types';
import { DialogueFilterProps } from 'components/Workbench/Keyword/DialogueManipulatePanel/types';

const DialogueFilter = ({
  dialoguePath,
  nextAvailKeywords,
  setDialoguePath,
  pushDialoguePath,
}: DialogueFilterProps) => (
  <Flex mx={2} flexWrap="wrap">
    <ReplayPathSelect path={dialoguePath} setPath={setDialoguePath} />
    <ReplayKeywordSelect
      keywords={nextAvailKeywords}
      pushKeyword={pushDialoguePath}
    />
  </Flex>
);

const mapStateToProps = (state: StateType) => ({
  dialoguePath: addReplayReducer.rootSelector(state).dialoguePath,
  nextAvailKeywords: nextAvailKeywordsSelector(state),
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setDialoguePath: (dialoguePath: Array<string>) =>
    dispatch(addReplayReducer.actions.dialoguePath.set(dialoguePath)),
  pushDialoguePath: (keyword: string) =>
    dispatch(addReplayReducer.actions.dialoguePath.push(keyword)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(DialogueFilter);
