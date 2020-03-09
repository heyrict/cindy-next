import { PreviewPuzzleDetailProps } from './types';
import PuzzleTitle from 'components/Puzzle/Detail/PuzzleTitle';
import ContentsFrame from 'components/Puzzle/Detail/ContentsFrame';

const PreviewPuzzleDetail = ({ getData }: PreviewPuzzleDetailProps) => {
  const data = getData();
  if (!data) return null;
  const { content, solution, title, genre, yami, anonymous } = data;

  return (
    <>
      <PuzzleTitle title={title} genre={genre} yami={yami} />
      <ContentsFrame text={content} anonymous={anonymous} status={0} />
      <ContentsFrame text={solution} status={0} />
    </>
  );
};

export default PreviewPuzzleDetail;
