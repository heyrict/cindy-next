import React from 'react';
import { isDev } from 'settings';
import isEqual from 'react-fast-compare';
import { KeepBottomProps, WatchObjectType } from './types';

const logDev = (...args: string[]) => (isDev ? console.log(...args) : null);

class KeepBottom extends React.Component<KeepBottomProps> {
  static defaultProps = {
    watch: [],
    mount: {
      name: 'Mount',
      action: 'toBottom',
    },
  };

  prevState = {
    scrollHeight: 0,
    scrollTop: 0,
    clientHeight: 0,
  };
  pendingTimeout: number | null = null;
  scrollerRef = React.createRef();

  componentDidMount() {
    if (this.props.mount) {
      this.handleActions(this.props.mount);
    }
    // this._judgeHeight();
  }
  componentDidUpdate(prevProps: KeepBottomProps) {
    const prevWatch = prevProps.watch;
    this.props.watch.some((o, i) => {
      if (!isEqual(o.value, prevWatch[i].value) && o.log !== false) {
        console.log(
          `KeepBottom: Value changed on ${o.name} monitored (${
            prevWatch[i].value
          } => ${o.value})`,
        );
        this.handleActions(o);
        return true;
      }
      return false;
    });
    // this._judgeHeight();
  }

  // {{{1 shouldComponentUpdate
  shouldComponentUpdate(nextProps: KeepBottomProps, _nextState: any) {
    if (nextProps.watch.some((o, i) => o.value !== this.props.watch[i].value)) {
      const { scrollHeight: sh, scrollTop: st, clientHeight: ch } = this
        .scrollerRef.current as any;
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
  handleActions(o: WatchObjectType) {
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
  handleToBottom(o: WatchObjectType) {
    logDev(`KeepBottom: Handle toBottom for ${o.name}`);
    const behavior = o.smooth ? 'smooth' : 'auto';
    const wait = o.wait || 200;
    const sr: any = this.scrollerRef.current;

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
  handleStay(o: WatchObjectType) {
    logDev(`KeepBottom: Handle stay for ${o.name}`);
    const behavior = o.smooth ? 'smooth' : 'auto';
    const wait = o.wait || 0;
    const sr: any = this.scrollerRef.current;

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
  handleStayOrBottom(o: WatchObjectType) {
    logDev(`KeepBottom: Handle stayOrBottom for ${o.name}`);
    const behavior = o.smooth ? 'smooth' : 'auto';
    const wait = o.wait || 0;
    const sr: any = this.scrollerRef.current;

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
