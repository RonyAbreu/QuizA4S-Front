import { useState } from "react";
import { ApiFetch } from "../../util/ApiFetch";
import Loading from "../loading/Loading";

import "./SearchComponent.css";

const SearchComponent = ({
  title,
  url,
  placeholder,
  onSearch,
  setData,
  setTotalPages,
  setCurrentPage,
}) => {
  const apiFetch = new ApiFetch();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  function searchDataName(value) {
    const inputName = value;

    if(onSearch){
      onSearch(inputName);
    } 

    setName(inputName);

    setLoading(true);
    const promisse = apiFetch.getPages(
      `${url}${inputName}`,
      "Nenhum tema encontrado!"
    );

    promisse.then((response) => {
      if (!response.success) {
        setLoading(false);
        setData([])
        setTotalPages(0);
        setCurrentPage(0);
        return;
      }

      setLoading(false);
      setTotalPages(response.totalPages);
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
