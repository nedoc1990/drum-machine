import React, { Component } from "react";
import "./App.css";

const Button = ({ letter, playing, audio, handleClick, transitionEnd }) => (
  <div
    className={`drum-pad ${playing ? "playing" : ""}`}
    data-key={letter}
    onClick={handleClick}
    onTransitionEnd={transitionEnd}
  >
    <audio
      id={letter}
      src={`https://s3.amazonaws.com/freecodecamp/drums/${audio}`}
      className="clip"
    />
    {letter}
  </div>
);

class App extends Component {
  state = {
    letters: ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"],
    audios: [
      "Chord_1.mp3",
      "Chord_2.mp3",
      "Chord_3.mp3",
      "Give_us_a_light.mp3",
      "Dry_Ohh.mp3",
      "Bld_H1.mp3",
      "punchy_kick_1.mp3",
      "side_stick_1.mp3",
      "Brk_Snr.mp3"
    ],
    playing: {
      Q: false,
      W: false,
      E: false,
      A: false,
      S: false,
      D: false,
      Z: false,
      X: false,
      C: false
    },
    volume: 0.5
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleClick);
  }

  handleClick = evt => {
    const letter = evt.target.dataset.key || String(evt.key).toUpperCase();

    const audio = document.querySelector(`audio[id="${letter}"]`);

    if (!audio) return;

    audio.currentTime = 0;
    audio.volume = this.state.volume;
    audio.play();

    this.setState({
      playing: {
        ...this.state.playing,
        [letter]: true
      }
    });
  };

  removeTransition = evt => {
    if (evt.propertyName !== "transform") {
      return;
    }

    this.setState({
      playing: {
        ...this.state.playing,
        [evt.target.dataset.key]: false
      }
    });
  };

  changeVolume = evt => {
    this.setState({
      volume: evt.target.value
    });
  };

  render() {
    return (
      <div className="App">
        <div className="drum-machine">
          <div className="display">
            {this.state.letters.map((letter, index) => {
              return (
                <Button
                  key={letter}
                  letter={letter}
                  playing={this.state.playing[letter]}
                  audio={this.state.audios[index]}
                  handleClick={this.handleClick}
                  transitionEnd={this.removeTransition}
                />
              );
            })}
          </div>

          <div className="controls">
            <p>Volume</p>
            <input
              type="range"
              name="volume"
              id="volume"
              min="0"
              max="1"
              step="0.01"
              onChange={this.changeVolume}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
