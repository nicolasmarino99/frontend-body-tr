import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { CategoriesContext } from './ContextProviders/CategoriesProvider';
import { ItemsContext } from './ContextProviders/ItemsProvider';
import AddIcon from '@material-ui/icons/Add';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import './Item.scss';
import ClearIcon from '@material-ui/icons/Clear';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ReactStopwatch from 'react-stopwatch';
import Stopwatch from './Stopwatch';
import { ItemContext } from './ContextProviders/ItemProvide';
import { deleteElement, getElements, updateElement, postElement } from './apiCalls';
import { UserContext } from './ContextProviders/UserProvider';
import { CategoryContext } from './ContextProviders/CategoryProvider';
import { ProgressItemsContext } from './ContextProviders/ProgressItemsProvider';
import { ItemCont } from './StyledComponents/Components';
import SubmitForm from './SubmitForm';

const Item = () => {
    const [item, setItem] = useContext(ItemContext)
    const [user, setUser] = useContext(UserContext);
    const [category, setCategory] = useContext(CategoryContext);
    const [showForm, setshowForm] = useState(false)
    const [progressItem, setProgressItem] = useState({});
   
    const [state, dispatch] = useContext(ProgressItemsContext);
    
    

    const progresssItemsUrl = `http://localhost:3001/api/v1/users/${user.id}/categories/${category.id}/tasks/${item.id}/progress_items/`

    const getProgresssItems = getElements
    const postProgresssItems = postElement
    const deleteProgresssItems = deleteElement
    const updateProgresssItems = updateElement

    useEffect(() => {
      getProgresssItems("SHOW_PROGRESS_ITEMS", progresssItemsUrl, dispatch)
    }, []);

    const handleClickSubmitForm = async info => {
      console.log(info)
      postProgresssItems({name: info.name, description: info.description }, "ADD_PROGRESS_ITEMS", progresssItemsUrl, dispatch)
    }

    const handleClickDeleteButton = item => {
      deleteProgresssItems("DEL_PROGRESS_ITEMS",progresssItemsUrl+progressItem.id, dispatch, progressItem.id)
    }

    const Exercise = ({exercise}) => {
      const [checked, setChecked] = useState(false);
      const toggleChecked = () => {
        setChecked((prev) => !prev);
      };
      return (
        <>
          <div className="warm-up">
            <div className="title">
                <h2>{exercise.name}</h2>
                <p>Destined time {exercise.time}</p>
            </div>
            <FormGroup>
                <FormControlLabel
                    control={<Switch checked={checked} onChange={toggleChecked} />}
                />
            </FormGroup>
            {checked ? <Stopwatch time={exercise.time}/> : ''}
        </div>
        </>
      )
    }

    const Routine = ({item}) => {
        const [showForm, setshowForm] = useState(false)
        const handleClickSubmitExerciseForm = async exercise => {
          
          updateProgresssItems({progress: exercise}, "ADD_EXERCISE_ITEM", progresssItemsUrl+progressItem.id, dispatch, progressItem.id)
        }
        return (
            <div className="warm-up" onClick={() => setProgressItem(item)}>
              <h2>{item.name}</h2>
              <div className="description">
                      {item.description}
              </div>
              {item.progress.map(exercise => <Exercise exercise={exercise}/>)}
                <button className="deleteButton" onClick={() => handleClickDeleteButton(item) }>
                  <ClearIcon />
                </button>
                <button className='add-exercise' onClick={() => setshowForm(true)}>
              <AddIcon />
            </button>
            {showForm ? <SubmitForm setshowForm={setshowForm} handleClickSubmitForm={handleClickSubmitExerciseForm} name="exercise" object={{name: '', time: ''}}/> : ''}
            </div>

            
        )
    }

    return (
        <div className="Item">
          <div className="header">
            <img src={item.img}/>
            <h1>{item.name}</h1>
            <Link to='/'><ClearIcon /></Link>
          </div>
          <div className="details">
                <div className="social">
                <button className="follow">LET'S START</button>
           </div>
            </div>
            {state.progressItems ?
              state.progressItems.map((item, i) =>(
                 <Routine item={item} />))
              : '' }
              <button className='add-category' onClick={ () => setshowForm(true) }><AddIcon /></button>
            {showForm ? <SubmitForm setshowForm={setshowForm} handleClickSubmitForm={handleClickSubmitForm} name="progressItems" object={{name: '', description: ''}}/> : ''}
        </div>
    );
}

export default Item;
