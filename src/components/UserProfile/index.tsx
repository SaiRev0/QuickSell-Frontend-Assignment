import React from "react";
import "./userProfile.css";

function UserProfile({
  userName,
  isAvailable,
}: {
  userName: string;
  isAvailable: boolean;
}) {
  // Compute user initials based on the name
  const userInitials = React.useMemo(() => {
    return userName
      .split(" ")
      .map((part: string) => part[0])
      .join("");
  }, [userName]);

  return (
    <div className="UserProfile-container">
      <div className="UserProfile-text">{userInitials}</div>
      <div className={`user-status ${isAvailable && "available"}`}></div>
    </div>
  );
}

export default UserProfile;
