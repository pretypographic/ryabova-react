import { useEffect, useState } from 'react';
import { Curator } from './Curator';
import { Button } from './Button';

function PrimehallCurator({ data, call, index, handleAddApprove, handleEditApprove, handleClose, callCurator }) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  }

  const onChangeLink = (event) => {
    setLink(event.target.value);
  }

  const handleFormApprove = (event) => {
    event.preventDefault();
    if (call.addProject) {
      handleAddApprove({ title, cover: link });
    }
    if (call.editProject) {
      handleEditApprove({ title, cover: link }, index);
    }
  }

  const handleDeleteClick = () => {
    callCurator('delete', index);
  }

  useEffect(() => {
    setTitle('');
    setLink('');
  }, [handleClose]);

  useEffect(() => {
    if (call.editProject) {
      const project = data.find((project) => {
        return project._id === index;
      });
      setTitle(project.title);
      setLink(project.cover)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [call]);

  return (
    <Curator
      call={call.addProject || call.editProject}
      handleFormApprove={handleFormApprove}
      handleClose={handleClose}
    >
      <p className='popup__key'>Announce a new project.</p>
      <input
        className='popup__phrase'
        placeholder='title'
        name='title'
        type='text'
        onChange={onChangeTitle}
        value={title}
        required
      />
      <p className='popup__key'>Choose a cover.</p>
      <input
        className='popup__phrase'
        placeholder='link to the image'
        name='link'
        type='url'
        onChange={onChangeLink}
        value={link}
        required
      />
      {call.editProject &&
        <Button
          className='button_type_delete'
          label='Delete.'
          handleClick={handleDeleteClick}
        />
      }
    </Curator>
  )
};

export { PrimehallCurator }