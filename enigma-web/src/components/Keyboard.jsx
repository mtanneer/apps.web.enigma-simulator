const LAYOUT = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['Z','X','C','V','B','N','M'],
];

export default function Keyboard({ pressedKey, onKeyDown, onKeyUp, onBackspace }) {
  return (
    <div className="keyboard">
      {LAYOUT.map((row, ri) => (
        <div key={ri} className="key-row">
          {row.map(letter => (
            <button
              key={letter}
              className={`key ${pressedKey === letter ? 'key-pressed' : ''}`}
              onMouseDown={() => onKeyDown(letter)}
              onMouseUp={() => onKeyUp(letter)}
              onMouseLeave={() => pressedKey === letter && onKeyUp(letter)}
            >
              {letter}
            </button>
          ))}
          {ri === 2 && (
            <button className="key key-backspace" onClick={onBackspace} title="Backspace">
              ⌫
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
