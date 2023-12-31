import { filterAnecdote } from "../reducers/filterSlice";
import { useDispatch, useSelector } from "react-redux";

const Filter = ({ handleQuery }) => {
  const dispatch = useDispatch();

  //   const filter = useSelector((state) => state.filter);
  const handleChange = (e) => {
    handleQuery(e.target.value);
    dispatch(filterAnecdote(e.target.value));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
      {/* {filter} */}
    </div>
  );
};

export default Filter;
