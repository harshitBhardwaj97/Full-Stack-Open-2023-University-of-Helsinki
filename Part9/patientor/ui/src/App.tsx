import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Patient, Diagnosis } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

  // console.log(diagnosis);

  const fetchPatientList = async () => {
    const patients = await patientService.getAll();
    setPatients(patients);
  };

  const fetchDiagnosis = async () => {
    const diagnosis = await patientService.getDiagnosis();
    setDiagnosis(diagnosis);
  };

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    void fetchPatientList();
    void fetchDiagnosis();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route
              path="/:id"
              element={
                <PatientPage patients={patients} diagnosis={diagnosis} />
              }
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
