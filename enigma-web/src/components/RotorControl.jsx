export default function RotorControl({ label, rotorNo, position, onRotorChange, onPositionChange }) {
  return (
    <div className="rotor-control">
      <div className="rotor-label">Rotor {label}</div>
      <div className="rotor-selector">
        <button onClick={() => onRotorChange((rotorNo + 4) % 5)}>◀</button>
        <span className="rotor-no">{rotorNo + 1}</span>
        <button onClick={() => onRotorChange((rotorNo + 1) % 5)}>▶</button>
      </div>
      <div className="position-selector">
        <button onClick={() => onPositionChange((position + 25) % 26)}>▲</button>
        <span className="position-no">{position + 1}</span>
        <button onClick={() => onPositionChange((position + 1) % 26)}>▼</button>
      </div>
    </div>
  );
}
