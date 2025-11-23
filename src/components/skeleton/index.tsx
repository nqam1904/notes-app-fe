interface IProps {
  width: string;
  height?: string;
}

export const SK_Box = ({ width, height }: IProps) => {
  return (
    <div
      className="inline-block relative bg-gray-50 rounded overflow-hidden after:absolute after:inset-0 after:-translate-x-full after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent after:animate-[loading_1.5s_infinite]"
      style={{ width, height }}
    />
  );
};

export const SK_Circle = ({ width }: IProps) => {
  return (
    <div
      className="inline-block relative bg-gray-50 rounded-full overflow-hidden after:absolute after:inset-0 after:-translate-x-full after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent after:animate-[loading_1.5s_infinite]"
      style={{ width, height: width }}
    />
  );
};

