import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal({ stats, onReset }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      <p>VICTORY!</p>
      <p>Dice rolls: {stats.diceRolls}</p>
      <p>Best roll: {stats.bestRoll}</p>
      <div>
        <form onSubmit={onReset} method="dialog">
          <button className="btn reset-btn">Restart</button>
        </form>
      </div>
    </dialog>,
    document.getElementById('modal')
  );
});

export default ResultModal;
