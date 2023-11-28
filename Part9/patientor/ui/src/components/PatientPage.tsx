import { useParams } from "react-router-dom";
import { Gender, Patient, Diagnosis } from "../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryDetails from "./EntryDetails";

interface PatientPageProps {
  patients: Patient[];
  diagnosis: Diagnosis[];
}

const PatientPage = ({ patients, diagnosis }: PatientPageProps) => {
  const params = useParams();

  const patient = patients.find((patient) => patient.id === params.id);

  const getGenderIcon = (gender: Gender | undefined) => {
    switch (gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      case "other":
        return <TransgenderIcon />;
    }
  };

  if (!patient) {
    return null;
  }

  return (
    <>
      <div className="patientInfo">
        <h1>
          {patient.name} {getGenderIcon(patient.gender)}
        </h1>
        <p>Occupation : {patient.occupation}</p>
        <h3>{patient.entries.length > 0 ? "Entries" : "No Entries Found"}</h3>
        {patient?.entries?.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} diagnosis={diagnosis} />
        ))}
      </div>
    </>
  );
};

export default PatientPage;
