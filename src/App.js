import "./App.css";
import UserList from "./components/UserList";
import AddOrEditUser from "./components/AddOrEditUser";
import { useState } from "react";
import { v4 as uuid } from "uuid";

function App() {
  const initialUserState = { id: "", name: "", mobile: "", email: "" };
  const [isShowForm, setIsShowForm] = useState(false);
  const [userData, setUserData] = useState([]);
  const [user, setUser] = useState(initialUserState);
  const [isEditUser, setIsEditUser] = useState(false);

  const handleUserData = (event) => {
    const { name, value } = event.target;
    setUser((prevSate) => ({
      ...prevSate,
      [name]: value,
    }));
  };

  const setUserToEdit = (userId) => {
    let userToBeEdited = userData.find((user) => user.id === userId);
    setUser(userToBeEdited);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    user.id = uuid();
    setUserData([...userData, user]);
    setIsShowForm(false);
    setIsEditUser(false);
    setUser(initialUserState);
  };

  const deleteUser = (id) => {
    let newUserList = userData.filter((user) => user.id !== id);
    setUserData(newUserList);
  };

  const updateUser = (e, id) => {
    e.preventDefault();
    setUserData(userData.map((data) => (data.id === id ? user : data)));
    setIsShowForm(false);
    setIsEditUser(false);
    setUser(initialUserState);
  };

  return (
    <div className="max-w-5xl mt-5 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl  mx-auto">
        {!isShowForm && !isEditUser ? (
          <>
            {" "}
            <div className="flex justify-end">
              <button
                onClick={() => setIsShowForm(true)}
                className="inline-flex items-center px-6 py-2 text-xs sm:text-sm leading-4 font-normal rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Add User
              </button>
            </div>
            <UserList
              setIsEditUser={setIsEditUser}
              userData={userData}
              deleteUser={deleteUser}
              setUserToEdit={setUserToEdit}
            />
          </>
        ) : (
          <AddOrEditUser
            handleUserData={handleUserData}
            user={user}
            handleSubmit={handleSubmit}
            isEditUser={isEditUser}
            updateUser={updateUser}
            setIsShowForm={setIsShowForm}
            setIsEditUser={setIsEditUser}
          />
        )}
      </div>
    </div>
  );
}

export default App;
