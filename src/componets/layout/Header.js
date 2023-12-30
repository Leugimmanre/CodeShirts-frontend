import logo from '../../logo.svg';
import { CRMContext } from "../../context/CRMContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useContext(CRMContext);
    const LogOut = () => {
        // auth.auth  = false and remove token
        setAuth({
            token: '',
            auth: false
        })
        localStorage.setItem('token', '');
        navigate("/login");
    }
    return (
        <header className="top-bar">
            <div className="container">
                <div className="bar-content  logo">
                    <div className="title-container">
                        <div className="logo-title-container">
                            <img src={logo} alt="logo"/>
                            <h1>CRM CodeShirts</h1>
                        </div>
                        <p className='description'>Customers, Products and Orders Administrator</p>
                    </div>
                    {auth.auth ? (
                        <button
                            type='button'
                            className='btn btn-red'
                            onClick={LogOut}
                        >
                            <i className='fa fa-times-circle'></i>
                            Log out
                        </button>
                    ) : null }
                </div>
            </div>
            <div className='description'>
            </div>
        </header>
    );
};

export default Header;
