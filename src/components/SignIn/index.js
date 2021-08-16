import React, { useState, useEffect } from 'react';
import Buttons from './../forms/Button';
import './styles.scss';
import { Link, useHistory } from 'react-router-dom';
import AuthWapper from './../AuthWrapper';
import FormInput from './../forms/FormInput'
import { useDispatch, useSelector } from 'react-redux';
import { emailSignInStart ,googleSignInStart } from './../../redux/User/user.actions';

//create new constabie
const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const SignIn = props => {

    const history = useHistory();
    const { currentUser } = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (currentUser) {
            resetForm();
            history.push('/');
        }
    },[currentUser]);

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(emailSignInStart({ email, password }));
    }

        
    const handleGoogleSignIn =()=>{
        dispatch(googleSignInStart());
    }

    const configAuthWrapper = {
        hendline: 'login'
    }

    return (
        <AuthWapper {...configAuthWrapper}>
            <div className="formwrap">
                <form onSubmit={handleSubmit}>

                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter Email"
                        handleChange={e => setEmail(e.target.value)}
                    />

                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter Password"
                        handleChange={e => setPassword(e.target.value)}
                    />

                    <Buttons type="submit">
                        Login
                    </Buttons>

                    <div className="socialSignin">
                        <div className="row">
                            <Buttons onClick={handleGoogleSignIn}>
                                Sign in with Google
                            </Buttons>
                        </div>
                    </div>

                    <div className="links">
                        <Link to="/recovery">
                            Forgot Password?
                        </Link>
                    </div>
                </form>
            </div>
        </AuthWapper>
    )

}
export default SignIn;