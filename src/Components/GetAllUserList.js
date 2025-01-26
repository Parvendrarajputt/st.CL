import React, { useState, useEffect } from "react";
import axios from "axios";

const GetAllUserList = () => {
  const [users, setUsers] = useState([]);
  const [searchRollNumber, setSearchRollNumber] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/allUsers");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchRollNumber(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/users/${searchRollNumber}`
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${searchRollNumber}`);
      alert(`User with Roll Number ${searchRollNumber} deleted!`);
      const response = await axios.get("http://localhost:8000/api/allUsers");
      setUsers(response.data);
      setUser(null);
      setSearchRollNumber("");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div>
      <h2>Search or delete the user </h2>

      <div>
        <input
          type="number"
          value={searchRollNumber}
          onChange={handleSearchChange}
          placeholder="Enter Roll Number to Search"
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleDelete} disabled={!searchRollNumber}>
          Delete
        </button>
      </div>

      {user ? (
        <div>
          <h3>User Found</h3>
          <p>Name: {user.Name}</p>
          <p>Birthday:  {formatDate(user.Birthday)}</p>
          <p>Address: {user.Address}</p>
          <p>Account Created On: {formatDate(user.Birthday)} </p>
        </div>
      ) : (
        <div>
          <h3>All Users</h3>
          <ul>
            {users.length > 0 ? (
              users.map((user) => (
                <li key={user.RollNumber}>
                  {user.Name} - {formatDate(user.Birthday)} - {user.Address}
                </li>
              ))
            ) : (
              <li>No users found.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetAllUserList;
