import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import "./index.css";
function RegisterForm(){
    const { register, handleSubmit, reset } = useForm();
    const[users,setUsers]=useState([]);

    const onSubmit=(data)=>{
        fetch('https://reqres.in/api/users',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        .then((res)=>res.json())
        .then((result)=>{
            alert(`Name ${data.name} & email ${data.email} submitted successfully`)
            setUsers((prev)=>[...prev,{name:data.name,email:data.email}]);
            reset();
        })
        .catch((err)=>{
            console.error("API error",err);
            alert("Couldn't fetch api")
        })
    };
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200">
            <div className="bg-white shadow-md p-6 rounded w-full max-w-sm mb-6">
                <h1 className="text-2xl font-semibold mb-4 text-center text-black">Register</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <input type="text" placeholder= "Enter your name"{...register('name')} className="border border-gray-300 p-2 rounded text-black"/>
                    <input type="email" placeholder= "Enter your email"{...register('email')} className="border border-gray-300 p-2 rounded text-black"/>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-black">Register</button>
                </form>
            </div>
            <table className="border border-gray-300 w-full max-w-md text-left">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2 text-black">
                            #
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-black">
                            User Data
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-black">
                            User Email
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((person,index)=>(
                        <tr key={index}>
                            <td className="border border-gray-500 px-4 py-2 text-black">{index+1}</td>
                            <td className="border border-gray-500 px-4 py-2 text-black">{person.name}</td>
                            <td className="border border-gray-500 px-4 py-2 text-black">{person.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );

}
export default RegisterForm;