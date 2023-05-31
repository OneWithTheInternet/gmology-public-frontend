import React from 'react'
import { Link } from 'react-router-dom'
import ImageNotAvailable from '../atoms/ImageNotAvailable'

function SearchResultCard(props) {
  return (
    <Link to={props.redirectPath}>
        <article className="searchResultCard" key={ props.game.id }>
            <div className='searchResultCard__imageContainer'>
                {props.game.cover ? <img src={props.url} alt="Game cover art"/>: <ImageNotAvailable /> }
            </div>

            <div className='searchResultCard__infoContainer'>
                <div className='searchResultCard__titleContainer'>
                    <p>{props.game.name}</p>
                </div>

                <div className='searchResultCard__yearContainer'>
                    <p>{props.year}</p>
                </div>
            </div>
        </article>
    </Link>
  )
}

export default SearchResultCard