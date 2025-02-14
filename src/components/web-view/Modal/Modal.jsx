import React, { useEffect, useState } from "react";
import blue from "../../../images/blue.png";
import brown from "../../../images/brown.png";
import darkblue from "../../../images/dark blue.png";
import skyblue from "../../../images/sky blue.png";
import violet from "../../../images/violet.png";
import purple from "../../../images/purple.png";
import "./Modal.css";

const Modal = ({ isOpen, onClose, setGroupNames, setColor }) => {
  const [input, setInput] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [clickedColors, setClickedColors] = useState({});
  const [colorError, setColorError] = useState("");

  const handleColorSelection = (color) => {
    setColor(color);
    setSelectedColor(color);
    setColorError(" ");
  };

  const handleClick = (color) => {
    const updatedClickedColors = {};
    Object.keys(clickedColors).forEach((key) => {
      updatedClickedColors[key] = false;
    });
    updatedClickedColors[color] = true;
    setClickedColors(updatedClickedColors);
  };

  const handleInput = (e) => {
    if (input.trim().length >= 15) {
      setColorError(
        "We recommend not more than this length for the group name"
      );
    } else if (input.trim().length < 15) {
      setColorError("");
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!isOpen) return;

      const modalContent = document.getElementById("modal-content-desktop");
      if (!modalContent.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleGroupName = () => {
    if (input.trim() !== "" && selectedColor.trim() !== "") {
      setGroupNames((prevGroupNames) => ({
        ...prevGroupNames,
        [input]: { color: selectedColor },
      }));
      onClose();
    } else {
      if (input.trim() === "" && selectedColor.trim() === "") {
        setColorError("Please Choose a GroupName and a color!");
      } else if (input.trim() === "") {
        setColorError("Please Choose a GroupName!");
      } else {
        setColorError("Please Choose a color!");
      }
    }
  };

  return (
    <div className="modal-container" id="modal-content-desktop">
      <h1>Create New Group</h1>
      <div className="group-name-container">
        <h2>Group Name</h2>
        <input
          className="group-name-input"
          type="text"
          placeholder="Enter group name"
          onChange={(e) => {
            setInput(e.target.value);
            handleInput();
          }}
        />
      </div>
      <div className="color-selection-container">
        <h2>Choose color</h2>
        <div id="color-buttons-container">
          <button
            className={`color-button ${
              clickedColors["#FF79F2"] ? "selected" : ""
            }`}
            onClick={() => {
              handleColorSelection("#FF79F2");
              handleClick("#FF79F2");
            }}
          >
            <img className="color-image" src={violet} alt="Violet" />
          </button>

          <button
            className={`color-button ${
              clickedColors["#B38BFA"] ? "selected" : ""
            }`}
            onClick={() => {
              handleColorSelection("#B38BFA");
              handleClick("#B38BFA");
            }}
          >
            <img className="color-image" src={purple} alt="Purple" />
          </button>

          <button
            className={`color-button ${
              clickedColors["#43E6FC"] ? "selected" : ""
            }`}
            onClick={() => {
              handleColorSelection("#43E6FC");
              handleClick("#43E6FC");
            }}
          >
            <img className="color-image" src={skyblue} alt="Sky Blue" />
          </button>

          <button
            className={`color-button ${
              clickedColors["#F19576"] ? "selected" : ""
            }`}
            onClick={() => {
              handleColorSelection("#F19576");
              handleClick("#F19576");
            }}
          >
            <img className="color-image" src={brown} alt="Brown" />
          </button>

          <button
            className={`color-button ${
              clickedColors["#0047FF"] ? "selected" : ""
            }`}
            onClick={() => {
              handleColorSelection("#0047FF");
              handleClick("#0047FF");
            }}
          >
            <img className="color-image" src={darkblue} alt="Dark Blue" />
          </button>

          <button
            className={`color-button ${
              clickedColors["#6691FF"] ? "selected" : ""
            }`}
            onClick={() => {
              handleColorSelection("#6691FF");
              handleClick("#6691FF");
            }}
          >
            <img className="color-image" src={blue} alt="Blue" />
          </button>
        </div>
      </div>
      <button
        className="create-button"
        onClick={() => {
          handleGroupName();
        }}
      >
        Create
      </button>
      <div style={{ color: "red" }}>{colorError && <p>{colorError}</p>}</div>
    </div>
  );
};

export default Modal;
