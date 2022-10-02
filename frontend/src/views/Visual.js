import { NavLink } from "react-router-dom";
export default function Visual({ selected }) {
  return (
    <>
      <NavLink to="/" className="NavLink">
        Go back
      </NavLink>
      {!selected ? (
        <span>No data in the set.</span>
      ) : (
        <>
          <span>Placeholder, in set:</span>
          <ol>
            {selected.map((acct) => (
              <li key={selected.indexOf(acct)}>{acct.username}</li>
            ))}
          </ol>
        </>
      )}
    </>
  );
}
