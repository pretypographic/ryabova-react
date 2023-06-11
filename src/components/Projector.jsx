function Projector({ item, handleProjectorClick }) {
    function handleClick() {
        handleProjectorClick(item);
    }

    return (
        <img
            className='article__image'
            src={item}
            alt={`Предмет`}
            onMouseDown={handleClick}
        />
    )
};

export { Projector }