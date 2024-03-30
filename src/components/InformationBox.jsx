import "../css/InformationBox.css";

const InformationBox = ({ text, closeBox}) => {
  return (
    <div className="box">
      <h2 className="text">{text}</h2>
      <i class="bi bi-exclamation-circle-fill"></i>
      <button
        className="button"
        type="button"
        onClick={closeBox}
      >
        Ok
      </button>
    </div>
  );
};

export default InformationBox;
