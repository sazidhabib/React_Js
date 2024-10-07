import react from "react";

const ResultTable = (props) => {
  return (
    <div className="mt-3 card" style={{ width: "100%", opacity: 1 }}>
      {props.submittedData.length === 0 ? (
        <p>No data submitted yet.</p>
      ) : (
        props.submittedData.map((data, index) => (
          <ul key={index} className="list-group list-group-flush">
            <li className="list-group-item">
              {data.UserName} {data.UserAge}
            </li>
          </ul>
        ))
      )}
    </div>
  );
};

export default ResultTable;
