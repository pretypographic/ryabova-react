import { useContext } from 'react';
import { PerformerContext } from '../contexts/PerformerContext';
import { Project } from './Project';
import { Button } from './Button';

function Primehall({ data, callCurator }) {
  const inProcess = useContext(PerformerContext);

  const handleClick = () => {
    callCurator('addProject');
  }

  return (
    <section className='section section_hall_prime'>
      {inProcess &&
        <Button
          className='button_type_make'
          label='Add a project.'
          handleClick={handleClick}
        />
      }
      {data.map((project, i) => (
        <Project data={project} key={project._id} />
      ))}
    </section>
  )
};

export { Primehall }