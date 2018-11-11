import React, { Component } from "react";
import "./App.css";

const Button = ({ letter, playing, audio, handleClick, transitionEnd }) => (
  <div
    id={audio}
    className={`drum-pad ${playing ? "playing" : ""}`}
    data-key={letter}
    onClick={handleClick}
    onTransitionEnd={transitionEnd}
  >
    <audio
      id={letter}
      src={`https://s3.amazonaws.com/freecodecamp/drums/${audio}.mp3`}
      className="clip"
    />
    {letter}
  </div>
);

class App extends Component {
  state = {
    letters: ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"],
    audios: [
      "Chord_1",
      "Chord_2",
      "Chord_3",
      "Give_us_a_light",
      "Dry_Ohh",
      "Bld_H1",
      "punchy_kick_1",
      "side_stick_1",
      "Brk_Snr"
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
    volume: 0.5,
    lastPlayed: ""
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
    const audioIndex = this.state.letters.findIndex(l => l === letter);
    const played = this.state.audios[audioIndex];

    this.setState({
      playing: {
        ...this.state.playing,
        [letter]: true
      },
      lastPlayed: played
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
        <div id="drum-machine" className="drum-machine">
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

            <p id="display">{this.state.lastPlayed}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
