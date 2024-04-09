import "./InformationBox.css";

// icon vai ser "exclamation" para erro e "check" para sucesso

const InformationBox = ({ text, closeBox, icon, color}) => {
  return (
    <div className="box">
      <h2 className="text" style={{color: `${color}`}}>{text}</h2>
      <i className={`bi bi-${icon}-circle-fill box-icon`} style={{color: `${color}`}}></i>
      <button
        className="button"
        type="button"
        onClick={closeBox}
        style={{backgroundColor: `${color}`}}
      >
        Ok
      </button>
    </div>
  );
};

export default InformationBox;
