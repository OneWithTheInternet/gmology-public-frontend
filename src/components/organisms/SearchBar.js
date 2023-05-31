import React from 'react'
import { useState, useEffect } from 'react'
import ErrorMessage from '../atoms/ErrorMessage'
import makeRequest from '../../api' 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons"
import SearchPreview from './SearchPreview'
import Loader from '../atoms/Loader'


function SearchBar(props) {
  //Inbound Data
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  //Outbound data
  const [searchQuery, setSearchQuery] = useState("");
  const SearchParameter = {
    searchQuery: searchQuery
  }
  //Others
  const [searchNow, setSearchNow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Changes state that holds search word
   * @param {*} event 
   */
  function handleType(event) {
    setSearchQuery(event.target.value);
  }

  function handleSubmit(event) {
    //Prevent page from reloading when clicking submit
    event.preventDefault();
    setSearchNow(true);
  }

  function closeSearch() {
    setData(null);
    setSearchQuery("");
  }

  /**
   * Sets data to null if there is nothing in the search field.
   * Prevents search preview from never going aways
   */
  useEffect(() => {
    if(searchQuery === "") {
      setData(null)
    }
  }, [searchQuery])

  /**
   * Triggers search
   */
  useEffect(() => {
    if(searchQuery !== ""){
      searchAll()
    }
    return () => {
      setErrorMessage(null);
      setSearchNow(false);
    }
  }, [searchNow])

  /**
   * Searches for the requested resources in database
   * @returns Array of objects
   */
  async function searchAll() {
    setIsLoading(true);
    try {
      const responseData = await makeRequest.search.searchAll(SearchParameter);
      if(!responseData[0].error) {
        setData(responseData[0]);
        setErrorMessage(null);
        setIsLoading(false);
      } else {
        setData(null);
        setErrorMessage(responseData[0].error);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      return setErrorMessage(error.message);
    }
  }

  return (
    <div className='searchBarContainer'>
      <div className='searchBar'>

        <div className='searchBar__xmark'>
          <div className='icon1' onClick={() => {closeSearch()}}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        
        <div className='searchBar__input'>
          <form onSubmit={(event) => {handleSubmit(event)}}>
            <input 
              type={"text"} 
              placeholder="Search for a game or user"
              value={searchQuery} 
              onChange={(event) => {handleType(event)}}
            />
          </form>
        </div>

        <div className='icon1 searchBar__searchIcon'>
          <div className='icon1' onClick={() => {setSearchNow(true)}}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
        
        {isLoading ? <Loader /> : null}

        {errorMessage ? <ErrorMessage error={errorMessage} /> : null }

        {data ? <SearchPreview data={data} setSearchQuery={setSearchQuery} searchQuery={searchQuery} /> : null}
      </div>

    </div>

  )
}

export default SearchBar