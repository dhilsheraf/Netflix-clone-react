import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'



const TitleCards = ({title,category}) => {

  const [apiData,setApiData]= useState([])

  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NWM1MmY5Y2M1Yzc1ZmU2YzNhODg5Mjc4YTExODk0NCIsIm5iZiI6MTczOTYyMDk1OS40MDEsInN1YiI6IjY3YjA4MjVkNDdkYmZiYTQ2NDZjNTA0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bDWdTvolb2rqbQUGT1hmIMX9-7TIANNNCj_tPhk2vLM'
    }
  };
  
  

const handleWheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft +=event.deltaY;
}

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel',handleWheel)
},[])
  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card:any,index:number)=>{
          return <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={("https://image.tmdb.org/t/p/w500/"+card.backdrop_path)} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
