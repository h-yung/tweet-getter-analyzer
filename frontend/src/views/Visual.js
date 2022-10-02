import { NavLink } from "react-router-dom";
import Chart from "../components/Chart";

export default function Visual({ selected, setSelected, earliestDate }) {
  const removeFromSet = (e) => {
    const user = e.target.id;
    console.log(`removing ${user}`);
    const newSelected = selected.filter((acct) => !acct.username === user);
    console.log(
      newSelected.map((acct) => acct.username).join(", ") + " remain"
    );
    console.log(newSelected.length);
    // setSelected(newSelected);
  };

  return (
    <>
      <NavLink to="/" className="NavLink">
        Return to tweet list
      </NavLink>
      {!selected ? (
        <span>No data in the set.</span>
      ) : (
        <>
          <h1 className="Chart__title">Comparative sentiment, 30-day span</h1>

          <Chart
            selected={selected}
            setSelected={setSelected}
            earliestDate={earliestDate}
          />
        </>
      )}
    </>
  );
}
