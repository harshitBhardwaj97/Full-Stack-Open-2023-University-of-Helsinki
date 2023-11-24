interface Content {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  content: Content[];
}

const Content = ({ content }: ContentProps) => {
  return (
    <>
      {content.map((c) => (
        <>
          <p key={c.name}>
            {c.name} {c.exerciseCount}
          </p>
        </>
      ))}
    </>
  );
};

export default Content;
