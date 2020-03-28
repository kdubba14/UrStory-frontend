import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import optionsButton from "../static/options.svg";

// --------- CHECK IF SCROLLVIEW WORKS ----------

const JournalListItem = props => {
  const { journalId, show } = props;

  const GET_JOURNAL = gql`
    {
      journal(journalId: "${journalId}") {
        title
        entries {
          title
          content
        }
      }
    }
  `;

  return (
    <div className="journal-list-item">
      <Query query={GET_JOURNAL}>
        {({ loading, error, data }) => {
          if (loading)
            return <h3 style={{ color: "rgb(74, 74, 102)" }}>Loading...</h3>;
          if (error) {
            console.log("Error: ", error.message);
            return <h1>Error :(</h1>;
          }

          let { title, entries } = data.journal;
          return (
            <>
              <div
                className="journal-descriptions btn"
                onClick={() => show(journalId)}
              >
                <h4 key={title}>{title}</h4>
                {entries.length !== 1 ? (
                  <p>{entries.length} moments</p>
                ) : (
                  <p>1 moment</p>
                )}
              </div>
              <div className="journal-options btn" onClick={props.optionsClick}>
                <img
                  src={optionsButton}
                  className="Add-journal-button btn"
                  alt="options"
                />
              </div>
            </>
          );
        }}
      </Query>
    </div>
  );
};

export default JournalListItem;
