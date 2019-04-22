import React from 'react';
import PropTypes from 'prop-types';

// Refer to https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript#answer-14853974
// Both arrays should contain scalar or arrays, but not objects.
const arrayEquals = (a, b) => {
  if (!b) return false;

  if (a.length != b.length) return false;

  for (var i = 0, l = a.length; i < l; i++) {
    if (a[i] instanceof Array && b[i] instanceof Array) {
      if (arrayEquals(!a[i], b[i])) return false;
    } else if (a[i] != b[i]) {
      return false;
    }
  }
  return true;
};

class KeepBottom extends React.Component {
  static defaultProps = {
    waitForRender: 300,
    watch: [],
  };
  static propTypes = {
    waitForRender: PropTypes.number,
    watch: PropTypes.array,
  };

  firstTimeAtTop = true;
  scrollerRef = React.createRef();
  componentDidMount() {
    this._judgeHeight();
  }
  componentDidUpdate() {
    this._judgeHeight();
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (!arrayEquals(nextProps.watch, this.props.watch)) {
      this.firstTimeAtTop = true;
      return true;
    }
    return false;
  }
  _judgeHeight() {
    if (process.browser) {
      window.setTimeout(() => {
        if (this.firstTimeAtTop) {
          this.firstTimeAtTop = false;
          if (this.scrollerRef.current) {
            this.scrollerRef.current.scrollTop = this.scrollerRef.current.scrollHeight;
          }
        }
      }, this.props.waitForRender);
    }
  }

  render() {
    return this.props.children({ scrollerRef: this.scrollerRef });
  }
}

export default KeepBottom;
