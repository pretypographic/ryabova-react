import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { PerformerContext } from '../contexts/PerformerContext';
import { Button } from './Button';

function Outside({ handleImroveClick }) {
  const inProcess = useContext(PerformerContext);
  const tumblerHandler = ({ isActive }) => {
    return `dashboard__tumbler ${isActive && "dashboard__tumbler_selected"}`;
  }

  return (
    <header className="header">
      <div>
        <button
          type="button"
          id="office"
          className="header__title"
        >Nastya Ryabova</button>
        {inProcess &&
          <Button
            className='button_type_improve'
            label='Replace the pdf-file.'
            handleClick={handleImroveClick}
          />
        }
      </div>

      <nav className="dashboard">
        <NavLink to='/projects' className={tumblerHandler}>projects</NavLink>
        <NavLink to='/texts' className={tumblerHandler}>texts</NavLink>
        <NavLink to='/teaching' className={tumblerHandler}>teaching</NavLink>
        <NavLink to='/talksconferences' className={tumblerHandler}>talks&conferences</NavLink>
      </nav>
    </header>
  )
};

export { Outside }