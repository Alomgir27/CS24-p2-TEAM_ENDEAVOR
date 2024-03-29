import _, { set } from "lodash";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormInput, FormSelect } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";

//do basic imports
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { IUser } from "../../types";
import { getUsers, deleteUser } from "../../services/userService";
import Notification from "../../base-components/Notification";
import { NotificationElement } from "../../base-components/Notification";
import { useRef } from "react";
import { Dialog } from "../../base-components/Headless";




function Main() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>([]);
  const [userStore, setUserStore] = useState<IUser[]>([]);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const thisUser = useSelector((state: RootState) => state.auth.user);
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState<String | null>(null);
  const [notificationType, setNotificationType] = useState<"success" | "error" | "warning" | "info">("success");
  const notificationRef = useRef<NotificationElement | null>(null);
  const [sortByName, setSortByName] = useState<"asc" | "desc" | null>(null);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

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

  const handleDelete = async () => {
    try {
      await deleteUser(deleteId!);
      const newUsers = userStore.filter((user) => user._id !== deleteId);
      setUserStore(newUsers);
      setUsers(newUsers);
      setNotification("User deleted successfully");
      setNotificationType("success");
      notificationRef.current?.showToast();
      setTimeout(() => {
        setNotification(null);
        setDeleteConfirmationModal(false);
        setDeleteId(null);
        notificationRef.current?.hideToast();
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (sortByName === "asc") {
      const sortedUsers = _.orderBy(users, ["username"], ["asc"]);
      setUsers(sortedUsers);
    } else if (sortByName === "desc") {
      const sortedUsers = _.orderBy(users, ["username"], ["desc"]);
      setUsers(sortedUsers);
    } else {
      setUsers(userStore);
    }
  }, [sortByName, userStore, users]);



  


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
          <div className="flex items-center text-slate-500 ml-4">
              <div className="text-slate-500 mr-2">Sort by name:</div>
              <FormSelect
                className="w-36"
                value={sortByName}
                onChange={(e) => setSortByName(e.target.value as "asc" | "desc" | null)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </FormSelect>
             
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
                  {(user._id === thisUser?._id || thisUser?.role === 'System Admin') && (
                    <Button variant="secondary" className="p-2 shadow-md" onClick={() => navigate(`/users/${user._id}/edit`)}>
                      Edit
                    </Button>
                  )}
                  {thisUser?.role === 'System Admin' && (
                    <Button variant="danger" className="p-2 shadow-md" onClick={() => {
                      setDeleteConfirmationModal(true);
                      setDeleteId(user._id);
                    }
                    }>
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Dialog
          open={deleteConfirmationModal}
          onClose={() => {
            setDeleteConfirmationModal(false);
          }}
          
        >
          <Dialog.Panel>
            <div className='p-5 text-center'>
              <Lucide
                icon='XCircle'
                className='w-16 h-16 mx-auto mt-3 text-danger'
              />
              <div className='mt-5 text-3xl'>Are you sure?</div>
              <div className='mt-2 text-slate-500'>
                Do you really want to delete these records? <br />
                This process cannot be undone.
              </div>
            </div>
            <div className='px-5 pb-8 text-center'>
              <Button
                variant='outline-secondary'
                type='button'
                onClick={() => {
                  setDeleteConfirmationModal(false);
                }}
                className='w-24 mr-1'
              >
                Cancel
              </Button>
              <Button
                variant='danger'
                type='button'
                className='w-24'
              onClick={() => {
                setDeleteConfirmationModal(false);
                handleDelete();
              }}
              >
                Delete
              </Button>
            </div>
          </Dialog.Panel>
      </Dialog>
      <Notification getRef={(r) => (notificationRef.current = r)} type={notificationType}>
        {notification}
      </Notification>
    </>
  );
}

export default Main;
