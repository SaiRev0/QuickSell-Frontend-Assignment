import "./spinner.css";
import loadingIcon from "../../assets/Backlog.svg";

function LoadingSpinner({
  fullscreenMode = true,
}: {
  fullscreenMode?: boolean;
}) {
  return (
    <div className={`spinner-container ${fullscreenMode && "fullscreen"}`}>
      <img src={loadingIcon} alt="Loading" className="spinner-image" />
    </div>
  );
}

export default LoadingSpinner;
