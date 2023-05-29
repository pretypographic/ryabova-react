import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// реакт
import { PerformerContext } from '../contexts/PerformerContext';

import { Outside } from './Outside';
import { Primehall } from './Primehall';
import { Exhibition } from './Exhibition';
import { Projection } from './Projection';
import { Device } from './Device';
// компоненты
import { worksArchive } from '../utils/data';
// архив

function App() {
    const [projector, setProjector] = React.useState({});
    const [inProcess, setProcess] = React.useState(true);

    function handleProjectorClick(image) {
        setProjector({ image })
    }

    function handlePopupClose() {
        setProjector({});
    }

    function handleConclude() {
        setProcess(false);
    }

    // function handleTestClick(e) {
    //     console.log(e.currentTarget)
    // }

    return (
        <PerformerContext.Provider value={inProcess}>
            <div className="base">
                <Outside />
                {/* <!-- снаружи --> */}

                <main className="main">
                    <Routes>
                        <Route path='/' element={<Navigate to="/projects" replace={true} />} />
                        <Route path='/projects' element={<Primehall data={worksArchive[0]} />} />
                        <Route exact path='/project/:index' element={<Exhibition data={worksArchive[0]} handleProjectorClick={handleProjectorClick} />} />
                        <Route exact path='/project/:index/:section' element={<Exhibition data={worksArchive[0]} handleProjectorClick={handleProjectorClick} />} />
                        <Route path='/texts' element={<Primehall data={worksArchive[1]} />} />
                        <Route path='/teaching' element={<Primehall data={worksArchive[2]} />} />
                        <Route path='/talksConferences' element={<Primehall data={worksArchive[3]} />} />
                    </Routes>
                </main>
                {/* <!-- внутри --> */}

                <Projection projector={projector} handleClose={handlePopupClose} />
                {/* <!-- попап --> */}

                <Device />
                {inProcess && <button className="indicator" onClick={handleConclude}></button>}
            </div>
        </PerformerContext.Provider>
    );
}

export default App;
