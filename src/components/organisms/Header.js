import MainLogo from "../atoms/MainLogo";
import UserMenu from "../molecules/UserMenu";
import {Route, Routes} from 'react-router-dom';
import AccountSettings from "../pages/AccountSettings";
import AccountDelete from "../pages/AccountDelete";
import User from "../pages/User";
import Search from "../pages/Search";
import Homepage from "../pages/Homepage";
import EmailValidation from "../pages/EmailValidation";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Feedback from "../pages/Feedback";
import Game from "../pages/Game";
import ButtonLogin from '../atoms/ButtonLogIn'
import CreateAccount from "../pages/CreateAccount";
import Watching from '../pages/Watching';
import Watchers from "../pages/Watchers";
import Giveaway from "../pages/Giveaway";

function Header(props) {
    return (
        <div className="headerContainer">
            <header className="header">

                {/* component will be rendered in all pages */}
                <MainLogo/>
                
                {/* component will be rendered in the specified routed pages */}
                <Routes>
                    <Route element={<UserMenu />} >
                        <Route path='forgot-password' element={<ForgotPassword />} />            
                        <Route path='reset-password/:token' element={<ResetPassword />} />                        
                        <Route path='email-validation/:randomString' element={<EmailValidation />} />            
                        <Route path="" element={<Homepage />} />
                        <Route path='users/:username' element={<User />} />
                        <Route path='account-settings' element={<AccountSettings />} />
                        <Route path='account-delete' element={<AccountDelete />} />
                        <Route path='feedback' element={<Feedback />} />
                        <Route path='search' element={<Search />} />
                        <Route path='games/:id' element={<Game/>} />  
                        <Route path='watching/:username' element={<Watching key={props.pathname} />} />
                        <Route path='watchers/:username' element={<Watchers key={props.pathname} />} />    
                        <Route path='giveaway' element={<Giveaway />} />     
                    </Route>
                </Routes>

                {/* component will be rendered in the specified routed pages */}
                <Routes>
                    <Route element={<ButtonLogin />} >
                        <Route path='signup' element={<CreateAccount />} />                      
                    </Route>
                </Routes>
            </header>

        </div>
    )
}

export default Header