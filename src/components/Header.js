import React from "react";
import { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import Options from "./Options";
import menuButton from "../static/menu-button.svg";
import addJournalButton from "../static/add-journal.svg";
import searchButton from "../static/search.svg";
import optionsButton from "../static/options.svg";
import exitButton from "../static/exit.svg";
import accountButton from "../static/account.svg";
import faceshot from "../static/me.jpg";

const Header = () => {
  const [searching, showSearch] = useState(false);
  const [addingJournal, addJournalTitle] = useState(false);
  const [optionsShow, viewOptions] = useState(false);
  const [showMenu, viewMenu] = useState(false);

  const searchUpDown = () => {
    if (searching) {
      return "search-bar-slide-down";
    } else {
      return "search-bar-slide-up";
    }
  };

  const addJournalPopup = () => {
    if (addingJournal) {
      return "reappear";
    } else {
      return "disappear";
    }
  };

  const viewingMenu = () => {
    if (showMenu) {
      return "menu-show";
    } else {
      return "menu-hide";
    }
  };

  const viewingMenuButton = () => {
    if (showMenu) {
      return "menu-exit-show";
    } else {
      return "menu-exit-hide";
    }
  };

  const optionsParams = [
    {
      name: "Option 1",
      func: () => {console.log("Option 1")}
    },
    {
      name: "Option 2",
      func: () => {console.log("Option 2")}
    },
    {
      name: "Option 3",
      func: () => {console.log("Option 3")}
    },
    {
      name: "Option 4",
      func: () => {console.log("Option 4")}
    }
  ]

  const ADD_JOURNAL = gql`
    mutation addJournal($title: String!) {
      addJournal(authorId: "${"7cf107d0-920a-11e9-967a-8f1cec7c02bb"}", title: $title) {
        journalId
        title
      }
    }
  `;

  return (
    <React.Fragment>
      <header className="App-header">
        <div className="header-both-sides header-left">
          <img
            src={menuButton}
            className="Menu-button btn"
            alt="menu"
            onClick={() => viewMenu(!showMenu)}
          />
          <h3>Urstory</h3>
        </div>
        <div className="header-both-sides header-right">
          <img
            src={addJournalButton}
            className="Add-journal-button btn"
            alt="add journal"
            onClick={() => {
              let input = document.getElementById("add-title-text");
              input.focus();
              input.select();
              addJournalTitle(!addingJournal);
            }}
          />
          <img
            src={searchButton}
            className="Add-journal-button btn $"
            alt="search"
            onClick={() => {
              let input = document.getElementById("search-text");
              input.focus();
              input.select();
              showSearch(!searching);
            }}
          />
          <img
            src={optionsButton}
            className="Add-journal-button btn"
            alt="options"
            onClick={() => viewOptions(!optionsShow)}
          />
        </div>
      </header>

      <div className={`menu ${viewingMenu()}`}>
        <div className="menu-head">
          <div className="menu-head-main">
            <div className="menu-head-main-profile">
              <img
                src={faceshot}
                className="faceshot"
                alt="account"
                // onClick={}
              />
            </div>
            <div className="menu-head-main-account">
              <p>Basic</p>
              <img
                src={accountButton}
                className="account-button"
                alt="account type"
                // onClick={}
              />
              <p>Change Account</p>
            </div>
          </div>
          <div className="menu-head-name">
            <p>username</p>
            <p>email@email.com</p>
          </div>
        </div>

        <div className="menu-section">
          <p>Moments</p>
        </div>
        <div className="menu-section">
          <p>Chapters</p>
        </div>
        <div className="menu-section">
          <p>Shared Moments</p>
        </div>
        <div className="menu-section">
          <p>Chats</p>
        </div>
        <div className="menu-section">
          <p>Trash</p>
        </div>
        <div className="menu-section">
          <p>Theme</p>
        </div>
        <div className="menu-section">
          <p>Settings</p>
        </div>
        <div className="menu-section">
          <p>Urstory Tutorial</p>
        </div>

        <div className="menu-last-synced">
          <p>LAST SYNC: JUN 12 1:26 AM</p>
        </div>
      </div>
      <div className={`menu-exit ${viewingMenuButton()}`}>
        <img
          src={exitButton}
          className="menu-exit-button btn"
          alt="exit"
          onClick={() => viewMenu(!showMenu)}
        />
      </div>

      
      <Options showing={optionsShow} viewOptions={viewOptions} params={optionsParams} />


      <div className={`search-bar ${searchUpDown()}`}>
        <input
          type="text"
          id="search-text"
          className="search-bar-field"
          placeholder="Search through every day"
        />
      </div>

      <Mutation mutation={ADD_JOURNAL} refetchQueries={["getUsers"]}>
        {(addJournal, { mutationData }) => (
          <div
            className={`add-journal-popup ${addJournalPopup()}`}
            onClick={() => addJournalTitle(!addingJournal)}
          >
            <div className="add-journal-popup-form">
              <h2>Add a Season</h2>
              <input type="text" placeholder="Title" id="add-title-text" />
              <button
                className="btn"
                onClick={() => {
                  let titleField = document.querySelector("#add-title-text");
                  addJournal({ variables: { title: titleField.value } });
                }}
              >
                Add Title
              </button>
            </div>
          </div>
        )}
      </Mutation>
    </React.Fragment>
  );
};

export default Header;
