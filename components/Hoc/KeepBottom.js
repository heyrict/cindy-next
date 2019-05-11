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
    stay: [],
  };
  static propTypes = {
    waitForRender: PropTypes.number,
    watch: PropTypes.array,
    stay: PropTypes.array,
  };

  firstTimeAtTop = true;
  prevScrollHeight = 0;
  pendingTimeout = null;
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
    if (!arrayEquals(nextProps.stay, this.props.stay)) {
      // Store previous scrollHeight before rendering
      this.prevScrollHeight = this.scrollerRef.current.scrollHeight;
      return true;
    }
    return false;
  }
  _judgeHeight() {
    // In case there is a pending scroll timeout,
    // Do not mess up the scroll event.
    if (this.pendingTimeout) {
      return false;
    }
    if (process.browser) {
      const { scrollHeight } = this.scrollerRef.current;

      // Wait for the content to render its contents to DOM
      this.pendingTimeout = window.setTimeout(() => {
        if (this.firstTimeAtTop) {
          // Scroll to bottom on `watch` update
          this.firstTimeAtTop = false;
          if (this.scrollerRef.current) {
            this.scrollerRef.current.scrollTop = scrollHeight;
          }
        } else {
          // Restore previous scrollTop on `stay` update.
          // Useful for reversed infinite scrolling
          if (this.scrollerRef.current) {
            this.scrollerRef.current.scrollTop =
              scrollHeight - this.prevScrollHeight;
          }
        }
        this.pendingTimeout = null;
      }, this.props.waitForRender);
    }
  }

  render() {
    return this.props.children({ scrollerRef: this.scrollerRef });
  }
}

export default KeepBottom;
