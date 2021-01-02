import { PreviewPuzzleDetailProps } from './types';
import PuzzleTitle from 'components/Puzzle/Detail/PuzzleTitle';
import ContentsFrame from 'components/Puzzle/Detail/ContentsFrame';
import {Status} from 'generated/globalTypes';

const PreviewPuzzleDetail = ({ getData }: PreviewPuzzleDetailProps) => {
  const data = getData();
  if (!data) return null;
  const { content, solution, title, genre, yami, anonymous } = data;

  return (
    <>
      <PuzzleTitle title={title} genre={genre} yami={yami} />
      <ContentsFrame text={content} anonymous={anonymous} status={Status.UNDERGOING} />
      <ContentsFrame text={solution} status={Status.UNDERGOING} />
    </>
  );
};

export default PreviewPuzzleDetail;
