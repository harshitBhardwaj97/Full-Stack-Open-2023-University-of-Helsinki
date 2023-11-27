interface TotalProps {
  totalExercises: number;
}

const Total = ({ totalExercises }: TotalProps) => {
  return (
    <p>
      <b>Number of exercises : </b>
      {totalExercises}
    </p>
  );
};

export default Total;
