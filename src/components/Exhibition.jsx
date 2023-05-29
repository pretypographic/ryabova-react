import { useContext } from 'react';
import { useParams, NavLink, useLocation } from 'react-router-dom';
import { PerformerContext } from '../contexts/PerformerContext';
import { Projector } from './Projector';

function Exhibition({ data, handleProjectorClick, handleTestClick }) {
    let { index } = useParams();
    let projects = data[Object.keys(data)[0]];
    let location = useLocation();
    const project = projects.find((project) => {
        return project.index === index;
    });
    const inProcess = useContext(PerformerContext);

    const tumblerHandler = ({ isActive }) => {
        return `dashboard__tumbler ${isActive && "dashboard__tumbler_selected"}`;
    }

    return (
        <>
            <article className="article article_type_head">
                {inProcess && <button className='make-button make-button_small'></button>}
                <h2 className="article__title">{project.title}</h2>
            </article>
            {/* <!-- название --> */}

            <article className="article article_type_explication">
                {project.text && project.text.map((line, i) => (
                    <p className='article__text' key={i}>{line}</p>
                ))}
                {inProcess && <button className='make-button make-button_small'></button>}
            </article>
            {/* <!-- экспликация --> */}

            {/* <Outlet /> */}
            <section className='section'>
                <nav className='dashboard dashboard_black'>
                    {inProcess && <button className='make-button make-button_small'></button>}
                    {project.sections && project.sections.map((section, i) => (
                        <NavLink
                            key={i}
                            to={`/project/${index}/${Object.keys(section)}`}
                            className={tumblerHandler}
                        >{Object.keys(section)}</NavLink>
                    ))}
                </nav>
                {project.sections && project.sections.map((section, i) => (
                    location.pathname === `/project/${index}/${Object.keys(section)}` &&
                    <article className="article article_type_exposition" key={i}>
                        {inProcess && <button className='make-button'></button>}
                        {project.sections[i] && section[Object.keys(section)].map((item, i) => (
                            <Projector key={i} item={item} handleProjectorClick={handleProjectorClick} handleTestClick={handleTestClick} />
                        ))}
                    </article>
                ))}
            </section>
            {/* <!-- экспозиция --> */}
        </>
    )
};

export { Exhibition }