import React from "react";
import Avatar from "react-avatar";


const Profile = () => {
  return (
    <main>
      {/* <h1>Hello World!</h1> */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar name="Manjot Singh" round />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Hello, Manjot Singh!</h1>
      </div>

      <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      >
        <h1>
          You're overall Status is: 100%!
        </h1>
      </div>






    </main>
  );
};

export default Profile;
