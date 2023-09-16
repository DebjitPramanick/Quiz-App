import { SkeletonContainer } from "../styles/component";

interface SkeletonProps {
  img?: boolean;
  height?: string | number;
  width?: string | number;
  text?: boolean;
  className?: string;
  style?: any;
}

const Skeleton = ({
  img,
  height,
  width,
  text,
  className,
  style,
}: SkeletonProps) => {
  return (
    <SkeletonContainer>
      {img && (
        <div
          className={`skeleton-img ${className}`}
          style={{ height, width, ...style }}
        ></div>
      )}
      {text && (
        <div
          className={`skeleton-text ${className}`}
          style={{ height, width, ...style }}
        ></div>
      )}
    </SkeletonContainer>
  );
};

export default Skeleton;
