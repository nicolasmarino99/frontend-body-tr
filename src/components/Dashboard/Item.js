import React, { useContext, useState } from 'react';
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

const Item = () => {
    const [item, setItem] = useContext(ItemContext)
    const [checked, setChecked] = useState(false);

    const toggleChecked = () => {
        setChecked((prev) => !prev);
      };

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
                <div className="description">
                    Learn how to break your opponent defence with your jab.
                </div>
                <div className="warm-up">
                    <div className="title">
                        <h2>Warm up</h2>
                        <p>4 exercises(3 minutes)</p>
                    </div>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch checked={checked} onChange={toggleChecked} />}
                        />
                    </FormGroup>
                </div>
           </div>
            </div>

            {checked ? <Stopwatch /> : ''}
        </div>
    );
}

export default Item;
