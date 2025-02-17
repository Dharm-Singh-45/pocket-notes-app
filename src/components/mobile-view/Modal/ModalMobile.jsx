import React, { useEffect, useState } from "react";
import blue from "../../../images/blue.png";
import brown from "../../../images/brown.png";
import darkblue from "../../../images/dark blue.png";
import skyblue from "../../../images/sky blue.png";
import violet from "../../../images/violet.png";
import purple from "../../../images/purple.png";
import "./ModalMobile.css";

const ModalMobile = ({ isOpen, onClose, setGroupNames, setColor }) => {
  const [input, setInput] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [clickedColors, setClickedColors] = useState({});
  const [colorError, setColorError] = useState("");

  const handleColorSelection = (color) => {
    setColor(color);
    setSelectedColor(color);
    setColorError("");
  };

  const handleInput = (e) => {
    if (input.trim().length >= 15) {
      setColorError("We recommend not more than this length for the group name");
    } else if(input.trim().length < 15){
      setColorError("");
    }
  };

  const handleClick = (color) => {
    const updatedClickedColors = {};
    Object.keys(clickedColors).forEach((key) => {
      updatedClickedColors[key] = false;
    });
    updatedClickedColors[color] = true;
    setClickedColors(updatedClickedColors);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!isOpen) return;
      const modalContent = document.getElementById("modal-content-mobile");
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
  if (input.trim() === "" && selectedColor.trim() === "") {
    setColorError("Please Choose a GroupName and a color!");
  } else if (input.trim() === "") {
    setColorError("Please Choose a GroupName!");
  } else if (selectedColor.trim() === "") {  // Ensure color is checked separately
    setColorError("Please Choose a color!");
  } else {
    setGroupNames((prevGroupNames) => ({
      ...prevGroupNames,
      [input]: { color: selectedColor },
    }));
    onClose();
  }
};

  return (
    <div
      id="modal-content-mobile"
      style={{ height: colorError ? "284px" : "211px" }}
    >
      <h2>Create New Group</h2>
      <div style={{ display: "flex", gap: "5px" }}>
        <h3>Group Name</h3>
        <input
          type="text"
          placeholder="Enter Group Name"
          onChange={(e) => {
            setInput(e.target.value);
            handleInput()
          }}
        />
      </div>
      <div  className="choose-color-container">
        <h3>Choose color</h3>
        <div
          style={{
            display: "flex",
            gap: "1px",
            margin: "auto 0",
            justifyContent: "center",
          }}
        >
          <button
            className="color-button"
            onClick={() => {
              handleColorSelection("#FF79F2");
              handleClick("#FF79F2");
            }}
          >
            <img
              className={
                clickedColors["#FF79F2"]
                  ? "color-image selected"
                  : "color-image"
              }
              src={violet}
              alt="Violet"
            />
          </button>
          <button
            className="color-button"
            onClick={() => {
              handleColorSelection("#B38BFA");
              handleClick("#B38BFA");
            }}
          >
            <img
              className={
                clickedColors["#B38BFA"]
                  ? "color-image selected"
                  : "color-image"
              }
              src={purple}
              alt="purple"
            />
          </button>
          <button
            className="color-button"
            onClick={() => {
              handleColorSelection("#43E6FC");
              handleClick("#43E6FC");
            }}
          >
            <img
              className={
                clickedColors["#43E6FC"]
                  ? "color-image selected"
                  : "color-image"
              }
              src={skyblue}
              alt="skyblue"
            />
          </button>
          <button
            className="color-button"
            onClick={() => {
              handleColorSelection("#F19576");
              handleClick("#F19576");
            }}
          >
            <img
              className={
                clickedColors["#F19576"]
                  ? "color-image selected"
                  : "color-image"
              }
              src={brown}
              alt="brown"
            />
          </button>
          <button
            className="color-button"
            onClick={() => {
              handleColorSelection("#0047FF");
              handleClick("#0047FF");
            }}
          >
            <img
              className={
                clickedColors["#0047FF"]
                  ? "color-image selected"
                  : "color-image"
              }
              src={darkblue}
              alt="darkblue"
            />
          </button>
          <button
            className="color-button"
            onClick={() => {
              handleColorSelection("#6691FF");
              handleClick("#6691FF");
            }}
          >
            <img
              className={
                clickedColors["#6691FF"]
                  ? "color-image selected"
                  : "color-image"
              }
              src={blue}
              alt="blue"
            />
          </button>
        </div>
      </div>
      <button className="create-button" onClick={() => handleGroupName()}>
        Create
      </button>
      <div style={{ color: "red" }}>{colorError && <p>{colorError}</p>}</div>
    </div>
  );
};

export default ModalMobile;
