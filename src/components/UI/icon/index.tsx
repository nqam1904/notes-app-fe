import Image from "next/image";
type IconProps = {
  width?: number;
  height?: number;
  className?: string;
  src: string;
};
const Icon: React.FC<IconProps> = (props) => {
  const { width = 24, height = 24, src = "", className = "" } = props;
  return (
    <Image
      alt="icon"
      src={src}
      width={width}
      height={height}
      priority
      quality={100}
      className={className}
    />
  );
};
export default Icon;
