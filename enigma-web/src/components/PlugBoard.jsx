import { useState } from 'react';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function PlugBoard({ pairs, onChange }) {
  const [selected, setSelected] = useState(null);

  const pairedMap = {};
  pairs.forEach(([a, b]) => {
    pairedMap[a] = b;
    pairedMap[b] = a;
  });

  function handleClick(idx) {
    if (selected === null) {
      if (pairedMap[idx] !== undefined) {
        // unplug existing pair
        const partner = pairedMap[idx];
        onChange(pairs.filter(([a, b]) => a !== idx && b !== idx && a !== partner && b !== partner));
      } else {
        setSelected(idx);
      }
    } else {
      if (idx === selected) {
        setSelected(null);
        return;
      }
      if (pairedMap[idx] !== undefined) {
        setSelected(null);
        return;
      }
      if (pairs.length >= 10) {
        setSelected(null);
        return;
      }
      onChange([...pairs, [selected, idx]]);
      setSelected(null);
    }
  }

  return (
    <div className="plugboard">
      <div className="plugboard-title">Plugboard <span className="plug-count">({pairs.length}/10 pairs)</span></div>
      <div className="plugboard-grid">
        {ALPHABET.map((letter, idx) => {
          const partnered = pairedMap[idx] !== undefined;
          const partnerLetter = partnered ? ALPHABET[pairedMap[idx]] : null;
          const isSelected = selected === idx;
          return (
            <div
              key={letter}
              className={`plug-socket ${partnered ? 'plugged' : ''} ${isSelected ? 'plug-selected' : ''}`}
              onClick={() => handleClick(idx)}
              title={partnered ? `Paired with ${partnerLetter}` : selected !== null && !partnered ? 'Click to pair' : 'Click to select'}
            >
              <span className="plug-letter">{letter}</span>
              {partnered && <span className="plug-partner">↔{partnerLetter}</span>}
            </div>
          );
        })}
      </div>
      {selected !== null && (
        <div className="plug-hint">Selected {ALPHABET[selected]} — click another letter to pair, or click again to cancel</div>
      )}
    </div>
  );
}
