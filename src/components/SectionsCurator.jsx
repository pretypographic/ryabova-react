import { useEffect, useState } from 'react';
import { Curator } from './Curator';

function SectionsCurator({ data, call, index, sectionIndex, handleImagesApprove, handleVideoApprove, handleLinksApprove, handleClose }) {
  const [selectedType, setSelectedType] = useState('images');
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState([]);
  const [links, setLinks] = useState([]);
  let project = data.find((project) => {
    return project._id === index;
  });

  const onChangeImages = (event) => {
    setImages(event.target.value);
  };

  const onChangeVideo = (event) => {
    setVideo(event.target.value);
  };

  const onChangeLinks = (event) => {
    setLinks(event.target.value);
  };

  const handleFormApprove = (event) => {
    event.preventDefault();
    let sections = project.sections;
    let editedSection = sections.find((section) => {
      return section._id === sectionIndex;
    })
    if (selectedType === 'images') {
      let imageCollection = images.split(/\r\n|\r|\n/g);
      editedSection.type = 'images';
      editedSection.images = imageCollection;
      sections = sections.map((section) => {
        return section._id === editedSection._id
          ? editedSection
          : section
      });
      handleImagesApprove(sections, index);
    }
    if (selectedType === 'video') {
      let videoCollection = video.split(/\r\n|\r|\n/g);
      editedSection.type = 'video';
      editedSection.video = videoCollection;
      sections = sections.map((section) => {
        return section._id === editedSection._id
          ? editedSection
          : section
      });
      handleVideoApprove(sections, index);
    }
    if (selectedType === 'links') {
      handleLinksApprove();
    }
  };

  useEffect(() => {
    setSelectedType('images');
    setImages([]);
    setVideo([]);
    setLinks([]);
  }, [handleClose]);

  useEffect(() => {
    if (project) {
      let editedSection = project.sections.find((section) => {
        return section._id === sectionIndex;
      })
      if (selectedType === 'images' && editedSection.images) {
        setImages(editedSection.images.join('\n'));
      };
      if (selectedType === 'video' && editedSection.video) {
        setVideo(editedSection.video.join('\n'));
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIndex]);

  return (
    <Curator
      call={call.addItem}
      handleFormApprove={handleFormApprove}
      handleClose={handleClose}
    >
      <select
        value={selectedType}
        onChange={e => setSelectedType(e.target.value)}
      >
        <option value='images'>images</option>
        <option value='video'>video</option>
        <option value='links'>links</option>
      </select>
      {(selectedType === 'images') &&
        <>
          <p className='popup__key'>Provide links to images.</p>
          <textarea
            className='popup__phrase popup__phrase_tirade'
            placeholder='links to images'
            name='imagesLinks'
            wrap='hard'
            onChange={onChangeImages}
            value={images}
            required
          />
        </>
      }
      {(selectedType === 'video') &&
        <>
          <p className='popup__key'>Provide links to videos.</p>
          <textarea
            className='popup__phrase popup__phrase_tirade'
            placeholder='links to video'
            name='imagesLinks'
            wrap='hard'
            onChange={onChangeVideo}
            value={video}
            required
          />
        </>
      }
      {(selectedType === 'links') &&
        <>
          <p className='popup__key'>Provide links to external resources.</p>
          <textarea
            className='popup__phrase popup__phrase_tirade'
            placeholder='links to external resources'
            name='resourcesLinks'
            wrap='hard'
            onChange={onChangeLinks}
            value={links}
            required
          />
        </>
      }
    </Curator>
  )
};

export { SectionsCurator }