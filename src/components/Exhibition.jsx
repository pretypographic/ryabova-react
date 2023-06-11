import { useContext } from 'react';
import { useParams, NavLink, useLocation } from 'react-router-dom';
import { PerformerContext } from '../contexts/PerformerContext';
import { Projector } from './Projector';
import { Button } from './Button';

function Exhibition({ data, handleProjectorClick, callCurator }) {
  let { index } = useParams();
  let location = useLocation();
  const project = data.find((project) => {
    return project._id === index;
  });
  const inProcess = useContext(PerformerContext);

  const tumblerHandler = ({ isActive }) => {
    return `dashboard__tumbler ${isActive && 'dashboard__tumbler_selected'}`;
  }

  const handleEditProject = () => {
    callCurator('editProject', index);
  }

  const handleAddExplication = () => {
    callCurator('addExplication', index);
  }

  const handleAddSection = () => {
    callCurator('addSection', index);
  }

  const handleAddItem = (event) => {
    let sectionIndex = event.target.parentElement.getAttribute('index');
    callCurator('addItem', index, sectionIndex);
  }

  return (
    <section className='section'>
      <article className='article article_type_head'>
        {inProcess &&
          <Button
            className='button_type_make'
            label='Edit the project.'
            handleClick={handleEditProject}
            small={true}
          />
        }
        <h2 className='article__title'>{project.title}</h2>
      </article>
      {/* <!-- название --> */}

      <article className='article article_type_explication'>
        {project.description && project.description.map((line, i) => (
          <p className='article__text' key={i}>{line}</p>
        ))}
        {inProcess &&
          <Button
            className='button_type_make'
            label='Add an explication.'
            handleClick={handleAddExplication}
            small={true}
          />
        }
      </article>
      {/* <!-- экспликация --> */}

      {/* <Outlet /> */}
      <section className='section'>
        <nav className='dashboard dashboard_black'>
          {inProcess &&
            <Button
              className='button_type_make'
              label='Add a section.'
              handleClick={handleAddSection}
              small={true}
            />
          }
          {project.sections && project.sections.map((section, i) => (
            section.name &&
            <NavLink
              key={i}
              to={`/project/${index}/${section.name}`}
              className={tumblerHandler}
            >{section.name}</NavLink>
          ))}
        </nav>
        {project.sections && project.sections.map((section, i) => (
          location.pathname === `/project/${index}/${section.name}` &&
          <article className='article article_type_exposition' key={section._id} index={section._id}>
            {inProcess &&
              <Button
                className='button_type_make'
                label='Add an item to a section.'
                handleClick={handleAddItem}
              />
            }
            {project.sections[i] && section.images.map((item, i) => (
              <Projector key={i} item={item} handleProjectorClick={handleProjectorClick} />
            ))}
          </article>
        ))}
      </section>
      {/* <!-- экспозиция --> */}
    </section>
  )
};

export { Exhibition }