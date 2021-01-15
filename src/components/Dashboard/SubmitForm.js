/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable default-case */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './SubmitForm.scss';

const SubmitForm = ({
  handleClickSubmitForm, setshowForm, name, object,
}) => {
  const [element, setElement] = useState(object);

  const handleChange = (event) => {
    // eslint-disable-next-line no-shadow
    const { name, value } = event.target;
    setElement({ ...element, [name]: value });
  };

  const onEnterPress = (e) => {
    e.preventDefault();
    handleClickSubmitForm(element);
    setshowForm(false);
  };

  // eslint-disable-next-line consistent-return
  const ChooseForm = (name) => {
    switch (name) {
      case 'progressItems':
        return (
          // eslint-disable-next-line react/jsx-filename-extension
          <>
            <h4>Routine name</h4>
            <input type="text" id="ProgresssItems-name" name="name" onChange={handleChange} />
            <h4>Routine description</h4>
            <textarea id="ProgresssItems-description" name="description" onChange={handleChange} />
            <button type="submit">submit</button>
          </>
        );
      case 'category':
        return <input type="text" id="ProgresssItems-name" name="name" onChange={handleChange} />;
      case 'item':
        return <input type="text" id="ProgresssItems-name" name="name" onChange={handleChange} />;
      case 'exercise':
        return (
          <>
            <h4>Exercise name</h4>
            <input type="text" id="exercise-name" name="name" onChange={handleChange} />
            <h4>destined time</h4>
            <input type="text" placeholder="00:00:00" id="exercise-time" name="time" onChange={handleChange} />
            <button type="submit">submit</button>
          </>
        );
    }
  };
  return (
    <div className="Form">
      <div className="Form-cover" onClick={() => setshowForm(false)} />
      <form onSubmit={onEnterPress}>
        <h1>
          Add another
          {name}
        </h1>
        {ChooseForm(name)}
      </form>
    </div>
  );
};

export default SubmitForm;
