import React, { useContext, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { CategoriesContext } from './Store/CategoriesStore';
import { ItemsContext } from './Store/ItemsStore';
import AddIcon from '@material-ui/icons/Add';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PopForm.scss';
import './Category.scss';
import { Paragraph } from './StyledComponents/Components';
import ClearIcon from '@material-ui/icons/Clear';


const Category = () => {
    const [categories, setCategories] = useContext(CategoriesContext)
    const [items, setItems] = useContext(ItemsContext)
    const [showForm, setshowForm] = useState(false)
    let category
    const {url} = useRouteMatch()
    const cleanUrl = url.replace(/category/g, "").replace(/\//g, "");
    category = categories.filter(x => x.name === cleanUrl)[0]
    console.log(cleanUrl,'url')
    console.log(category)


    const ItemCont = styled.div`
    background: url(${props => props.img});
    font-family: 'Oswald', sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    background-size: cover;
    margin: 1em ;
    color: white;
    display: flex;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    height: 9em;
    width: 80%;
    background-color: #59c584;
    border-radius: 10px;
    margin: 1em auto;
`;


const handleClick = () => {
    setshowForm(true)
  }
const handleClickForm = async name =>{
    const clientIDKey = '5phIk2Z31V96pArCaFDbgnDH0rG6gJZ7NMaCr4R3CEg';
    const ulr2 = `https://api.unsplash.com/search/photos/?client_id=${clientIDKey}&query=${name}`;
    const img = (await axios.get(ulr2)).data.results[0].urls.thumb;
    setItems([...items,{name, img}])
    }
    
    const PopForm = () => {
        const [category, setCategory] = useState('')
       
       const handleChange = e => {
         console.log(e, 'target', category)
         setCategory(e.target.value);
       }
       const onEnterPress = e => {
         e.preventDefault();
         handleClickForm(category)
         setshowForm(false)
       }
       
       return (
       <div className="Form" >
       <div className="Form-cover" style={{width: "100%"}} onClick={() => setshowForm(false)}>
         
       </div>
       <form onSubmit={onEnterPress}>
         <h1>Add another category</h1>
         <input type="text" id="category-name" name="name" onChange={handleChange}/>
       </form>
     </div>
     )};


    return (
        <div className="Category">
          <div className="header">
            <img src={category.img}/>
            <h1>{category.name}</h1>
            <Link to='/'><ClearIcon /></Link>
          </div>
          <div className="details">
            <div className="social">
              <button className="follow">Follow <AddIcon /></button>
              <div className="tags">
                <p>Fitness</p>
                <p>Cardio</p>
              </div>
              
            </div>
            <div className="members">
                <button></button>
                <button></button>
                <button></button>
                <button></button>
                <p>1320 members</p>
              </div>
            <div className="options">
                <button>Workouts</button>
                <button>Live Class</button>
                <button>Leaderboard</button>
            </div>
              <div className="items">
              {items.map((item, i) =>(
                  <Link to={`/category/${category.name}/${item.name}`}>
                    
                    
                      <ItemCont img={item.img} num={i}>
                          
                          <Paragraph>
                          <p className="time">8 minutes</p>
                            {item.name}
                            
                            <p className="difficulty-tag">easy</p>
                          </Paragraph>
                          
                      </ItemCont>
                  </Link>
                  ))}
              </div>
            </div>
            <button className='add-category' onClick={handleClick}><AddIcon /></button>
            {showForm ? <PopForm /> : ''}
        </div>
    );
}

export default Category;
