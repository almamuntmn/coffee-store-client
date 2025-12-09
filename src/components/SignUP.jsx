import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

const SignUP = () => {

    const { createUser } = use(AuthContext);
    console.log(createUser);

    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        const { email, password, ...restFormData } = Object.fromEntries(formData.entries());

        console.log(email, password, restFormData);

        // create user in firebase
        createUser(email, password)
            .then(result => {
                console.log(result.user);

                const userProfile = {
                    email,
                    ...restFormData,
                    creationTime: result.user?.metadata?.creationTime,
                    lastSignInTime: result.user?.metadata?.lastSignInTime
                }

                // save user to database
                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify( userProfile )
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your work has been saved",
                                showConfirmButton: false,
                                timer: 1000
                            });
                            form.reset();
                        }
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="card bg-base-100 max-w-sm mx-auto shrink-0 shadow-2xl mt-20">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Sign Up Now</h1>
                <form onSubmit={handleSignUp} className="fieldset">
                    <label className="label">Name</label>
                    <input type="text" name="name" className="input" placeholder="Name" />
                    <label className="label">Phone Number</label>
                    <input type="text" name="phone" className="input" placeholder="Phone Number" autoComplete='phone' />
                    <label className="label">Photo</label>
                    <input type="text" name="photo" className="input" placeholder="Photo Url" />
                    <label className="label">Email</label>
                    <input type="email" name="email" className="input" placeholder="Email" autoComplete='email' />
                    <label className="label">Password</label>
                    <input type="password" name="password" className="input" placeholder="Password" autoComplete='current-password' />
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUP;