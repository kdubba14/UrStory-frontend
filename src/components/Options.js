import React from "react";

const Options = (props) => {

  const viewingOptions = () => {
    if (props.showing) {
      return "options-show";
    } else {
      return "options-hide";
    }
  };

  const notOptions = () => {
    if (props.showing) {
      return "not-options-show"
    } else {
      return "not-options-hide"
    }
  }

  return (
    <div className={notOptions()} onClick={() => props.viewOptions(!props.showing)}>
      <div className={`options btn ${viewingOptions()}`}>
      
        {
          props.params.map((param) => (
            <div key={param.name} onClick={() => param.func(props.journalId)}>
              <h5>{param.name}</h5>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default Options;