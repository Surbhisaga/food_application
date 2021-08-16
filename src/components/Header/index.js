import React from 'react';
import './styles.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Logo from './../../assets/food_app_logo.png';
import { signOutUserStart } from './../../redux/User/user.actions';
import { selectCartItemsCount } from './../../redux/Cart/cart.selector';

const mapState = (state) => ({
    //this is provide current user
    currentUser: state.user.currentUser,
    totalNumCartItems: selectCartItemsCount(state)
})

const Header = props => {
    const dispatch = useDispatch();
    const { currentUser, totalNumCartItems } = useSelector(mapState);

    const signOut = () => {
        dispatch(signOutUserStart());
    };

    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="food logo" />
                    </Link>
                </div>

                <nav>
                    <ul>
                        <li>
                            <Link to="/search">
                                Dishes
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="callToActions">
                    <ul>
                        {currentUser && [
                            <li>
                                <Link to="/cart">
                                    Cart ({totalNumCartItems})
                                </Link>
                            </li>,
                            <li>
                                <Link to="/admin">
                                    meal
                                </Link>
                            </li>,
                            <li>
                                <Link to="/restaurant">
                                    Restaurant
                                </Link>
                            </li>,
                            <li>
                                <Link to="/dashboard">
                                    Account
                                </Link>
                            </li>,
                            <li>
                                <span onClick={() => signOut()}>
                                    Logout
                                </span>
                            </li>
                        ]}
                        {!currentUser && [
                            <li>
                                <Link to="/registartion">
                                    Register
                                </Link>
                            </li>,
                            <li>
                                <Link to="/login">
                                    Login
                                </Link>
                            </li>
                        ]}
                    </ul>
                </div>
            </div>
        </header>
    );
};

Header.defaultProps = {
    currentUser: null
}

export default Header;
