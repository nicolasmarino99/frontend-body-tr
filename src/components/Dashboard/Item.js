/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import './Item.scss';
import ClearIcon from '@material-ui/icons/Clear';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Stopwatch from './Stopwatch';
import { ItemContext } from './ContextProviders/ItemProvide';
import {
  deleteElement, getElements, updateElement, postElement,
} from './apiCalls';
import { UserContext } from './ContextProviders/UserProvider';
import { CategoryContext } from './ContextProviders/CategoryProvider';
import { ProgressItemsContext } from './ContextProviders/ProgressItemsProvider';
import SubmitForm from './SubmitForm';

const Item = () => {
  const [item, setItem] = useContext(ItemContext);
  const [user, setUser] = useContext(UserContext);
  const [category, setCategory] = useContext(CategoryContext);
  const [showForm, setshowForm] = useState(false);
  const [progressItem, setProgressItem] = useState({});
  const [state, dispatch] = useContext(ProgressItemsContext);

  const progresssItemsUrl = `https://backend-body-tr.herokuapp.com/api/v1/users/${user.user.id}/categories/${category.id}/tasks/${item.id}/progress_items/`;

  const getProgresssItems = getElements;
  const postProgresssItems = postElement;
  const deleteProgresssItems = deleteElement;
  const updateProgresssItems = updateElement;

  useEffect(() => {
    getProgresssItems('SHOW_PROGRESS_ITEMS', progresssItemsUrl, dispatch);
  }, []);

  const handleClickSubmitForm = async (info) => {
    postProgresssItems({ name: info.name, description: info.description }, 'ADD_PROGRESS_ITEMS', progresssItemsUrl, dispatch);
  };

  const handleClickDeleteButton = () => {
    deleteProgresssItems('DEL_PROGRESS_ITEMS', progresssItemsUrl + progressItem.id, dispatch, progressItem.id);
  };

  const Exercise = ({ exercise }) => {
    const [checked, setChecked] = useState(false);
    const toggleChecked = () => {
      setChecked((prev) => !prev);
    };
    return (
      <>
        <div className="Exercise">
          <div className="title">
            <h2>{exercise.name}</h2>
            <p>
              Destined time
              {exercise.time}
            </p>
          </div>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={checked} onChange={toggleChecked} />}
            />
          </FormGroup>
          {checked ? <Stopwatch time={exercise.time} /> : ''}
        </div>
      </>
    );
  };

  const Routine = ({ item }) => {
    const [showForm, setshowForm] = useState(false);
    const handleClickSubmitExerciseForm = async (exercise) => {
      updateProgresssItems({ progress: exercise }, 'ADD_EXERCISE_ITEM', progresssItemsUrl + progressItem.id, dispatch, progressItem.id);
      getProgresssItems('SHOW_PROGRESS_ITEMS', progresssItemsUrl, dispatch);
    };
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div className="warm-up" onClick={() => setProgressItem(item)}>
        <h2>{item.name}</h2>
        <div className="description">
          {item.description}
        </div>
        {item.progress.map((exercise) => <Exercise exercise={exercise} />)}
        <button className="deleteButton" onClick={() => handleClickDeleteButton(item)}>
          <ClearIcon />
        </button>
        <button className="add-exercise" onClick={() => setshowForm(true)}>
          <AddIcon />
        </button>
        {showForm ? <SubmitForm setshowForm={setshowForm} handleClickSubmitForm={handleClickSubmitExerciseForm} name="exercise" object={{ name: '', time: '' }} /> : ''}
      </div>
    );
  };

  return (
    <div className="Item">
      <div className="header">
        <img src={item.img} alt="img" />
        <h1>{item.name}</h1>
        <Link to="/"><ClearIcon /></Link>
      </div>
      <div className="details">
        <div className="social">
          <button className="follow">LET'S START</button>
        </div>
      </div>
      {state.progressItems
        ? state.progressItems.map((item) => (
          <Routine item={item} />))
        : '' }
      <button className="add-category" onClick={() => setshowForm(true)}><AddIcon /></button>
      {showForm ? <SubmitForm setshowForm={setshowForm} handleClickSubmitForm={handleClickSubmitForm} name="progressItems" object={{ name: '', description: '' }} /> : ''}
    </div>
  );
};

export default Item;
