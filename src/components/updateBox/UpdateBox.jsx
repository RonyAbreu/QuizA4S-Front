import "./UpdateBox.css";

// Exemplo de Input

/* inputs = [
  {
    label: "Nome",
    type: "text",
    placeholder: "Digite seu nome",
    value: "Valor do input",
  },
];
*/
const UpdateBox = ({ title, inputs, onChange, onClickSave, onClickCancel }) => {
  return (
    <div className="container-update-box">
      <div className="update-box">
        <h2 className="update-box-title">{title}</h2>
        {inputs &&
          inputs.map((input) => (
            <label className="update-box-input" key={input.label}>
              <p>{input.label}</p>
              <input
                type={input.type}
                placeholder={input.placeholder}
                value={input.value}
                onChange={(e) => onChange(e.target.value, input.label)}
              />
            </label>
          ))}

        <div className="update-box-buttons">
          <button type="button" onClick={onClickSave}>
            Salvar
          </button>
          <button type="button" onClick={onClickCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBox;
