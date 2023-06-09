import { Link, useNavigate } from 'react-router-dom';

function Project({ data }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/project/${data._id}`);
    }

    return (
        <article className="article article_type_responsive">
            <img
                className="article__image"
                src={data.cover}
                alt='Close.'
                onClick={handleClick}
            />
            <Link
                to={`/project/${data._id}`}
                className="article__title"
            >{data.title}</Link>
        </article>
    )
};

export { Project }