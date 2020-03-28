import React, { useState } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import EntryView from "./EntryView";
import backButton from "../static/back.svg";
import shareButton from "../static/share.svg";
import searchButton from "../static/search.svg";
import optionsButton from "../static/options.svg";

const JournalView = props => {
  const [showingEntry, showEntry] = useState(false);
  const [entryChoice, chooseEntry] = useState(0);

  const isEntryShowing = () => {
    if (showingEntry) {
      return "entry-view-show";
    } else {
      return "entry-view-hide";
    }
  };

  // const journalPollingController = (start, stop) => {
  //   if (showingEntry) {
  //     start(3000);
  //   } else {
  //     setTimeout(stop, 3000);
  //   }
  // };

  const GET_JOURNAL = gql`
    query getJournal {
      journal(journalId: "${props.journalId}") {
        title
        entries {
          entryId
          title
          content
        }
      }
    }
  `;

  return (
    <div className={`journal-view ${props.showing}`}>
      <div className="journal-view-header">
        <img
          src={backButton}
          className="journal-view-header-button btn"
          alt="back"
          onClick={() => props.hide()}
        />
        {/** -- PROGRAM THE BUTTONS -- **/}
        <div className="journal-view-header-menu">
          <img
            src={shareButton}
            className="journal-view-header-button btn"
            alt="share"
          />
          <img
            src={searchButton}
            className="journal-view-header-button btn"
            alt="search"
          />
          <img
            src={optionsButton}
            className="journal-view-header-button btn"
            alt="options"
          />
        </div>
      </div>

      <div className="journal-view-container">
        <Query query={GET_JOURNAL} /*pollInterval={5000}*/>
          {({ loading, error, data, startPolling, stopPolling }) => {
            // journalPollingController(startPolling, stopPolling);

            if (loading) return <h1>Loading...</h1>;
            if (error) {
              return <h1>Error :/</h1>;
            }

            return (
              <>
                <div className="journal-view-title">
                  <h3>{data.journal.title}</h3>
                </div>
                <p style={{ margin: "1% 0%", fontSize: ".7em" }}>
                  offline capabilities later
                </p>
                {data.journal.entries ? (
                  data.journal.entries.map(entry => (
                    <div
                      className="entry-list-item btn"
                      onClick={() => {
                        chooseEntry(entry.entryId);
                        showEntry(true);
                        // startPolling(5000);
                      }}
                      key={entry.entryId}
                    >
                      <h4>{entry.title}</h4>
                      <p>{entry.content}</p>
                    </div>
                  ))
                ) : (
                  <h2>No Moments</h2>
                )}
              </>
            );
          }}
        </Query>
      </div>

      <EntryView
        showing={isEntryShowing()}
        exit={showEntry}
        entryId={entryChoice}
      />
    </div>
  );
};

export default JournalView;
