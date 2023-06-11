import { Button } from './Button';

function Confirmation({ call, index, handleDelete, handleClose }) {
  const handleConfirmClick = (event) => {
    event.preventDefault();
    handleDelete(index);
  }

  return (
    <div className={`popup popup_dark ${call.delete && `popup_opened`}`}>
      <form className="popup__screen">
        <p className="popup__key">Delete project?</p>
        <Button
          className='button_type_start'
          label='Get started.'
          type='submit'
          handleClick={handleConfirmClick}
        />
        <Button
          className='button_type_close'
          label='Back.'
          handleClick={handleClose}
        />
      </form>
    </div>
  )
};

export { Confirmation }