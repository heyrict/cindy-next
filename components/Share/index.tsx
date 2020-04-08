import { ButtonTransparent, Img } from 'components/General';
import shareIcon from 'svgs/share.svg';

import { ShareProps } from './types';

const Share = (props: ShareProps) => (
  <ButtonTransparent
    onClick={() => {
      const params = {
        title: props.title,
        text: props.text,
        url: props.url || window.location.href,
        fbId: props.fbId,
        hashtags: props.hashtags,
      };
      window.navigator &&
        window.navigator.share &&
        window.navigator.share(params);
    }}
    p={1}
    border="2px solid"
    borderColor="pink.4"
    borderRadius={2}
  >
    <Img src={shareIcon} height="xxs" mr={1} alt="share" />
    Share
  </ButtonTransparent>
);

export default Share;
