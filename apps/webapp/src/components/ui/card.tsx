interface Props {
  children: React.ReactNode;
}

export const Card = ({ children }: Props) => {
  return (
    <div className="w-full h-full bg-white px-8 py-10 rounded-xl shadow-sm">
      {children}
    </div>
  );
};
