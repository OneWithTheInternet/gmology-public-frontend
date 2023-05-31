import React from 'react'
import SearchResultCard from '../molecules/SearchResultCard'

function SearchPageResults(props) {
  const games = props.data;

  //Handling posible data errors
  if (!games) {
      return <div>No results</div>
  }

  //Creating each element from games data
  let gameCards = games.map((game) => {

    let url;
    if (game.cover){
      url = game.cover.url.split('t_thumb').join('t_cover_small_2x');
    }

    let redirectPath = `/games/${game.id}`;

    const releaseDate = game.first_release_date;
    const date = new Date(releaseDate * 1000);
    const year = date.toLocaleDateString("en-US").toString().split('/')[2];

    return ( 
      <SearchResultCard key={game.id} game={game} url={url} year={year} redirectPath={redirectPath}/>
    )  
  });

  //Returning all cards
  return (
    <>{gameCards}</>
  )
}

export default SearchPageResults