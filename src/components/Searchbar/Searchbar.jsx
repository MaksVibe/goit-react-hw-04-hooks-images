import { Component } from "react";

class Searchbar extends Component {
  state = {
    inputText: "",
  };
  hendleSubmit = (e) => {
    e.preventDefault();
    this.props.hendleSubmit(this.state.inputText);
  };
  handelChange = (e) => {
    this.setState({ inputText: e.target.value.toLowerCase() });
  };
  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.hendleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            onChange={this.handelChange}
            value={this.state.inputText}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
