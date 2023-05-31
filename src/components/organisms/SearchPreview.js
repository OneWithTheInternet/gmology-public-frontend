import React, { useEffect } from 'react'
import { useState } from 'react'
import SearchPreviewCard from './SearchPreviewCard'

function SearchPreview(props) {
    const [showUsersResults, setShowUsersResults] = useState(false);

    //Redering results for users or games according to "showUsersResults" state
    const Results = () => {

        const searchPrevewCards = () => {
            return (<SearchPreviewCard 
                data={props.data} 
                setSearchQuery={props.setSearchQuery} 
                showUsersResults={showUsersResults}
            />)
        };
        
        if (props.data.games.length > 0 && !showUsersResults) {
            //Redering game results
            return (searchPrevewCards())
        } else if (props.data.users.length > 0 && showUsersResults) {
            //Redering user results
            return (searchPrevewCards())
        } else {
            //Redering no results
            return (<div className="resourceCard">No results</div>)
        }
    };

  return (
        <div className='searchPreview'>
            <div className='searchPreview__filter' onClick={() => {setShowUsersResults(!showUsersResults)}}>
                {showUsersResults? "Show Games" : "Show Users"}
            </div> 

            <Results />

            {props.data.games.length > 0 && !showUsersResults ?
                <div className='searchPreview__seeAllButton' onClick={() => {window.location.replace(`/search?search=${props.searchQuery}`)}}>See all results</div>
                : null
            }
        </div>
    )
}

export default SearchPreview