import _ from "lodash";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormInput, FormSelect } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Menu } from "../../base-components/Headless";

//do basic imports
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { IUser } from "../../types";
import { getUsers } from "../../services/userService";



function Main() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>([]);
  const [userStore, setUserStore] = useState<IUser[]>([]);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        const { users } = res.data;
        console.log(users);
        setUsers(users);
        setUserStore(users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (search) {
      const filteredUsers = userStore.filter((user) =>
        user.username.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()) || user.role.toLowerCase().includes(search.toLowerCase())
      );
      setUsers(filteredUsers);
    } else {
      setUsers(userStore);
    }
  }, [search, userStore]);


  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Users</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <Button variant="primary" className="mr-2 shadow-md" onClick={() => navigate("/users/add")}>
            Add New User
          </Button>
          <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
            <div className="relative w-56 text-slate-500">
              <FormInput
                type="text"
                className="w-56 pr-10 !box"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Lucide
                icon="Search"
                className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
              />
            </div>
          </div>
        </div>
      
        {users.map((user, userKey) => (
          <div
            key={userKey}
            className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
          >
            <div className="intro-y box">
              <div className="p-5">
                <div className="flex items-center cursor-pointer" onClick={() => navigate(`/profile/${user._id}`)}>
                  <div className="w-10 h-10 image-fit">
                    <Lucide icon="User" className="w-10 h-10" />
                  </div>
                  <div className="ml-4 truncate">
                    <div className="font-medium text-lg">{user.username}</div>
                    <div className="text-slate-500">{user.email}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-5">
                  <Button variant="secondary" className="p-2 shadow-md">
                    Edit
                  </Button>
                  <Button variant="danger" className="p-2 shadow-md">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Main;
