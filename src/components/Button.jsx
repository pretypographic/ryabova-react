function Button({ className, label, type, handleClick, small }) {
  return (
    <button
      className={`button ${className} ${small && `button_type_small`}`}
      aria-label={label}
      type={!type && 'button'}
      onClick={handleClick}
    ></button>
  )
};

export { Button }