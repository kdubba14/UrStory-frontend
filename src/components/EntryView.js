import React, { useState } from "react";
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import backButton from "../static/back.svg";
import shareButton from "../static/share.svg";
import optionsButton from "../static/options.svg";

const EntryView = props => {
  // let [contentValue, changeContent] = useState(null);
  // let [titleValue, changeTitle] = useState(null);

  const GET_ENTRY = gql`
    {
      entry(entryId: "${props.entryId}") {
        entryId
        title
        content
      }
    }
  `;

  const UPDATE_CONTENT = gql`
    mutation updateEntryContent($content: String, $title: String) {
      updateEntryContent(entryId: "${
        props.entryId
      }", content: $content, title: $title){
        title
        content
      }
    }
  `;

  return (
    <div className={`entry-view ${props.showing}`}>
      <div className="entry-view-header">
        <img
          src={backButton}
          className="entry-view-header-button btn"
          alt="back"
          onClick={() => {
            props.exit(false);
          }}
        />
        {/** -- PROGRAM THE BUTTONS -- **/}
        <div className="entry-view-header-menu">
          <img
            src={shareButton}
            className="entry-view-header-button btn"
            alt="share"
          />
          <img
            src={optionsButton}
            className="entry-view-header-button btn"
            alt="options"
          />
        </div>
      </div>

      <div className="entry-view-container">
        <Query query={GET_ENTRY}>
          {({ loading, error, data }) => {
            if (loading) return <h1>Loading...</h1>;
            if (error) {
              return <h1>Error :/</h1>;
            }

            return (
              <Mutation
                mutation={UPDATE_CONTENT}
                refetchQueries={["getJournal"]}
              >
                {(updateEntryContent, { mutationData }) => (
                  <>
                    <div className="entry-view-title">
                      <input
                        type="text"
                        defaultValue={data.entry.title}
                        // value={titleValue || data.entry.title}
                        onChange={e => {
                          // changeTitle(e.target.value);
                          updateEntryContent({
                            variables: { title: e.target.value }
                          });
                        }}
                      />
                    </div>
                    <textarea
                      className="entry-view-content"
                      defaultValue={data.entry.content}
                      // value={contentValue || data.entry.content}
                      onChange={e => {
                        // changeContent(e.target.value);
                        updateEntryContent({
                          variables: { content: e.target.value }
                        });
                      }}
                    />
                  </>
                )}
              </Mutation>
            );
          }}
        </Query>
      </div>
    </div>
  );
};

export default EntryView;
