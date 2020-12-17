import React, {useState} from 'react';
import './SubmitForm.scss';

const SubmitForm = ({handleClickSubmitForm, setshowForm}) => {
    const [element, setElement] = useState('')

    const handleChange = e => {
      setElement(e.target.value);
    }
    const onEnterPress = e => {
      e.preventDefault();
      handleClickSubmitForm(element)
      setshowForm(false)
    }
    return (
      <div className="Form" >
        <div className="Form-cover" onClick={() => setshowForm(false)}>
        </div>
        <form onSubmit={onEnterPress}>
          <h1>Add another category</h1>
          <input type="text" id="category-name" name="name" onChange={handleChange}/>
        </form>
    </div>
    )
  };

export default SubmitForm;
