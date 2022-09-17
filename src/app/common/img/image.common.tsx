interface ImgaeProps {
  link?: string;
  alt?: string;
  className?: string;
  style: any;
}
export const Image = ({ link, alt, className, style }: ImgaeProps) => {
  return (
    <img
      src={link}
      alt={alt}
      className={className ? className : null}
      style={style ? style : null}
    />
  );
};
