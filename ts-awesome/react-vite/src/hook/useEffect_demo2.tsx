/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
  overflow: "auto",
};

interface UserData {
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
}

export function UseEffectDemo2() {
  const [userId, setUserId] = useState(1);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(
    () => {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const res = await fetch(
            `https://jsonplaceholder.typicode.com/users/${userId}`,
          );
          if (!res.ok) {
            throw new Error("Network error");
          }
          const data = await res.json();
          setUserData(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    } /* effect (setup) */,
    [userId] /* dependencies */,
  );

  const userIdChangeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(Number.parseInt(ev.target.value));
  };

  return (
    <div style={itemStyle}>
      UserID
      <input
        type="number"
        value={userId}
        onChange={userIdChangeHandler}
        min="1"
        max={10}
      ></input>
      {loading && <p>Loading...</p>}
      {error && <p>error: {error}</p>}
      {userData && (
        <div>
          <p>UserData</p>
          <p>name: {userData.name}</p>
          <p>email: {userData.email}</p>
          <p>username: {userData.username}</p>
          <p>phone: {userData.phone}</p>
          <p>website: {userData.website}</p>
        </div>
      )}
    </div>
  );
}
