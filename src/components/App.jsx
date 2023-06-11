import React from 'react';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
// реакт
import { api } from '../Api';
import { PerformerContext } from '../contexts/PerformerContext';

import { Outside } from './Outside';
import { Primehall } from './Primehall';
import { Exhibition } from './Exhibition';
import { Projection } from './Projection';
import { Button } from './Button';
import { OfficeEntrance } from './OfficeEntrance';
import { PrimehallCurator } from './PrimehallCurator';
import { ExhibitionCurator } from './ExhibitionCurator';
import { SectionsCurator } from './SectionsCurator';
import { Confirmation } from './Confirmation';
// компоненты

function App() {
  const navigate = useNavigate();
  const [projector, setProjector] = React.useState({});
  const [projects, setProjects] = React.useState([]);
  const [inProcess, setProcess] = React.useState(true);
  const [call, setCall] = React.useState({
    addProject: false,
    editProject: false,
    addExplication: false,
    addSection: false,
    addItem: false,
    delete: false,
  });
  const [index, setIndex] = React.useState('');
  const [sectionIndex, setSectionIndex] = React.useState('');

  function handleProjectorClick(image) {
    setProjector({ image })
  }

  function handlePopupClose() {
    setProjector({});
    setCall({
      addProject: false,
      editProject: false,
      addExplication: false,
      addSection: false,
      addItem: false,
      delete: false,
    });
    setIndex('');
    setSectionIndex('');
  }

  function handleConclude() {
    setProcess(false);
  }

  function handleEntry(event) {
    event.preventDefault();
    setProcess(true);
    navigate('/projects', { replace: true });
  }

  function handleAddProject(project) {
    api.postProject(project)
      .then((newProject) => {
        setProjects([newProject, ...projects]);
        handlePopupClose();
      })
      .catch((err) => {
        api.errorMessege(err);
      })
  }

  function handleEditProject(project, index) {
    api.patchProject(project, index)
      .then((updatedProject) => {
        setProjects((projects) => {
          return projects.map((project) => {
            return project._id === updatedProject._id
              ? updatedProject
              : project
          })
        });
        handlePopupClose();
      })
      .catch((err) => {
        api.errorMessege(err);
      })
  }

  function handleEditExhibition(data, index) {
    api.patchExplication(data, index)
      .then((updatedProject) => {
        setProjects((projects) => {
          return projects.map((project) => {
            return project._id === updatedProject._id
              ? updatedProject
              : project
          })
        });
        handlePopupClose();
      })
      .then(() => {
        console.log(projects);
      })
      .catch((err) => {
        api.errorMessege(err);
      })
  }

  function handleEditSections(sections, index) {
    api.patchSections(sections, index)
      .then((updatedProject) => {
        setProjects((projects) => {
          return projects.map((project) => {
            return project._id === updatedProject._id
              ? updatedProject
              : project
          })
        });
        handlePopupClose();
      })
      .catch((err) => {
        api.errorMessege(err);
      })
  }

  function handleDeleteProject(id) {
    api.deleteProject(id)
      .then(() => {
        setProjects((state) => state.filter((p) => p._id !== id));
        navigate('/projects', { replace: true });
        handlePopupClose();
      })
      .catch((err) => {
        api.errorMessege(err);
      })
  }

  function callCurator(newCall, newIndex, newSectionIndex) {
    setCall({
      ...call,
      [newCall]: true
    });
    if (newIndex) {
      setIndex(newIndex);
    };
    if (newSectionIndex) {
      setSectionIndex(newSectionIndex);
    };
  }

  function testClick(event) {
    event.preventDefault();
    console.log('Click');
  }

  React.useEffect(() => {
    api.getProjectsArchive()
      .then((projects) => {
        setProjects(projects.reverse());
      })
      .catch(api.errorMessege);
  }, [])
  // загрузить данные

  return (
    <PerformerContext.Provider value={inProcess}>
      <div className='base'>
        <Outside handleImroveClick={testClick} />
        {/* <!-- снаружи --> */}

        <main className='main'>
          <Routes>
            <Route path='/' element={
              <Navigate to='/projects' replace={true} />
            } />
            <Route exact path='/projects' element={
              <Primehall data={projects} callCurator={callCurator} />
            } />
            <Route exact path='/project/:index' element={
              <Exhibition data={projects} handleProjectorClick={handleProjectorClick} callCurator={callCurator} />
            } />
            <Route exact path='/project/:index/:section' element={
              <Exhibition data={projects} handleProjectorClick={handleProjectorClick} callCurator={callCurator} />
            } />
            {/* <Route path='/texts' element={<Primehall data={worksArchive[1]} />} />
            <Route path='/teaching' element={<Primehall data={worksArchive[2]} />} />
            <Route path='/talksConferences' element={<Primehall data={worksArchive[3]} />} /> */}
            <Route path='/admin' element={<OfficeEntrance handleEntry={handleEntry} />} />
          </Routes>
        </main>
        {/* <!-- внутри --> */}

        <Projection
          projector={projector}
          handleClose={handlePopupClose}
          handleDelete={testClick}
        />
        {/* <!-- попап --> */}
        {inProcess &&
          <Button
            className='button_type_indicator'
            label='Exit editing mode.'
            handleClick={handleConclude}
          />
        }
        {inProcess &&
          <>
            <PrimehallCurator
              data={projects}
              call={call}
              index={index}
              handleAddApprove={handleAddProject}
              handleEditApprove={handleEditProject}
              handleClose={handlePopupClose}
              callCurator={callCurator}
            />
            <ExhibitionCurator
              data={projects}
              call={call}
              index={index}
              handleDescriptionApprove={handleEditExhibition}
              handleSectionsApprove={handleEditSections}
              handleClose={handlePopupClose}
            />
            <SectionsCurator
              data={projects}
              call={call}
              index={index}
              sectionIndex={sectionIndex}
              handleImagesApprove={handleEditSections}
              handleVideoApprove={handleEditSections}
              handleLinksApprove={testClick}
              handleClose={handlePopupClose}
            />
            <Confirmation
              call={call}
              index={index}
              handleDelete={handleDeleteProject}
              handleClose={handlePopupClose}
            />
          </>
        }
      </div>
    </PerformerContext.Provider>
  );
}

export default App;
