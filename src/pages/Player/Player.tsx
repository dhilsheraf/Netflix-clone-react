import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

    const {id} = useParams();
    const navigate = useNavigate()

    const [apiData,setApiData] = useState({
        name:"",
        key:"",
        published_at:"",
        type:"",
    })

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NWM1MmY5Y2M1Yzc1ZmU2YzNhODg5Mjc4YTExODk0NCIsIm5iZiI6MTczOTYyMDk1OS40MDEsInN1YiI6IjY3YjA4MjVkNDdkYmZiYTQ2NDZjNTA0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bDWdTvolb2rqbQUGT1hmIMX9-7TIANNNCj_tPhk2vLM'
        }
      };
      
      useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results[0]))
        .catch(err => console.error(err));
      },[])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{
        navigate(-1)
      }}/>
      <iframe src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' width='90%' height='90%' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>

      </div>
    </div>
  )
}

export default Player
