import "../styles/MainButton/MainButton.scss";

type ButtonProps = {
  className: string;
  onClick: () => void;
  children: React.ReactNode;
};

export const MainButton = ({ onClick, className, children }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};
