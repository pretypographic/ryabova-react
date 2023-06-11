import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from './Button';

function OfficeEntrance({ handleEntry }) {
  const navigate = useNavigate();
  const [phrase, setPhrase] = useState('');
  const [pValue, setPValue] = useState('');

  function onChange(event) {
    setPhrase(event.target.value);
  }

  function getValue(number) {
    let value = '';
    if (number === 0) {
      return '';
    };
    for (let i = 0; i < number; i++) {
      value = value + '*';
    }
    return value;
  }

  function handleClose() {
    navigate(-1, { replace: true });
  }

  useEffect(() => {
    let value = getValue(phrase.length);
    setPValue(value);
  }, [phrase])

  useEffect(() => {
    setPhrase('');
    setPValue('');
  }, [handleEntry])

  return (
    <div className="popup popup_opened">
      <form className="popup__screen" onSubmit={handleEntry}>
        <p className="popup__key popup__key_open">{pValue}</p>
        <input
          className="popup__phrase  popup__phrase_simple"
          placeholder="phrase"
          name="phrase"
          type="password"
          onChange={onChange}
          required
        />
        <Button
          className='button_type_start'
          label='Get started.'
          type='submit'
          handleClick={handleEntry}
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

export { OfficeEntrance }