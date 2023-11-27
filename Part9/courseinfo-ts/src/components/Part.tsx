import { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <b>Description : </b>
          <i>{part.description}</i>
        </p>
      );

    case "special":
      return (
        <>
          <p>
            <b>Description : </b>
            <i>{part.description}</i>
          </p>
          <b>Requirements :</b>
          {part.requirements.map((p) => (
            <ul>
              <li>{p}</li>
            </ul>
          ))}
        </>
      );

    case "group":
      return (
        <p>
          <b>Group Project Count :</b> {part.groupProjectCount}
        </p>
      );

    case "backgroundMaterial":
      return (
        <p>
          <b>Background Material : </b>
          {part.backgroundMaterial}
        </p>
      );

    default:
      return assertNever(part);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part;
