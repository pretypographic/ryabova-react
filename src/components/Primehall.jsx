import { useContext } from 'react';
import { PerformerContext } from '../contexts/PerformerContext';
import { Project } from "./Project";

function Primehall({ data }) {
    const projects = Object.keys(data)[0];
    const inProcess = useContext(PerformerContext);

    return (
        <section className="section section_hall_prime">
            {inProcess && <button className='make-button'></button>}
            {data[projects].map((project, i) => (
                <Project data={project} key={i} />
            ))}
        </section>
    )
};

export { Primehall }