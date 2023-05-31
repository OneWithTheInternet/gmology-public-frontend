import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import UserAvatar from "../atoms/UserAvatar";
import makeRequest from '../../api';
import ErrorMessage from '../atoms/ErrorMessage';
import SignupButton from "../atoms/SingupButton";
import DropdownMenu from './DropdownMenu';

function UserMenu(props) {
    //request states
    const [isRequestBad, setIsRequestBad] = useState(false);
    //inbound data
    const [errorMessage, setErrorMessage] = useState("");
    const [isRequestDone, setIsRequestDone] = useState(false);
    const [data, setData] = useState([]);
    //Others
    const [displayUserMenu, setDisplayUserMenu] = useState(false);
    
    /**
     * Triggers data fetching after page has loaded
     */
    useEffect(() => {
        getCurrentUserName();
        return () => {
        setData([]);
        setErrorMessage('');
        setIsRequestDone(false);
        setIsRequestBad(false)
        }
    }, []);

    /**
     * fetches the current users's name and stores it in the data state variable
     */
    async function getCurrentUserName() {
        try {
            const responseData = await makeRequest.auth.displayMyUserInfo(localStorage.userid);
            if (!responseData[0].error) {
                setData(responseData[0]);
                setIsRequestDone(true);
                setIsRequestBad(false)
            } else {
                setErrorMessage(responseData[0].error);
                setIsRequestDone(false);
                setIsRequestBad(true);
            }
        } catch (error) {
            return setErrorMessage(error);
        }
    }

    let MenuComponent = () => {
        if (isRequestBad) {
            return <SignupButton />
        } else {    
            return <div className='userMenu'>
                {isRequestDone ? <UserAvatar avatarUrl={data.avatarUrl} /> : null}
                
                <div className='dropdown'>
        
                    <div className='dropdown__menuIconContainer' onClick={() => {setDisplayUserMenu(!displayUserMenu)}}>
                        <FontAwesomeIcon className="icon1" icon={faBars} />
                    </div>

                    {displayUserMenu ? <FontAwesomeIcon className="icon1 dropdown__closeIcon" icon={faXmark} onClick={() => {setDisplayUserMenu(!displayUserMenu)}}/> : null}

                    {displayUserMenu ? <DropdownMenu userName={data.userName} setDisplayUserMenu={setDisplayUserMenu}/> : null}
        
                </div>
        
                {isRequestBad ? <ErrorMessage error={errorMessage} /> : null }
            </div>
        }
    };

    return MenuComponent()
}

export default UserMenu