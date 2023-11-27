interface InputArg {
  type: string;
  name: string;
  id: string;
}

interface InputProps {
  inputArg: InputArg;
}
const Input = ({ inputArg }: InputProps) => {
  console.log(inputArg);
  return <input type={inputArg.type} name={inputArg.name} id={inputArg.id} />;
};

export default Input;
