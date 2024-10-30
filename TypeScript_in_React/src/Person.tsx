import { useState } from "react";
export interface Person {
  name: string;
  age: number;
  isMarried: boolean;
}

const Person = (props: Person) => {
  //   const [isShowInfo, setShowInfo] = useState<boolean | null>(false);
  //   const toggleInfo = () => setShowInfo((prev) => !prev);
  const [personBio, setPersonBio] = useState<string | null>(null);

  return (
    <div>
      {isShowInfo && (
        <>
          <p>Name: {props.name}</p>
          <p>Name: {props.age}</p>
          <p>This person{props.isMarried ? "is married" : "is single"}</p>
        </>
      )}
      <button onClick={toggleInfo}>ToggleInfo</button>
      <p>
        {props.name} Bio:{personBio ? "No Bio Available" : personBio}
      </p>
      <input type="text" />
    </div>
  );
};

export default Person;
