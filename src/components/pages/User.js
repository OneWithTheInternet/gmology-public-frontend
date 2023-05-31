import { useState } from 'react'
import UserMainInfo from '../organisms/UserMainInfo'
import UserTopGames from '../organisms/UserTopGames'
import UserPlayedGames from '../organisms/UserPlayedGames';
import UserPlayedGamesLIkes from '../organisms/UserPlayedGamesLIkes';
import UserNoGamesLayout from '../organisms/UserNoGamesLayout';

function User() {
  const [userData, setUserData] = useState(null);
  const [playedGamesData, setPlayedGamesData] = useState(null); 
  const [emptyLayout, setEmptyLayout] = useState(true);

  return (
    <div className='user'>
      <section className='notice'>
        <div className='notice__text'><p>Send feedback to OneWithTheInternet@gmail.com</p></div>
      </section>
      <UserMainInfo setUserData={setUserData}/>
      {userData && emptyLayout ? <UserNoGamesLayout userData={userData}/> : null}
      {userData && playedGamesData ? <UserTopGames userData={userData} playedGamesData={playedGamesData}/> : null}
      {userData ? <UserPlayedGames userData={userData} setPlayedGamesData={setPlayedGamesData} setEmptyLayout={setEmptyLayout} /> : null}
      {userData && playedGamesData ? <UserPlayedGamesLIkes userData={userData}/> : null}
    </div>
  )
}

export default User