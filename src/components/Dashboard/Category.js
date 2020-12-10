import React, { useContext, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { CategoriesContext } from './Store/CategoriesStore';
import { ItemsContext } from './Store/ItemsStore';
import AddIcon from '@material-ui/icons/Add';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PopForm.scss';
import { Paragraph } from './StyledComponents/Components';


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
    margin: 7px 0;
    color: white;
    display: flex;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    height: ${props => props.num % 3 === 0 ? 8 : 12}em;
    width: 8em;
    background-color: #59c584;
    border-radius: 10px;
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
        <div>
            <h1>{category.name}</h1>
            <img src={category.img}/>
            <div className="items">
            {items.map((item, i) =>(
                <Link to={`/category/${category.name}/${item.name}`}>
                    <ItemCont img={item.img} num={i}>
                        
                        <Paragraph>{item.name}</Paragraph>
                    </ItemCont>
                </Link>
                ))}
            </div>
            <button className='add-category' onClick={handleClick}><AddIcon /></button>
            {showForm ? <PopForm /> : ''}
        </div>
    );
}

export default Category;
