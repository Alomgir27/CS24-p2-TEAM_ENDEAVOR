import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from '../../stores/store';
import { IUser } from '../../types';
import { useParams } from 'react-router';
import { getUser } from '../../services/userService';
import Button from '../../base-components/Button';
import { Link } from 'react-router-dom';



function Main() {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const thisUser = useSelector((state: RootState) => state.auth.user);
    const [user, setUser] = useState<IUser>({
        _id: "",
        email: "",
        password: "",
        username: "",
        role: "",
        details: {}
    });
    const { id } = useParams();
    
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getUser(id || thisUser._id);
                const { user } = res.data;
                console.log(user);
                setUser(user);
            } catch (error) {
                console.error(error);
                setUser
            }
        };
        fetchUser();
    }, [id]);

  

    return (
        <>
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-semibold text-center text-gray-800">User Details</h1>
                    <div className="flex items-center justify-center mt-4">
                        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                            <img src={`https://ui-avatars.com/api/?name=${user.username}&background=random`} alt="avatar" className="w-20 h-20 rounded-full" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-800">Username: {user.username}</p>
                        <p className="text-gray-800">Email: {user.email}</p>
                        <p className="text-gray-800">Role: {user.role}</p>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <Link to={`/users/${user._id}/edit`}>
                            <Button>Edit</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Main;
