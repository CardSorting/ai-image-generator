import PropTypes from 'prop-types';

export const ImageType = PropTypes.shape({
  url: PropTypes.string.isRequired,
  prompt: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
});

export const AnimatedValueType = PropTypes.shape({
  interpolate: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  addListener: PropTypes.func.isRequired,
  removeListener: PropTypes.func.isRequired,
});
