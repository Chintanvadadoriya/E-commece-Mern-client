import React, {useState } from 'react'
import ModelUpdateProfile from '../../components/common/ModelUpdateProfile';
import { useDispatch, useSelector } from 'react-redux';
import { UserData } from '../../redux/authSlice';
import { getAuthHeader } from '../../constant';
import { fetchUserProfile, selectUserProfile } from '../../redux/userProfileSlice';

const userDummy={
  address:"bapasitaram chaowk",
  Joined:"16/12/199",
  Phone:895657415,
  Membership:"yes"

}

function UserProfileData() {
  const profile = useSelector(selectUserProfile);

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const {token}=useSelector(UserData)
  const{address,Joined,Phone,Membership}=userDummy
  const dispatch = useDispatch();



  async function getUserProfile(){
    try{
     dispatch(fetchUserProfile(getAuthHeader(token)));

    }catch(err){
      console.error("getuserProfe 1612199",err)
    }
  }

  return (
    <>
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-400 p-4">
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">User Profile</h1>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{profile?.name}</h1>
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-col md:flex-row items-center md:items-start">
          <img
            className="w-32 h-32 rounded-full border-4 border-blue-600 mb-4 md:mb-0 md:mr-6"
            src={profile?.profilePicture}
            alt="User Profile"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">{profile?.name}</h2>
            <p className="text-gray-600 mb-4">{profile?.email}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-gray-800 font-semibold">Address</h3>
                <p className="text-gray-600">{address}</p>
              </div>
              <div>
                <h3 className="text-gray-800 font-semibold">Phone</h3>
                <p className="text-gray-600">{Phone}</p>
              </div>
              <div>
                <h3 className="text-gray-800 font-semibold">Joined Date</h3>
                <p className="text-gray-600">{Joined}</p>
              </div>
              <div>
                <h3 className="text-gray-800 font-semibold">Membership</h3>
                <p className="text-gray-600">{Membership}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={openModal}>Edit Profile</button>
        </div>
      </div>
    </div>
    <ModelUpdateProfile  isOpen={isModalOpen} close={closeModal} user={profile} getUserProfile={getUserProfile}/>
    </>
  );
}

export default UserProfileData