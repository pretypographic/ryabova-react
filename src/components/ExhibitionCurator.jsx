import { useEffect, useState, useRef } from 'react';
import { Curator } from './Curator';

function ExhibitionCurator({ data, call, index, handleDescriptionApprove, handleSectionsApprove, handleClose }) {
  const [description, setDescription] = useState('');
  const sectionOne = useRef();
  const sectionTwo = useRef();
  const sectionThree = useRef();
  const sectionFour = useRef();
  const sectionFive = useRef();
  const project = data.find((project) => {
    return project._id === index;
  });

  const onChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleFormApprove = (event) => {
    event.preventDefault();
    if (call.addExplication) {
      let text = description.split(/\r\n|\r|\n/g);
      handleDescriptionApprove(text, index);
    };
    if (call.addSection) {
      let sections = project.sections;
      sections[0].name = sectionOne.current.value;
      sections[1].name = sectionTwo.current.value;
      sections[2].name = sectionThree.current.value;
      sections[3].name = sectionFour.current.value;
      sections[4].name = sectionFive.current.value;
      handleSectionsApprove(sections, index);
    };
  };

  useEffect(() => {
    setDescription('');
  }, [handleClose]);

  useEffect(() => {
    if (call.addExplication && project.description[0]) {
      setDescription(project.description.join('\n'));
    };
    if (call.addSection) {
      if (project.sections[0]) {
        sectionOne.current.value = project.sections[0].name;
      };
      if (project.sections[1]) {
        sectionTwo.current.value = project.sections[1].name;
      };
      if (project.sections[2]) {
        sectionThree.current.value = project.sections[2].name;
      };
      if (project.sections[3]) {
        sectionFour.current.value = project.sections[3].name;
      };
      if (project.sections[4]) {
        sectionFive.current.value = project.sections[4].name;
      };
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <Curator
      call={call.addExplication || call.addSection}
      handleFormApprove={handleFormApprove}
      handleClose={handleClose}
    >
      {call.addExplication &&
        <>
          <p className='popup__key'>Add a description.</p>
          <textarea
            className='popup__phrase popup__phrase_tirade'
            placeholder='description'
            name='description'
            wrap='hard'
            onChange={onChangeDescription}
            value={description}
            required
          />
        </>
      }
      {call.addSection &&
        <>
          <p className='popup__key'>Add a sections.</p>
          <input
            className='popup__phrase'
            placeholder='section name'
            name='name'
            type='text'
            ref={sectionOne}
            required
          />
          <input
            className='popup__phrase'
            placeholder='section name'
            name='name'
            type='text'
            ref={sectionTwo}
            required
          />
          <input
            className='popup__phrase'
            placeholder='section name'
            name='name'
            type='text'
            ref={sectionThree}
            required
          />
          <input
            className='popup__phrase'
            placeholder='section name'
            name='name'
            type='text'
            ref={sectionFour}
            required
          />
          <input
            className='popup__phrase'
            placeholder='section name'
            name='name'
            type='text'
            ref={sectionFive}
            required
          />
        </>
      }
    </Curator>
  )
};

export { ExhibitionCurator }