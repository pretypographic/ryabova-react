import { Button } from './Button';

function Curator({ call, handleFormApprove, handleClose, children }) {
  return (
    <div className={`popup ${call && `popup_opened`}`}>
      <form className="popup__screen" onSubmit={handleFormApprove}>
        {children}
        <Button
          className='button_type_start'
          label='Get started.'
          type='submit'
          handleClick={handleFormApprove}
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

export { Curator }