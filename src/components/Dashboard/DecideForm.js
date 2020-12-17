import React from 'react';

const DecideForm = ({handleClickDecideForm, setShowDecideForm}) => {

    const onNoPress = () => {
      setShowDecideForm(false)
    }
    const onYesPress = () => {
      handleClickDecideForm()
      setShowDecideForm(false)
    }
    return (
      <div className="Form" >
        <h1>Are you sure to delete this?</h1>
        <div>
            <button onClick={() => onYesPress}>Yes</button>
            <button onClick={() => onNoPress}>No</button>
        </div>
    </div>
    )
  };

export default DecideForm;