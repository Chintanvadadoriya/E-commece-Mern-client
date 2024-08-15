import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Cancel, Update } from './Button';
import CustomInput from './InputField';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { UserData } from '../../redux/authSlice';
import { getAuthHeader } from '../../constant';
import { passwordChangeUserApi } from '../../services/authService';
import useToast from '../../hook/useToaster';
import { Loader } from 'rsuite';
import * as yup from 'yup';

const createGroupSchema = yup.object().shape({
  GroupName: yup.string().required('GroupName is required'),
  addMember: yup.object().nullable(), // Adjust validation as needed
});

const formatAdminData = (adminData) => {
  return adminData.map((admin) => ({
    value: admin.email,
    label: admin.name,
  }));
};

function AddMemberToGroup({ isOpen, close, adminData }) {
  const { token } = useSelector(UserData);
  const showToast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createGroupSchema),
  });

  const [loading, setLoading] = useState(false);

  const members = formatAdminData(adminData);

  useEffect(() => {
    if (!isOpen) {
      reset({
        GroupName: '',
        addMember: '',
      });
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = async (payload) => {
    console.log('payload', payload);
    setLoading(true);
    try {
      //   let { data, msg } = await passwordChangeUserApi(
      //     payload,
      //     getAuthHeader(token)
      //   );
      //   if (data === 200) {
      //     showToast('success', `${msg}`);
      //     close();
      //     setLoading(false);
      //   } else {
      //     showToast('error', `${msg}`);
      //     setLoading(false);
      //   }
    } catch (error) {
      console.error('Failed to change password', error);
      showToast('error', `${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-black font-semibold mb-6 flex justify-center">
         Add Member To Group
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-xl mx-auto mt-6 text-black"
        >
          <Controller
            name="GroupName"
            control={control}
            render={({ field }) => (
              <CustomInput
                id="GroupName"
                name="GroupName"
                value={field.value}
                onChange={field.onChange}
                label="Group Name"
                error={errors.GroupName}
              />
            )}
          />
          <Controller
            name="addMember"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={members}
                isClearable
                isSearchable
                placeholder="Add new Member"
                classNamePrefix="react-select"
                className={errors.addMember ? 'border-red-500' : ''}
              />
            )}
          />
          <button
            type="submit"
            className="mt-5 h-11 w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? <Loader content="adding member..." /> : 'Add Member'}
          </button>
        </form>

        <div className="mt-5 flex justify-end">
          <Cancel close={close} />
        </div>
      </div>
    </div>
  );
}

export default AddMemberToGroup;
