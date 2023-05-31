import logo from "../../assets/logo_short.webp";
import { Link } from 'react-router-dom';

function MainLogo() {

    return <div className="logoContainer" >
        <Link to=""> 
            <img 
                className="logoContainer__logo" 
                alt="gmology logo"
                src={logo}
            />
        </Link>

    </div>
}

export default MainLogo