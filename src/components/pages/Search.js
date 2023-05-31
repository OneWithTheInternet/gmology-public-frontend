import React from 'react'
import { useState, useEffect } from 'react'
import ErrorMessage from '../atoms/ErrorMessage'
import makeRequest from '../../api' 
import Loader from '../atoms/Loader'
import { useSearchParams } from 'react-router-dom'
import SearchPageResults from '../organisms/SearchPageResults'
import LoadMoreButton from '../molecules/LoadMoreButton'
import Redirect from '../atoms/Redirect'
import ResultCounter from '../atoms/ResultCounter'

function Search() {
  //Inbound Data
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  //Outbound data
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [pageQuery, setPageQuery] = useState(2);
  const SearchParameter = {
    searchQuery: searchQuery
  }
  //Redirect Aid
  const [redirectPath, setRedirectPath] = useState(null);
  const [redirectNow, setRedirectNow] = useState(false);
  //Others
  const [isLoading, setIsLoading] = useState(false);
  const [searchNow, setSearchNow] = useState(false);

  /**
   * Triggers search function when user clicks on "Load more"
   */
  useEffect(() => {
    searchGames()
    return () => {
      setErrorMessage(null);
      setData(null);
      setSearchNow(false);
    }
  }, [searchNow])

  /**
   * Triggers search function when page loads
   */
  useEffect(() => {
    searchGames()
    return () => {
      setErrorMessage(null);
      setData(null);
    }
  }, [])

  /**
   * Searches for the requested resources in database
   * @returns Array of objects
   */
  async function searchGames() {
    setIsLoading(true);
    try {
      const responseData = await makeRequest.search.searchGames(SearchParameter, pageQuery);
      if(!responseData[0].error) {
        setData(responseData);
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

  /**
   * Triggers new search that loads more items
   */
  function handleSubmit(event) {
    event.preventDefault();
    setPageQuery(pageQuery + 2)
    setSearchNow(!searchNow);
  }

  return (
    <div className='sectionsContainer'>
      <section className='gameResults'>
        {errorMessage ? <ErrorMessage error={errorMessage}/> : null}
        {isLoading ? <Loader/> : null}
        {data ? <ResultCounter data={data} /> : null}
        {data ? <SearchPageResults data={data} setRedirectPath={setRedirectPath} setRedirectNow={setRedirectNow} /> : null}
        {data ? <LoadMoreButton handleSubmit={handleSubmit} /> : null}
        {redirectNow ? <Redirect path={redirectPath} /> : null}  
      </section>
    </div>
  )
}

export default Search