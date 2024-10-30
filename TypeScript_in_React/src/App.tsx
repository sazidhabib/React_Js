import "./App.css";
import Person from "./Person";

function App() {
  // const fetchUser = () => ({ name: "Sazid", age: 24, isMarried: null });
  // const userFetched = fetchUser();
  return (
    <>
      <Person name={"Sazid"} age={23} isMarried={false} />
      <Person name={"Habib"} age={25} isMarried={true} />
    </>
  );
}

export default App;
