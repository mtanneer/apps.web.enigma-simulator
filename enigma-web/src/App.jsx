import { useState, useEffect, useCallback, useRef } from 'react';
import { Enigma } from './enigma/Enigma.js';
import RotorControl from './components/RotorControl.jsx';
import LampBoard from './components/LampBoard.jsx';
import Keyboard from './components/Keyboard.jsx';
import PlugBoard from './components/PlugBoard.jsx';
import HowToUse from './components/HowToUse.jsx';
import './App.css';

const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function makeEnigma(rotors, positions, plugPairs) {
  const e = new Enigma();
  e.setRotors(...rotors);
  e.setPositions(...positions);
  e.setPlugPairs(plugPairs);
  return e;
}

export default function App() {
  const [rotors, setRotors] = useState([0, 1, 2]);
  const [positions, setPositions] = useState([0, 0, 0]);
  const [plugPairs, setPlugPairs] = useState([]);
  const [litLetter, setLitLetter] = useState(null);
  const [pressedKey, setPressedKey] = useState(null);
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');

  const enigmaRef = useRef(makeEnigma([0, 1, 2], [0, 0, 0], []));

  useEffect(() => {
    enigmaRef.current = makeEnigma(rotors, positions, plugPairs);
    setInput('');
    setOutput('');
  }, [rotors, positions, plugPairs]);

  const pressKey = useCallback((letter) => {
    const idx = ALPHA.indexOf(letter);
    if (idx === -1) return;
    const result = enigmaRef.current.pressKey(idx);
    if (result === -1) return;
    const outLetter = ALPHA[result];
    setLitLetter(outLetter);
    setPressedKey(letter);
    setInput(s => s + letter);
    setOutput(s => s + outLetter);
  }, []);

  const releaseKey = useCallback(() => {
    setLitLetter(null);
    setPressedKey(null);
  }, []);

  const handleBackspace = useCallback(() => {
    setInput(s => {
      if (!s.length) return s;
      // step rotor back by replaying from scratch
      const remaining = s.slice(0, -1);
      const e = makeEnigma(rotors, positions, plugPairs);
      let out = '';
      for (const ch of remaining) {
        const idx = ALPHA.indexOf(ch);
        const r = e.pressKey(idx);
        if (r !== -1) out += ALPHA[r];
      }
      enigmaRef.current = e;
      setOutput(out);
      return remaining;
    });
    setLitLetter(null);
    setPressedKey(null);
  }, [rotors, positions, plugPairs]);

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'Backspace' && !e.repeat) {
        e.preventDefault();
        handleBackspace();
        return;
      }
      const letter = e.key.toUpperCase();
      if (ALPHA.includes(letter) && !e.repeat) {
        pressKey(letter);
      }
    };
    const up = (e) => {
      const letter = e.key.toUpperCase();
      if (ALPHA.includes(letter)) releaseKey();
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, [pressKey, releaseKey, handleBackspace]);

  function handleRotorChange(idx, val) {
    const next = [...rotors];
    next[idx] = val;
    if (next[0] === next[1] || next[1] === next[2] || next[0] === next[2]) return;
    setRotors(next);
  }

  function handlePositionChange(idx, val) {
    const next = [...positions];
    next[idx] = val;
    setPositions(next);
  }

  function handleRandomize() {
    const e = new Enigma();
    e.randomize();
    const state = e.getState();
    setRotors(state.rotors);
    setPositions(state.positions);
    setPlugPairs(state.plugPairs);
  }

  function handleReset() {
    enigmaRef.current = makeEnigma(rotors, positions, plugPairs);
    setInput('');
    setOutput('');
    setLitLetter(null);
    setPressedKey(null);
  }

  const dupeError = rotors[0] === rotors[1] || rotors[1] === rotors[2] || rotors[0] === rotors[2];

  return (
    <div className="app-shell">
      <HowToUse />

      <main className="app-main">
        <h1 className="title">Enigma Machine</h1>
        <p className="attribution">
          Based on <a href="https://github.com/Code-Bullet/Enigma-Simulator" target="_blank" rel="noopener noreferrer">Code-Bullet/Enigma-Simulator</a>
        </p>

        <div className="rotors-row">
          {[0, 1, 2].map(i => (
            <RotorControl
              key={i}
              label={i + 1}
              rotorNo={rotors[i]}
              position={positions[i]}
              onRotorChange={val => handleRotorChange(i, val)}
              onPositionChange={val => handlePositionChange(i, val)}
            />
          ))}
        </div>
        {dupeError && <div className="error">Rotors must be unique</div>}

        <div className="actions">
          <button className="btn" onClick={handleRandomize}>Randomize</button>
          <button className="btn btn-secondary" onClick={handleReset}>Reset</button>
        </div>

        <LampBoard litLetter={litLetter} />
        <Keyboard
          pressedKey={pressedKey}
          onKeyDown={pressKey}
          onKeyUp={releaseKey}
          onBackspace={handleBackspace}
        />

        <div className="io-section">
          <div className="io-box">
            <div className="io-label">Input</div>
            <div className="io-text">{input || <span className="placeholder">Press keys above or type…</span>}</div>
          </div>
          <div className="io-box">
            <div className="io-label">Output</div>
            <div className="io-text output">{output || <span className="placeholder">Encrypted output appears here…</span>}</div>
          </div>
        </div>

        <div className="plugboard-inline">
          <PlugBoard pairs={plugPairs} onChange={setPlugPairs} />
        </div>
      </main>
    </div>
  );
}
