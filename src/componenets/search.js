import React,{useState} from 'react';
import '../button.css';

function Search(props){
    function handleSubmit (event){
        event.preventDefault();
        props.setSearchName(event.target[0].value)
        console.log(event.target[0].value);
       // props.handleClick(event.target[0].value)
    }


return(
    <div>
    <form onSubmit={handleSubmit}>
        <input type="text" value={props.value} style={{width: "200px", height: "25px", borderRadius: '100px'}} ></input>
        <br/><br/>
        <button type="submit" class="button button6">Search</button>
    </form>
    </div>
)
}

export default Search;