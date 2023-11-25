import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  content: CoursePart[];
}

const Content = ({ content }: ContentProps) => {
  return (
    <>
      {content.map((c) => (
        <>
          <p key={c.name}>
            <b>Name and Exercise Count :</b> {c.name}, {c.exerciseCount}
          </p>
          <Part part={c} />
          <hr />
        </>
      ))}
    </>
  );
};
export default Content;
