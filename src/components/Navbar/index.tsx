import "./navbar.css";
import { useCallback, useEffect, useRef, useState, ChangeEvent } from "react";
import downArrow from "../../assets/down.svg";
import settings from "../../assets/Display.svg";
import { options } from "../../utils/filters";
import { Option, Options } from "../../types/interfaces";

function Navbar({
  grouping,
  setGrouping,
  ordering,
  setOrdering,
}: {
  grouping: string;
  setGrouping: (grouping: string) => void;
  ordering: string;
  setOrdering: (ordering: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const componentRef = useRef<HTMLDivElement | null>(null);

  const toogleDropdown = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const handleClickOutside = useCallback((event: any) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setVisible(false);
    }
  }, []);

  const onGroupingChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => setGrouping(e.target.value),
    [setGrouping]
  );
  const onOrderingChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => setOrdering(e.target.value),
    [setOrdering]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  const getOptions = (optionsKey: keyof Options) => {
    const optionsArray = options[optionsKey];
    return optionsArray.map((option: Option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));
  };

  return (
    <nav>
      <div className="display-dropdown" ref={componentRef}>
        <div className="dropdown-label-container" onClick={toogleDropdown}>
          <img src={settings} alt="" />
          <div className="dropdown-label">Display</div>
          <img src={downArrow} alt="" />
        </div>
        <div className={`dropdown-content-container ${visible && "visible"}`}>
          <div className="dropdown-content-row">
            <div className="dropdown-content-label">Grouping</div>
            <select
              name="grouping"
              id="grouping"
              value={grouping}
              onChange={onGroupingChange}
            >
              {getOptions("grouping")}
            </select>
          </div>
          <div className="dropdown-content-row">
            <div className="dropdown-content-label">Ordering</div>
            <select
              name="ordering"
              id="ordering"
              value={ordering}
              onChange={onOrderingChange}
            >
              {getOptions("ordering")}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
