import React, { useState, useEffect } from 'react';
import './styles.scss';
import { useHistory } from 'react-router-dom';
import AuthWrapper from './../AuthWrapper'
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';
import { useDispatch, useSelector } from 'react-redux';
import {  signUpUserStart } from './../../redux/User/user.actions';

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    userErr: user.userErr
})

const SignUp = props => {

    const history = useHistory(); 
    const{currentUser,userErr} =useSelector(mapState);
    const dispatch = useDispatch();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(()=>{
        if(currentUser){
            reset();
            history.push('/');
        }
    },[currentUser]);

    useEffect(() => {
        if(Array.isArray(userErr) && userErr.length > 0){
            setErrors(userErr);
        }
    },[userErr])

    const reset = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        dispatch(signUpUserStart({
            displayName,
            email,
            password,
            confirmPassword
        }));
    }

    const configAuthWrapper = {
        hendline: "Registration"
    }

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formwrap">

                {errors.length > 0 && (
                    <ul>
                        {errors.map((err, index) => {
                            return (
                                <li key={index}>
                                    {err}
                                </li>
                            );
                        })}
                    </ul>
                )}

                <form onSubmit={handleFormSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Enter Name"
                        handleChange={e => setDisplayName(e.target.value)}
                    />

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
                        placeholder="Enter password"
                        handleChange={e => setPassword(e.target.value)}
                    />

                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Enter confirm password"
                        handleChange={e => setConfirmPassword(e.target.value)}
                    />

                    <Button type="submit">
                        Register
                    </Button>
                </form>
            </div>
        </AuthWrapper>
    )
}
export default SignUp;