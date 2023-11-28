import { Entry, Diagnosis } from "../types";

const entryStyle = {
  border: "1px solid black",
  borderRadius: "10px",
  padding: "10px",
  margin: "10px",
};

interface EntryProps {
  entry: Entry;
  diagnosis: Diagnosis[];
}

const EntryDetails = ({ entry, diagnosis }: EntryProps) => {
  const getDiagnosisName = (code: string): string | undefined => {
    const foundDiagnosis = diagnosis.find((item) => item.code === code);
    return foundDiagnosis?.name;
  };

  return (
    <>
      <div key={entry.id} style={entryStyle}>
        <p>
          <strong>Date :</strong> {entry.date}
        </p>
        <p>
          <strong>Description:</strong> <em>{entry.description}</em>
        </p>
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>
              {code} : {getDiagnosisName(code)}
            </li>
          ))}
        </ul>
        <p>
          <strong>Diagnosed By :</strong> {entry.specialist}
        </p>
        <p>
          <strong>Type :</strong> {entry.type}
        </p>
        {entry.type === "HealthCheck" && (
          <p>
            <strong>Health Check Rating :</strong> {entry.healthCheckRating}
          </p>
        )}
      </div>
    </>
  );
};

export default EntryDetails;
