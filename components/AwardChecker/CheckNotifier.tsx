import React from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { FormattedMessage } from 'react-intl';
import awardCheckMessages from 'messages/components/awardCheck';

import { connect } from 'react-redux';
import * as awardCheckerReducer from 'reducers/awardChecker';

import { ButtonTransparent, Box } from 'components/General';

import {
  PuzzleCountAwards,
  QuestionCountAwards,
  GoodQuestionCountAwards,
  TrueAnswerCountAwards,
} from './constants';

import { CheckNotifierProps } from './types';
import { StateType } from 'reducers/types';

const ButtonTransparentA = ButtonTransparent.withComponent('a');

class CheckNotifier extends React.Component<CheckNotifierProps> {
  componentDidUpdate(prevProps: CheckNotifierProps) {
    // puzzle count
    if (
      this.props.puzzles - prevProps.puzzles === 1 &&
      Object.values(PuzzleCountAwards).some(v => v === this.props.puzzles)
    ) {
      toast.info(
        <Box>
          <FormattedMessage
            {...awardCheckMessages.puzzleCountReaches}
            values={{ count: this.props.puzzles }}
          />
          <Box>
            <Link href="/awards">
              <ButtonTransparentA my={1} color="blue.0">
                &gt;&gt;
                <FormattedMessage {...awardCheckMessages.goToAwardsPage} />
              </ButtonTransparentA>
            </Link>
          </Box>
        </Box>,
      );
    }
    // dialogue count
    if (
      this.props.dialogues - prevProps.dialogues === 1 &&
      Object.values(QuestionCountAwards).some(v => v === this.props.dialogues)
    ) {
      toast.info(
        <Box>
          <FormattedMessage
            {...awardCheckMessages.questionCountReaches}
            values={{ count: this.props.dialogues }}
          />
          <Box>
            <Link href="/awards">
              <ButtonTransparentA my={1} color="blue.0">
                &gt;&gt;
                <FormattedMessage {...awardCheckMessages.goToAwardsPage} />
              </ButtonTransparentA>
            </Link>
          </Box>
        </Box>,
      );
    }
    // good question count
    if (
      this.props.goodQuestions - prevProps.goodQuestions === 1 &&
      Object.values(GoodQuestionCountAwards).some(
        v => v === this.props.goodQuestions,
      )
    ) {
      toast.info(
        <Box>
          <FormattedMessage
            {...awardCheckMessages.goodQuestionCountReaches}
            values={{ count: this.props.goodQuestions }}
          />
          <Box>
            <Link href="/awards">
              <ButtonTransparentA my={1} color="blue.0">
                &gt;&gt;
                <FormattedMessage {...awardCheckMessages.goToAwardsPage} />
              </ButtonTransparentA>
            </Link>
          </Box>
        </Box>,
      );
    }
    // true answer count
    if (
      this.props.trueAnswers - prevProps.trueAnswers === 1 &&
      Object.values(TrueAnswerCountAwards).some(
        v => v === this.props.trueAnswers,
      )
    ) {
      toast.info(
        <Box>
          <FormattedMessage
            {...awardCheckMessages.trueAnswerCountReaches}
            values={{ count: this.props.trueAnswers }}
          />
          <Box>
            <Link href="/awards">
              <ButtonTransparentA my={1} color="blue.0">
                &gt;&gt;
                <FormattedMessage {...awardCheckMessages.goToAwardsPage} />
              </ButtonTransparentA>
            </Link>
          </Box>
        </Box>,
      );
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: StateType) => ({
  puzzles: awardCheckerReducer.rootSelector(state).puzzles,
  dialogues: awardCheckerReducer.rootSelector(state).dialogues,
  goodQuestions: awardCheckerReducer.rootSelector(state).goodQuestions,
  trueAnswers: awardCheckerReducer.rootSelector(state).trueAnswers,
});

const withRedux = connect(mapStateToProps);

export default withRedux(CheckNotifier);
