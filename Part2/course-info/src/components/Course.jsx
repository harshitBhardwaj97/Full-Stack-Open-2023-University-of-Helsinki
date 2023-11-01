import React from "react";

const Course = ({ course }) => {
  const Header = () => {
    return <h1>{course.name}</h1>;
  };

  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
  };

  const Content = ({ parts }) => {
    return parts.map((part) => <Part key={part.id} part={part} />);
  };

  const Total = ({ parts }) => {
    const totalExercises = parts.reduce((sum, part) => {
      return sum + part.exercises;
    }, 0);
    return <strong>total of {totalExercises} exercises</strong>;
  };

  return (
    <>
      <Header />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
