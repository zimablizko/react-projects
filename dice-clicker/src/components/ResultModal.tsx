import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

type ResultModalProps = {
  stats: {
    diceRolls: number;
    bestRoll: number;
  };
  onReset: () => void;
};

const ResultModal = forwardRef(({ stats, onReset }: ResultModalProps, ref) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current!.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={() => onReset()}>
      <p>VICTORY!</p>
      <p>Dice rolls: {stats.diceRolls}</p>
      <p>Best roll: {stats.bestRoll}</p>
      <div>
        <form onSubmit={onReset} method="dialog">
          <button className="btn reset-btn">Restart</button>
        </form>
      </div>
    </dialog>,
    document.getElementById('modal')!
  );
});

export default ResultModal;
