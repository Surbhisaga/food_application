import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './styles.scss';
import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput'
import Button from './../forms/Button';
import { useHistory } from 'react-router-dom';
import { resetPasswordStart, resetUserState } from './../../redux/User/user.actions';

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr
})


const EmailPassword = props => {

    const dispatch = useDispatch();
    const history =useHistory();
    const { resetPasswordSuccess, userErr } = useSelector(mapState);
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState('');

    useEffect(() => {
        if (resetPasswordSuccess) {
            dispatch(resetUserState());
            history.push('/login');
        }
    });

    useEffect(() => {
        if (Array.isArray(userErr) && userErr.length > 0) {
            setErrors(userErr)
        }
    }, [userErr]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(resetPasswordStart({ email }));
    }
    const configAuthWrapper = {
        hendline: "Email PAssword"
    }
    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formwrap">

                {errors.length > 0 && (
                    <ul>
                        {errors.map((e, index) => {
                            return (
                                <li key={index}>
                                    {e}
                                </li>
                            )
                        })}
                    </ul>
                )}

                <form onSubmit={handleSubmit}>

                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter Email"
                        handleChange={e => setEmail(e.target.value)}
                    />

                    <Button type="submit">
                        Email Send
                    </Button>
                </form>

            </div>
        </AuthWrapper>
    )
}

export default EmailPassword;