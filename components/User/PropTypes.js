import PropTypes from 'prop-types';

export const PTUserInlineUser = PropTypes.shape({
  id: PropTypes.number.isRequired,
  icon: PropTypes.string,
  nickname: PropTypes.string.isRequired,
  username: PropTypes.string,
  sui_hei_current_useraward: PropTypes.shape({
    id: PropTypes.number.isRequired,
    created: PropTypes.string.isRequired,
    sui_hei_award: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  }),
});
