const LAYOUT = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['Z','X','C','V','B','N','M'],
];

export default function LampBoard({ litLetter }) {
  return (
    <div className="lamp-board">
      {LAYOUT.map((row, ri) => (
        <div key={ri} className="lamp-row">
          {row.map(letter => (
            <div
              key={letter}
              className={`lamp ${litLetter === letter ? 'lamp-on' : ''}`}
            >
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
