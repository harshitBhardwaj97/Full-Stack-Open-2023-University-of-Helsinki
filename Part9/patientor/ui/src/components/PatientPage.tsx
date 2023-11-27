import { useParams } from "react-router-dom";
import { Gender, Patient } from "../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

interface PatientPageProps {
  patients: Patient[];
}

const PatientPage = ({ patients }: PatientPageProps) => {
  const params = useParams();

  console.log(patients);

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
      </div>
    </>
  );
};

export default PatientPage;
