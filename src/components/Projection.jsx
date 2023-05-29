import { useContext } from 'react';
import { PerformerContext } from '../contexts/PerformerContext';

function Projection({ projector, handleClose }) {
    const inProcess = useContext(PerformerContext);
    const projectionClassName = `popup ${projector.image && `popup_opened`}`;

    return (
        <div className={projectionClassName}>
            <article className="popup__screen">
                <img
                    className="popup__image"
                    src={projector.image}
                    alt={`Предмет №${projector.i}`}
                />
                <span className="popup__text">{projector.i}</span>
            </article>
            <button className="close-button" onClick={handleClose}></button>
            {inProcess && <button className='delete-button'></button>}
        </div>
    )
}

export { Projection }