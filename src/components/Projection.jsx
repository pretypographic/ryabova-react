import { useContext } from 'react';
import { PerformerContext } from '../contexts/PerformerContext';
import { Button } from './Button';

function Projection({ projector, handleClose, handleDelete }) {
  const inProcess = useContext(PerformerContext);
  const projectionClassName = `popup ${projector.image && `popup_opened`}`;

  return (
    <div className={projectionClassName}>
      <article className="popup__screen popup__screen_short">
        <img
          className="popup__image"
          src={projector.image}
          alt={`Предмет №${projector.i}`}
        />
        <span className="popup__text">{projector.i}</span>
      </article>
      <Button
        className='button_type_close'
        label='Close.'
        handleClick={handleClose}
      />
      {inProcess &&
        <></>
        // <Button
        //   className='button_type_delete'
        //   label='Delete.'
        //   handleClick={handleDelete}
        // />
      }
    </div>
  )
}

export { Projection }