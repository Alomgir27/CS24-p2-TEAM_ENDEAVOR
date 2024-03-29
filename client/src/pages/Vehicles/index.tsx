import React, { useEffect, useRef, useState } from 'react';

import Button from '../../base-components/Button';
import { FormInput } from '../../base-components/Form';
import Lucide from '../../base-components/Lucide';
import { useNavigate } from 'react-router-dom';
import { Dialog, Menu } from '../../base-components/Headless';

import { useSelector } from 'react-redux';
import { RootState } from '../../stores/store';
import Notification from '../../base-components/Notification';
import { NotificationElement } from '../../base-components/Notification';

import { getVehicles, deleteVehicle } from '../../services/vehicleService';
import { IVehicle } from '../../types';

const index = () => {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const notificationRef = useRef<NotificationElement | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [notificationType, setNotificationType] = useState<
    'success' | 'error' | 'warning' | 'info'
  >('success');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [storeVehicles, setStoreVehicles] = useState<IVehicle[]>([]);

  const onDelete = () => {
    console.log('delete');
    if (!deleteId) return;

    deleteVehicle(deleteId)
      .then(() => {
        setNotification('Vehicle deleted successfully');
        setNotificationType('success');
        notificationRef.current?.showToast();
        setVehicles(vehicles.filter((vehicle) => vehicle._id !== deleteId));
        setStoreVehicles(storeVehicles.filter((vehicle) => vehicle._id !== deleteId));
      })
      .catch((error) => {
        setNotification(error.response.data.message);
        setNotificationType('error');
        notificationRef.current?.showToast();
      });
    setDeleteConfirmationModal(false);
    setDeleteId(null);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await getVehicles();
        const { vehicles } = res.data;
        setStoreVehicles(vehicles);
        setVehicles(vehicles);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVehicles();
  }, []);

  useEffect(() => {
    if (search) {
      const filteredVehicles = storeVehicles.filter((vehicle) =>
        vehicle.vehicleNumber.toLowerCase().includes(search.toLowerCase())
      );
      setVehicles(filteredVehicles);
    } else {
      setVehicles(storeVehicles);
    }
  }, [search, vehicles]);

  return (
    <>
      <h2 className='mt-10 text-lg font-medium intro-y'>Vehicles</h2>
      <div className='grid grid-cols-12 gap-6 mt-5'>
        <div className='flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap'>
          <Button
            variant='primary'
            className='mr-2 shadow-md'
            onClick={() => navigate('/vehicle/add')}
          >
            Add Vehicle
          </Button>
          <div className='w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0'>
            <div className='relative w-56 text-slate-500'>
              <FormInput
                type='text'
                className='w-56 pr-10 !box'
                placeholder='Search...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Lucide
                icon='Search'
                className='absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3'
              />
            </div>
          </div>
        </div>

        {vehicles.map((vehicle, vehicleKey) => (
          <div
            key={vehicleKey}
            className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3'
          >
            <div className='intro-y box'>
              <div className='p-5'>
                <div className='flex items-center'>
                  <div className='ml-4 truncate'>
                    <div className='font-medium text-lg'>
                      {vehicle.vehicleNumber}
                    </div>
                    <div className='text-slate-500 mt-2'>{`Capacity: ${vehicle.capacity}`}</div>
                    <div className='text-slate-500 mt-1'>{`Type: ${vehicle.type}`}</div>
                    <div className='text-slate-500 mt-1'>{`Unloaded costs: ${vehicle.fuelCostUnloaded}`}</div>
                    <div className='text-slate-500 mt-1'>{`Fully loaded cost: ${vehicle.fuelCostLoaded}`}</div>
                  </div>
                </div>

                <div className='flex items-center justify-between mt-5'>
                  <Button
                    variant='secondary'
                    className='p-2 shadow-md'
                    onClick={() => navigate(`/vehicle/${vehicle._id}/edit`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant='danger'
                    className='p-2 shadow-md'
                    onClick={() => {
                      setDeleteConfirmationModal(true);
                      setDeleteId(vehicle._id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Notification
          getRef={(r) => (notificationRef.current = r)}
          type={notificationType}
        >
          {notification}
        </Notification>

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
                onClick={onDelete}
              >
                Delete
              </Button>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
    </>
  );
};

export default index;
