import { NavLink } from "react-router-dom";
import Chart from "../components/Chart";

export default function Visual({ selected, setSelected, earliestDate }) {
  return (
    <>
      <NavLink to="/" className="NavLink">
        Go back
      </NavLink>
      {selected && (
        <button type="button" onClick={() => setSelected("")}>
          Remove all sets
        </button>
      )}
      {!selected ? (
        <span>No data in the set.</span>
      ) : (
        <div className="Chart__wrapper">
          <Chart selected={selected} earliestDate={earliestDate} />
        </div>
      )}
    </>
  );
}
