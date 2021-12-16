import { useState } from "react";

const Searchbar = ({ hendleSubmit }) => {
  const [inputText, setinputText] = useState("");

  const hendleSubmitInput = (e) => {
    e.preventDefault();
    hendleSubmit(inputText);
  };

  const handelChange = (e) => {
    setinputText(e.target.value.toLowerCase());
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={hendleSubmitInput}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          onChange={handelChange}
          value={inputText}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
