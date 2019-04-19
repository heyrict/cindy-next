import { Container } from 'unstated';

const PuzzleShowRegex = /^\/puzzle\/show\/(\d+)/;

class ChannelContainer extends Container {
  state = {
    channel: '',
  };
  setChannel = channel => {
    this.setState({ channel });
  };
  getChannelWithPath = path =>
    this.state.channel || this.getDefaultChannel(path);
  getDefaultChannel = path => {
    const match = PuzzleShowRegex.exec(path);
    if (match) {
      return `puzzle-${match[1]}`;
    }
    return 'lobby';
  };
}

export default new ChannelContainer();
