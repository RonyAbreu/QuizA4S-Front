import "./ConfirmBox.css";

const ConfirmBox = ({
  title,
  textBtn1,
  textBtn2,
  onClickBtn1,
  onClickBtn2,
}) => {
  return (
    <div className="container-confirm-box">
      <div className="confirm-box">
        <h2 className="confirm-box-title">{title}</h2>
        <i className="bi bi-question-circle-fill"></i>
        <div className="confirm-box-buttons">
          <button type="button" onClick={onClickBtn1}>
            {textBtn1}
          </button>
          <button type="button" onClick={onClickBtn2}>
            {textBtn2}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
