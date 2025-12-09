import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext';

const SIgnIn = () => {

    const {signinUser} = use(AuthContext);

    const handleSignIn = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signinUser(email, password)
            .then(result => {
                console.log(result.user);
                form.reset();

                const singInInfo = {
                    email,
                    lastSignInTime: result.user?.metadata?.lastSignInTime
                }
                // update last sign in time
                fetch('https://coffee-store-server-eight-mu.vercel.app/users', {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(singInInfo)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    })
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    return (
        <div className="card bg-base-100 max-w-sm mx-auto shrink-0 shadow-2xl mt-20">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Sign In Now</h1>
                <form onSubmit={handleSignIn} className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" name="email" className="input" placeholder="Email" autoComplete='email' />
                    <label className="label">Password</label>
                    <input type="password" name="password" className="input" placeholder="Password" autoComplete='current-password' />
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default SIgnIn;