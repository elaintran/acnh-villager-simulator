import React from "react";
import "./style.css";

function SearchBar(props) {
    return (
        <form className="search" onSubmit={props.submit}>
            <i className="fas fa-search"></i>
            <input type="text" name="query" placeholder={props.children} onChange={props.change} required />
        </form>
        // <div className="search-bar">
        //     {props.children}
        // </div>
    );
}

export default SearchBar;