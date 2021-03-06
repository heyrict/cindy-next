import { toast } from 'react-toastify';

import Loading from 'components/General/Loading';

import { Query } from '@apollo/client/react/components';
import { PUZZLE_SOLUTION_QUERY } from 'graphql/Queries/Puzzles';

import {
  PuzzleSolutionQuery,
  PuzzleSolutionQueryVariables,
} from 'graphql/Queries/generated/PuzzleSolutionQuery';
import { WithSolutionProps } from './types';

const WithSolution = ({ puzzleId, children }: WithSolutionProps) => (
  <Query<PuzzleSolutionQuery, PuzzleSolutionQueryVariables>
    query={PUZZLE_SOLUTION_QUERY}
    variables={{ id: puzzleId }}
  >
    {({ data, error, loading }) => {
      if (error) {
        toast.error(error.message);
        return null;
      }
      if (loading) return <Loading centered />;
      if (!data || !data.puzzle) return null;

      const solution = data.puzzle.solution;
      return children(solution);
    }}
  </Query>
);

export default WithSolution;
