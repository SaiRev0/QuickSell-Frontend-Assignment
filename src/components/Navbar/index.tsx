import "./navbar.css";
import { useCallback, useEffect, useRef, useState, ChangeEvent } from "react";
import downArrow from "../../assets/down.svg";
import settingsIcon from "../../assets/Display.svg";
import { options } from "../../utils/filters";
import { Option, Options } from "../../types/interfaces";

function Navbar({
  groupType,
  setGroupType,
  sortOrder,
  setSortOrder,
}: {
  groupType: string;
  setGroupType: (groupType: string) => void;
  sortOrder: string;
  setSortOrder: (sortOrder: string) => void;
}) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = useCallback(() => {
    setDropdownVisible(!isDropdownVisible);
  }, [isDropdownVisible]);

  const handleOutsideClick = useCallback((event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  }, []);

  const handleGroupChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => setGroupType(e.target.value),
    [setGroupType]
  );
  const handleOrderChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => setSortOrder(e.target.value),
    [setSortOrder]
  );

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const renderOptions = (optionsKey: keyof Options) => {
    const optionList = options[optionsKey];
    return optionList.map((opt: Option) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ));
  };

  return (
    <nav>
      <div className="display-dropdown" ref={dropdownRef}>
        <div className="dropdown-label-container" onClick={toggleDropdown}>
          <img src={settingsIcon} alt="Settings Icon" />
          <div className="dropdown-label">Display</div>
          <img src={downArrow} alt="Dropdown Arrow" />
        </div>
        <div
          className={`dropdown-content-container ${
            isDropdownVisible && "visible"
          }`}
        >
          <div className="dropdown-content-row">
            <div className="dropdown-content-label">Grouping</div>
            <select
              name="groupType"
              id="groupType"
              value={groupType}
              onChange={handleGroupChange}
            >
              {renderOptions("grouping")}
            </select>
          </div>
          <div className="dropdown-content-row">
            <div className="dropdown-content-label">Ordering</div>
            <select
              name="sortOrder"
              id="sortOrder"
              value={sortOrder}
              onChange={handleOrderChange}
            >
              {renderOptions("ordering")}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
