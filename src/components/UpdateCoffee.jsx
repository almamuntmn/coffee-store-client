import React from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const UpdateCoffee = () => {
    const coffee = useLoaderData();
    const { _id, name,  category, price, supplier, taste, chef,  photo } = coffee;
    const handleUpdateCoffee = event => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const updatedCoffeeData = Object.fromEntries(formData);
        console.log(updatedCoffeeData);

        // send updated coffee to db
        fetch(`https://coffee-store-server-eight-mu.vercel.app/coffees/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedCoffeeData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        title: "Coffee Updated Successfully",
                        icon: "success",
                        draggable: true
                    });
                    form.reset();
                }
            })
    }
    return (
        <div className='p-24'>
            <div className='p-12 text-center space-y-2'>
                <h1 className='text-5xl'>Add Coffee</h1>
                <p>It is a long established fact that a reader will be distraceted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.</p>
            </div>
            <form onSubmit={handleUpdateCoffee}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Name</label>
                        <input type="text" name='name' defaultValue={name} className="input w-full" placeholder="Coffee name" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Chef</label>
                        <input type="text" name='chef' defaultValue={chef} className="input w-full" placeholder="Chef name" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Supplier</label>
                        <input type="text" name='supplier' defaultValue={supplier} className="input w-full" placeholder="supplier name" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Taste</label>
                        <input type="text" name='taste' defaultValue={taste} className="input w-full" placeholder="Taste name" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Category</label>
                        <input type="text" name='category' defaultValue={category} className="input w-full" placeholder="Category name" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Price</label>
                        <input type="text" name='price' defaultValue={price} className="input w-full" placeholder="Price" />
                    </fieldset>
                </div>
                <div>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 my-6">
                        <label className="label">Photo</label>
                        <input type="text" name='photo' defaultValue={photo} className="input w-full" placeholder="Photo URL" />
                    </fieldset>
                </div>
                <div className='text-center'>
                    <button className="btn btn-secondary w-full">Update Coffee</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateCoffee;