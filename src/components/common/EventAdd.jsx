import React, { useState, useEffect, useRef } from 'react';
import { Cancel } from './Button';
import CustomInput from './InputField';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { eventCalenderSchema } from '../../utils/validators';
import { useSelector } from 'react-redux';
import { UserData } from '../../redux/authSlice';
import useToast from '../../hook/useToaster';
import { Loader } from 'rsuite';
import { createEventService } from '../../services/authService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SketchPicker } from 'react-color';
import moment from 'moment/moment';

function EventAdd({ isOpen, close, seectedDate }) {
  const { user } = useSelector(UserData);
  const textTitle= useRef('')
  const showToast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(eventCalenderSchema),
  });

  const [loading, setLoading] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('black');
  const [textColor, setTextColor] = useState('#ffff');

  useEffect(() => {
    if (!isOpen) {
      reset({
        title: '',
        description: '',
      });
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = async (payload) => {
    setLoading(true);
    try {
      let eventData = {
        email: user?.email,
        title: payload?.title,
        userType: user?.userType,
        start: seectedDate,
        end: moment(endDate).format('YYYY-MM-DD'),
        description: payload.description,
        backgroundColor: backgroundColor,
        textColor: textColor,
      };
      console.log('eventData', eventData)
      let { status, msg } = await createEventService(eventData);
      if (status === 201) {
        showToast('success', `${msg}`);
        setBackgroundColor('')
        setTextColor('');
        close()
      }
    } catch (error) {
      console.error('Failed to create event', error);
      showToast('error', `${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
        {' '}
        {/* Increased max width */}
        <h2 className="text-black font-semibold mb-1 text-center">Add Event</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-black space-y-6"
        >
          {/* Title and Description on One Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <CustomInput
                  id="title"
                  name="title"
                  value={field.value}
                  onChange={field.onChange}
                  label="Title"
                  error={errors.title}
                  ref={textTitle}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <CustomInput
                  id="description"
                  name="description"
                  value={field.value}
                  onChange={field.onChange}
                  label="Description"
                  error={errors.description}
                />
              )}
            />
          </div>

          {/* Start Date and End Date on One Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Start Date
              </label>
              <DatePicker
                selected={seectedDate}
                // onChange={(date) => setStartDate(date)}
                className="border border-gray-300 p-2 rounded w-full"
                dateFormat="dd/MM/yyyy"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                End Date
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="border border-gray-300 p-2 rounded w-full"
                dateFormat="dd/MM/yyyy"
                minDate={seectedDate}
              />
            </div>
          </div>

          {/* Background and Text Color Pickers on One Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Background Color
              </label>
              <div className="w-full">
                <SketchPicker
                  color={backgroundColor}
                  onChangeComplete={(color) => setBackgroundColor(color.hex)}
                  width="70%"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Text Color
              </label>
              <div className="w-full">
                <SketchPicker
                  color={textColor}
                  onChangeComplete={(color) => setTextColor(color.hex)}
                  width="70%"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-gray-700 text-lg p-2">
              Event Text Show in calender
            </p>
            <p
              className={`text-lg rounded w-full p-2`}
              style={{
                backgroundColor: backgroundColor,
                color: textColor,
              }}
            >
              Event Show Like This.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="h-11 w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? <Loader content="Creating event..." /> : 'Create Event'}
          </button>
        </form>
        <div className="mt-5 flex justify-end">
          <Cancel close={close} />
        </div>
      </div>
    </div>
  );
}

export default EventAdd;
