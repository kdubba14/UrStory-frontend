import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import emptyJournals from "../static/empty-journals.svg";
import JournalListItem from "./JournalListItem";
import JournalView from "./JournalView";
import Options from "./Options";

class MainDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showJournalView: false,
      showOptions: false,
      journalId: 0
    };
  }

  _showJournal = id => {
    this.setState({
      showJournalView: true,
      journalId: id
    });
  };

  _hideJournal = () => {
    this.setState({ showJournalView: false });
  };

  _viewOptions = (show) => {
    this.setState({
      showOptions: show
    })
  }

  journalShown = () => {
    if (this.state.showJournalView) {
      return "show-journal-view";
    } else {
      return "hide-journal-view";
    }
  };

  optionsParams = [
    {
      name: "Share",
      func: (id) => {console.log(`Share
      Journal ID: ${id}`)}
    },
    {
      name: "Rename",
      func: (id) => {console.log(`Rename
      Journal ID: ${id}`)}
    },
    {
      name: "Add tags",
      func: (id) => {console.log(`Add tags
      Journal ID: ${id}`)}
    },
    {
      name: "Delete",
      func: (id) => {console.log(`Delete
      Journal ID: ${id}`)}
    }
  ]

  GET_JOURNALS = gql`
    query getUsers {
      users {
        name
        journals {
          journalId
        }
      }
    }
  `;

  render() {
    return (
      <div className="main-display">
        <Query query={this.GET_JOURNALS}>
          {({ loading, error, data }) => {
            if (loading) return <h2>Loading...</h2>;
            if (error) {
              console.log("Error: ", error.message);
              return <h2>Error :/</h2>;
            }
            if (data.users.length === 0) {
              return <h2>NO USERS</h2>;
            }

            if (data.users[0].journals.length === 0) {
              return (
                <>
                  <img
                    src={emptyJournals}
                    className="empty-journals-logo"
                    alt="empty journals"
                    style={{ marginTop: "35%" }}
                  />
                  <h4>Create A New Journal</h4>
                </>
              );
            } else {
              // -- VALIDATE DEPENDING ON WHICH USER --
              return data.users[0].journals.map(({ journalId }) => (
                <JournalListItem
                  key={journalId}
                  journalId={journalId}
                  show={this._showJournal} 
                  optionsClick={() => {
                    this._viewOptions(!this.state.showOptions);
                    this.setState({
                      journalId
                    })
                  }}
                />
              ));
            }
          }}
        </Query>
        <Options showing={this.state.showOptions} viewOptions={this._viewOptions} params={this.optionsParams} journalId={this.state.journalId} />
        <JournalView
          showing={this.journalShown()}
          hide={this._hideJournal}
          journalId={this.state.journalId}
        />
      </div>
    );
  }
}

export default MainDisplay;
