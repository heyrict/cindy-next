import { toast } from 'react-toastify';

import { Query } from 'react-apollo';
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
      if (loading) return <span>Loading...</span>;
      if (!data || !data.sui_hei_puzzle_by_pk) return null;

      const solution = data.sui_hei_puzzle_by_pk.solution;
      return children(solution);
    }}
  </Query>
);

export default WithSolution;
