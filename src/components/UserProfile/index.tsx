import React from "react";
import "./userProfile.css";

function UserProfile({
  name,
  available,
}: {
  name: string;
  available: boolean;
}) {
  const initials = React.useMemo(() => {
    return name
      .split(" ")
      .map((item: string) => item[0])
      .join("");
  }, [name]);

  return (
    <div className="UserProfile-container">
      <div className="UserProfile-text">{initials}</div>
      <div className={`user-status ${available && "available"}`}></div>
    </div>
  );
}

export default UserProfile;
