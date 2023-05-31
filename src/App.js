import { Routes, Route, useLocation } from "react-router-dom";
import "./styles/app.css";
//Pages
import Login from "./components/pages/Login";
import CreateAccount from "./components/pages/CreateAccount";
import AccountSettings from "./components/pages/AccountSettings";
import AccountDelete from "./components/pages/AccountDelete";
import NotFound from "./components/pages/NotFound";
import Feedback from "./components/pages/Feedback";
import Search from "./components/pages/Search";
import Game from "./components/pages/Game";
import Layout from "./components/pages/Layout";
import User from "./components/pages/User";
import Homepage from "./components/pages/Homepage";
import EmailValidation from "./components/pages/EmailValidation";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword";
import Watching from "./components/pages/Watching";
import Watchers from "./components/pages/Watchers";
import Giveaway from "./components/pages/Giveaway";

function App() {
  if (process.env.NODE_ENV !== "production") {
    console.log(process.env.NODE_ENV);
  }
  let { pathname } = useLocation();

  return (
    <>
      <div className="mainContainer">
        {/* Routes stablish a navigation between pages/elements */}
        <Routes>
          <Route path="/*" element={<Layout />}>
            <Route path="" element={<Homepage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<CreateAccount />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route
              path="email-validation/:randomString"
              element={<EmailValidation />}
            />
            <Route path="users/:username" element={<User key={pathname} />} />
            <Route
              path="watching/:username"
              element={<Watching key={pathname} />}
            />
            <Route
              path="watchers/:username"
              element={<Watchers key={pathname} />}
            />
            <Route path="account-settings" element={<AccountSettings />} />
            <Route path="account-delete" element={<AccountDelete />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="search" element={<Search />} />
            <Route path="games/:id" element={<Game key={pathname} />} />
            <Route path="giveaway" element={<Giveaway />} />
            {/* Component will render where there are no matching routes */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
