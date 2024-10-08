import React, { useState } from "react";

import AddUser from "./Component/Users/AddUser";
import UserList from "./Component/Users/UserList";

function App() {
  const [userList, setUserList] = useState([]);

  const addUserHandler = (userName, userAge) => {
    setUserList((prevSubmitList) => {
      return [
        ...prevSubmitList,
        { uName: userName, uAge: userAge, id: Math.random().toString() },
      ];
    });
  };

  return (
    <div>
      <AddUser onUsreSubmit={addUserHandler} />

      <UserList users={userList} />
    </div>
  );
}

export default App;
