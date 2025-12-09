import React from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const CoffeeCard = ({ coffee, coffees, setCoffees }) => {
    const { _id, name, supplier, taste, category, details, photo, price } = coffee;

    const handleDelete = () => {
        console.log(_id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://coffee-store-server-eight-mu.vercel.app/coffees/${_id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
                Swal.fire({
                    title: "Deleted!",
                    text: "Your coffee has been deleted.",
                    icon: "success"
                });

                // remove the coffee from the state
                const remainingCoffees = coffees.filter(cof => cof._id !== _id);
                setCoffees(remainingCoffees);
            }
        });
    }
    return (
        <div className="card card-side bg-base-100 shadow-sm border-2 rounded-2xl p-4">
            <figure>
                <img
                    src={photo}
                    alt="coffee" />
            </figure>
            <div className="flex mt-10 w-full justify-around items-center">
                <div>
                    <h2 className="card-title">{name}</h2>
                    <p>Supplier: {supplier}</p>
                    <p>Taste: {taste}</p>
                    <p>Category: {category}</p>
                    <p>details: {details}</p>
                    <p>Price: ${price} </p>
                </div>
                <div className="card-actions justify-end">
                    <div className="join join-vertical space-y-4">
                        <Link to={`/coffee/${_id}`} className="btn join-item">Details</Link>
                        <Link to={`/updateCoffee/${_id}`} className="btn join-item">Update</Link>
                        <button onClick={() => handleDelete(_id)} className="btn join-item">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCard;