import { useState } from "react";
import { ApiFetch } from "../../util/ApiFetch";
import Loading from "../loading/Loading";
import InformationBox from "../informationBox/InformationBox";

import "./SearchComponent.css";

const SearchComponent = ({ url, placeholder, setData }) => {
  const apiFetch = new ApiFetch();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [informationBox, setInformationBox] = useState(false);
  const [activeInput, setActiveInput] = useState(false)

  const [informationText, setInformationText] = useState("");

  function searchThemeName(value) {
    const inputName = value;

    setName(inputName);
    setLoading(true);
    const promisse = apiFetch.getPagesWithToken(
      `${url}${inputName}`,
      "Nenhum tema encontrado!"
    );
    promisse.then((response) => {
      if (!response.success) {
        setActiveInput(true);
        setInformationText(response.message)
        setInformationBox(true)
        setName("");
      }

      setLoading(false);
      setData(response.data);
    });
  }

  function closeBoxEvent(){
    setInformationBox(false);
    setActiveInput(false);
    searchThemeName("");
  }

  return (
    <div className="container-search">
      <input
        type="text"
        placeholder={placeholder}
        value={name}
        onChange={(e) => searchThemeName(e.target.value)}
        className="search-input"
        disabled={activeInput}
      />
      {loading && <Loading />}
      {informationBox && (
        <InformationBox
          icon="exclamation"
          color="red"
          closeBox={closeBoxEvent}
          text={informationText}
        />
      )}
    </div>
  );
};

export default SearchComponent;
