import "./spinner.css";
import backlog from "../../assets/Backlog.svg";

function Spinner({ fullscreen = true }: { fullscreen?: boolean }) {
  return (
    <div className={`spinner-container ${fullscreen && "fullscreen"}`}>
      <img src={backlog} alt="backlog" className="spinner-image" />
    </div>
  );
}

export default Spinner;
