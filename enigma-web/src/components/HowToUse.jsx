import { useState } from 'react';

export default function HowToUse() {
  const [open, setOpen] = useState(true);

  return (
    <aside className={`howto-panel ${open ? 'howto-open' : 'howto-closed'}`}>
      <button
        className="howto-collapse-btn"
        onClick={() => setOpen(o => !o)}
        title={open ? 'Collapse panel' : 'Expand panel'}
      >
        {open ? '◀' : '▶'}
      </button>

      {open && (
        <>
          <div className="howto-heading">How to Use</div>

          <section className="howto-section">
            <h3>Encrypting</h3>
            <p>Press letter keys (on screen or your keyboard) one at a time. Each press lights up the encrypted letter on the lamp board and adds it to <em>Output</em>.</p>
            <p>Use <strong>Backspace</strong> (button or key) to undo the last letter — it steps the rotor back and removes the last characters from both Input and Output.</p>
          </section>

          <section className="howto-section">
            <h3>Decrypting</h3>
            <p>The Enigma cipher is its own inverse — encrypting the ciphertext gives back the original message, <strong>as long as the machine settings match exactly</strong>.</p>
            <p>To decrypt a message:</p>
            <ol>
              <li>Set the same <strong>rotor types</strong> (e.g. 1, 3, 5)</li>
              <li>Set the same <strong>starting positions</strong> (e.g. 4, 12, 7)</li>
              <li>Set the same <strong>plugboard pairs</strong></li>
              <li>Hit <strong>Reset</strong> to make sure the machine is at position 0</li>
              <li>Type the ciphertext — the original message appears in Output</li>
            </ol>
            <p className="howto-warning">Changing any setting resets the machine. Use <strong>Reset</strong> (not Randomize) if you just want to restart typing from the same config.</p>
          </section>

          <section className="howto-section">
            <h3>Rotors</h3>
            <p>Use <strong>◀ ▶</strong> to change rotor type (1–5). Use <strong>▲ ▼</strong> to set starting position (1–26). All three rotors must be different types.</p>
            <p>After each keypress, Rotor 1 steps forward. Every full revolution it carries over to Rotor 2, then Rotor 3 — like an odometer.</p>
          </section>

          <section className="howto-section">
            <h3>Plugboard</h3>
            <p>Swaps pairs of letters before and after the rotors. Up to 10 pairs.</p>
            <ul>
              <li>Click a letter to <strong>select</strong> it (glows gold)</li>
              <li>Click another unpaired letter to <strong>connect</strong> them</li>
              <li>Click a paired letter to <strong>disconnect</strong> it</li>
            </ul>
          </section>

          <section className="howto-section">
            <h3>Lamp Board</h3>
            <p>Lights up the output letter while a key is held. Release to turn it off — same as the real machine.</p>
          </section>
        </>
      )}
    </aside>
  );
}
