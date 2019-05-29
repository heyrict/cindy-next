import React from 'react';
import PropTypes from 'prop-types';
import { isDev } from 'settings';

const logDev = (...args) => (isDev ? console.log(...args) : null);

// {{{ arrayEquals(a, b)
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
}; // }}}

const watchObjectPropType = PropTypes.shape({
  name: PropTypes.string, // Optional name, for logging purposes.
  value: PropTypes.any, // Value that should be watched for changes.
  action: PropTypes.oneOf([
    'toBottom', // Go to bottom on value changes
    'stay', // Stay previous scrollHeight from bottom
    /* Convenience action for handling scrolling when
     * element length changes, specifically:
     *
     * 1. Stay in the previous position from bottom when messages loaded at top.
     * 2. Scroll to bottom smoothly when new message added in the bottom.
     *
     * Whether to use method 1 or 2 depends on the current
     * `scrollTop` position of the scroller.
     *
     * Note: smooth will not work with this action.
     */
    'stayOrBottom',
    'doNothing',
  ]).isRequired,
  wait: PropTypes.number, // How long to wait for the rendering, default 0.
});

class KeepBottom extends React.Component {
  static defaultProps = {
    watch: [],
    mount: {
      name: 'Mount',
      action: 'toBottom',
    },
  };
  static propTypes = {
    mount: watchObjectPropType,
    watch: PropTypes.arrayOf(watchObjectPropType),
  };

  prevState = {
    scrollHeight: 0,
    scrollTop: 0,
    clientHeight: 0,
  };
  pendingTimeout = null;
  scrollerRef = React.createRef();

  componentDidMount() {
    if (this.props.mount) {
      this.handleActions(this.props.mount);
    }
    // this._judgeHeight();
  }
  componentDidUpdate(prevProps) {
    const prevWatch = prevProps.watch;
    this.props.watch.some((o, i) => {
      if (o.value !== prevWatch[i].value) {
        console.log(
          `KeepBottom: Value changed on ${o.name} monitored (${
            prevWatch[i].value
          } => ${o.value})`,
        );
        this.handleActions(o);
        return true;
      }
    });
    // this._judgeHeight();
  }

  // {{{1 shouldComponentUpdate
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.watch.some((o, i) => o.value !== this.props.watch[i].value)) {
      const {
        scrollHeight: sh,
        scrollTop: st,
        clientHeight: ch,
      } = this.scrollerRef.current;
      this.prevState = {
        scrollHeight: sh,
        scrollTop: st,
        clientHeight: ch,
      };
      return true;
    }
    return false;
  }

  // {{{1 handleActions
  handleActions(o) {
    logDev(`KeepBottom: Handling Object ${JSON.stringify(o)}`);
    switch (o.action) {
      case 'toBottom':
        this.handleToBottom(o);
        break;
      case 'stayOrBottom':
        this.handleStayOrBottom(o);
        break;
      case 'stay':
        this.handleStay(o);
        break;
      case 'doNothing':
        break;
      default:
        console.log(`KeepBottom: Action "${o.name}" unknown in "${o.name}"`);
    }
  }

  // {{{1 handleToBottom
  handleToBottom(o) {
    logDev(`KeepBottom: Handle toBottom for ${o.name}`);
    const behavior = o.smooth ? 'smooth' : 'auto';
    const wait = o.wait || 0;
    const sr = this.scrollerRef.current;

    if (this.pendingTimeout) {
      // First choice: clear previous timeout
      window.clearTimeout(this.pendingTimeout);
      this.pendingTimeout = null;

      // Second choice: stop current action
      //return false;
    }

    this.pendingTimeout = window.setTimeout(() => {
      if (sr) {
        sr.scrollTo({
          top: sr.scrollHeight,
          behavior,
        });
      }
    }, wait);
  }

  // {{{1 handleStay
  handleStay(o) {
    logDev(`KeepBottom: Handle stay for ${o.name}`);
    const behavior = o.smooth ? 'smooth' : 'auto';
    const wait = o.wait || 0;
    const sr = this.scrollerRef.current;

    if (this.pendingTimeout) {
      // First choice: clear previous timeout
      window.clearTimeout(this.pendingTimeout);
      this.pendingTimeout = null;

      // Second choice: stop current action
      //return false;
    }

    this.pendingTimeout = window.setTimeout(() => {
      if (sr) {
        sr.scrollTo({
          top: sr.scrollHeight - this.prevState.scrollHeight,
          behavior,
        });
      }
    }, wait);
  }

  // {{{1 handleStayOrBottom
  handleStayOrBottom(o) {
    logDev(`KeepBottom: Handle stayOrBottom for ${o.name}`);
    const behavior = o.smooth ? 'smooth' : 'auto';
    const wait = o.wait || 0;
    const sr = this.scrollerRef.current;

    if (this.pendingTimeout) {
      // First choice: clear previous timeout
      window.clearTimeout(this.pendingTimeout);
      this.pendingTimeout = null;

      // Second choice: stop current action
      //return false;
    }

    this.pendingTimeout = window.setTimeout(() => {
      if (sr) {
        const {
          scrollHeight: sh,
          scrollTop: st,
          clientHeight: ch,
        } = this.prevState;

        if (sh - st - ch * 1.3 < 0) {
          sr.scrollTo({
            top: sr.scrollHeight,
            behavior: 'smooth',
          });
        } else {
          sr.scrollTo({
            top: sr.scrollHeight - this.prevState.scrollHeight,
            behavior,
          });
        }
      }
    }, wait);
  }

  // {{{1 render
  render() {
    return this.props.children({ scrollerRef: this.scrollerRef });
  }
  // }}}
}

export default KeepBottom;
