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
import { createEventService, UpdateEventDataService } from '../../services/authService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SketchPicker } from 'react-color';
import moment from 'moment/moment';

function EventAdd({
  isOpen,
  close,
  seectedDate,
  isUpdate = false,
  eventData,
  resetEventListData,
}) {
  const { user } = useSelector(UserData);
  const textTitle = useRef('');
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
  const [startDate, setStart] = useState(null);

  const [backgroundColor, setBackgroundColor] = useState('black');
  const [textColor, setTextColor] = useState('#ffff');

  // Pre-fill the form when updating an event
  useEffect(() => {
    if (isUpdate && eventData) {
      // Reset the form with the event data values when updating
      reset({
        title: eventData.title,
        description: eventData.description,
      });
      setEndDate(new Date(eventData.end));
      setStart(new Date(eventData.start));
      setBackgroundColor(eventData.backgroundColor);
      setTextColor(eventData.textColor);
    } else {
      // Clear form when not updating
      reset({
        title: '',
        description: '',
      });
      setEndDate(null);
      setBackgroundColor('black');
      setTextColor('#ffff');
    }
  }, [isUpdate, eventData, reset]);

  if (!isOpen) return null;

  const onSubmit = async (payload) => {
    setLoading(true);
    try {
      let eventPayload = {
        email: user?.email,
        title: payload?.title,
        userType: user?.userType,
        start: seectedDate,
        end: moment(endDate).format('YYYY-MM-DD'),
        description: payload.description,
        backgroundColor: backgroundColor,
        textColor: textColor,
      };

      // If updating, include the event ID in the payload
      let { status, msg } = !isUpdate
        ? await createEventService(eventPayload) // Create new event
        : await UpdateEventDataService({
            ...eventPayload,
            eventId: eventData._id,
          }); // Update existing event

      if (status === 201 || status === 200) {
        showToast('success', `${msg}`);
        setBackgroundColor('black');
        setTextColor('#ffff');
        if(isUpdate) {
           resetEventListData();
        }
        close();
      }
    } catch (error) {
      console.error('Failed to create/update event', error);
      showToast('error', `${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-black font-semibold mb-1 text-center">
          {isUpdate ? 'Update Event' : 'Add Event'}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-black space-y-6"
        >
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Start Date
              </label>
              <DatePicker
                selected={startDate || seectedDate}
                className="border border-gray-300 p-2 rounded w-full"
                dateFormat="dd/MM/yyyy"
                disabled={isUpdate} // Disable start date editing when updating
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Background Color
              </label>
              <SketchPicker
                color={backgroundColor}
                onChangeComplete={(color) => setBackgroundColor(color.hex)}
                width="70%"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Text Color
              </label>
              <SketchPicker
                color={textColor}
                onChangeComplete={(color) => setTextColor(color.hex)}
                width="70%"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-gray-700 text-lg p-2">
              Event Text Show in calendar
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

          <button
            type="submit"
            className="h-11 w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? (
              <Loader content="Processing event..." />
            ) : isUpdate ? (
              'Update Event'
            ) : (
              'Create Event'
            )}
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

