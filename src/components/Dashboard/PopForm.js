import React, {useState} from 'react';

const PopForm = ({handleClickSubmitForm, setshowForm}) => {
    const [category, setCategory] = useState('')

    const handleChange = e => {
      setCategory(e.target.value);
    }
    const onEnterPress = e => {
      e.preventDefault();
      handleClickSubmitForm(category)
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

export default PopForm;
