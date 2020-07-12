import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style.css";

// function SearchBar(props) {
//     return (
//         <form className="search" onSubmit={props.submit}>
//             <i className="fas fa-search"></i>
//             <input type="text" name="query" placeholder={props.children} onChange={props.change} required />
//         </form>
//     );
// }

class SearchBar extends Component {
    static propTypes = {
        options: PropTypes.instanceOf(Array).isRequired
    };

    state = {
        activeOption: 0,
        filteredOptions: [],
        showOptions: false,
        userInput: ""
    }

    onChange = event => {
        const { options } = this.props;
        const userInput = event.currentTarget.value;
        const filteredOptions = options.filter((optionName) => 
            optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
            activeOption: 0,
            filteredOptions,
            showOptions: true,
            userInput: event.currentTarget.value
        });
    }

    onClick = event => {
        this.setState({
            activeOption: 0,
            filteredOptions: [],
            showOptions: false,
            userInput: event.currentTarget.innerText
        });
    };

    onKeyDown = event => {
        const { activeOption, filteredOptions } = this.state;
    
        if (event.keyCode === 13) {
            this.setState({
                activeOption: 0,
                showOptions: false,
                userInput: filteredOptions[activeOption]
            });
        } else if (event.keyCode === 38) {
            if (activeOption === 0) {
                return;
            }
            this.setState({ activeOption: activeOption - 1 });
        } else if (event.keyCode === 40) {
            if (activeOption === filteredOptions.length - 1) {
                console.log(activeOption);
                return;
            }
            this.setState({ activeOption: activeOption + 1 });
        }
    };    

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeOption,
                filteredOptions,
                showOptions,
                userInput }
            } = this;
        let optionList;
        if (showOptions && userInput) {
            if (filteredOptions.length) {
                optionList = (
                    <ul className="options">
                        {filteredOptions.map((optionName, index) => {
                            let className;
                            if (index === activeOption) {
                                className = 'option-active';
                            }
                            return (
                                <li className={className} key={optionName} onClick={onClick}>
                                    {optionName}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                optionList = (
                    <div className="no-options">
                        <em>No Option!</em>
                    </div>
                );
            }
        }
        return (
            <React.Fragment>
                <div className="search">
                    <input
                        type="text"
                        className="search-box"
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        value={userInput}
                    />
                    <input type="submit" value="" className="search-btn" />
                </div>
                {optionList}
            </React.Fragment>
        );
    }
}

export default SearchBar;