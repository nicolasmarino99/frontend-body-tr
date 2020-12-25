import React, {useState} from 'react';
import './SubmitForm.scss';

const SubmitForm = ({handleClickSubmitForm, setshowForm, name, object}) => {
    const [element, setElement] = useState(object)

    const handleChange = event => {
      const {name, value} = event.target
      setElement({...element, [name]: value})
    };

    const onEnterPress = e => {
      e.preventDefault();
      handleClickSubmitForm(element)
      setshowForm(false)
    }


    const ChooseForm = name => {
      switch (name) {
        case 'progressItems':
          return (
            <>
              <h4>Routine name</h4>
              <input type="text" id="ProgresssItems-name" name="name" onChange={handleChange}/>
              <h4>Routine description</h4>
              <textarea id="ProgresssItems-description" name="description" onChange={handleChange}>
              </textarea>
              <button type='submit'>submit</button>
            </>
          );
        case 'category':
          return <input type="text" id="ProgresssItems-name" name="name" onChange={handleChange}/>
            
        case 'item':
          return <input type="text" id="ProgresssItems-name" name="name" onChange={handleChange}/>  
        }
    }
    return (
      <div className="Form" >
        <div className="Form-cover" onClick={() => setshowForm(false)}>
        </div>
        <form onSubmit={onEnterPress}>
          <h1>Add another {name}</h1>
            {ChooseForm(name)}
        </form>
    </div>
    )
  };

export default SubmitForm;
