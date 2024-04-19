import { useState } from "react";
import { ApiFetch } from "../../util/ApiFetch";
import Loading from "../loading/Loading";

import "./SearchComponent.css";

const SearchComponent = ({ title, url, placeholder, setData }) => {
  const apiFetch = new ApiFetch();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  function searchDataName(value) {
    const inputName = value;

    setName(inputName);
    setLoading(true);
    const promisse = apiFetch.getPagesWithToken(
      `${url}${inputName}`,
      "Nenhum tema encontrado!"
    );
    promisse.then((response) => {
      setLoading(false);
      setData(response.data);
    });
  }

  return (
    <div className="container-search">
      <h2 className="search-title">{title}</h2>
      <input
        type="text"
        placeholder={placeholder}
        value={name}
        onChange={(e) => searchDataName(e.target.value)}
        className="search-input"
      />
      {loading && <Loading />}
    </div>
  );
};

export default SearchComponent;
