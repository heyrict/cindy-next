import React from 'react';
import styled from 'theme/styled';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/components/puzzle';

export const NewQuestionBase = styled.div`
  text-align: center;
  border-radius: 10px;
  padding: 0px 6px;
  margin-right: 6px;
  margin-bottom: 3px;
  font-size: 0.9em;
  font-weight: bold;
  background-color: ${p => p.theme.colors.grape[0]};
  border: 2px solid ${p => p.theme.colors.grape[6]};
  color: ${p => p.theme.colors.grape[7]};
  display: inline-flex;
  align-items: center;
`;

const NewQuestion = () => (
  <NewQuestionBase>
    <FormattedMessage {...messages.haveQuestionsToBeAnswered} />
  </NewQuestionBase>
);

export default NewQuestion;
