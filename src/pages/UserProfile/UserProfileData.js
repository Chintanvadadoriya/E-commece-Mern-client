import React, { useEffect, useState } from 'react'
import ModelUpdateProfile from '../../components/common/ModelUpdateProfile';
import { useSelector } from 'react-redux';
import { UserData } from '../../redux/authSlice';
import { getUserProfileDataApi } from '../../services/authService';
import { getAuthHeader } from '../../constant';

const userDummy={
  address:"bapasitaram chaowk",
  Joined:"16/12/199",
  Phone:895657415,
  Membership:"yes"

}

function UserProfileData() {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const {token}=useSelector(UserData)
  const{address,Joined,Phone,Membership}=userDummy
  const [user,setUser]=useState()



  async function getUserProfile(){
    try{
      let {data}=await getUserProfileDataApi(getAuthHeader(token))
      setUser(data)

    }catch(err){
      console.error("getuserProfe 1612199",err)
    }
  }


  useEffect(()=>{
   getUserProfile()
  },[])

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
              <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-col md:flex-row items-center md:items-start">
          <img
            className="w-32 h-32 rounded-full border-4 border-blue-600 mb-4 md:mb-0 md:mr-6"
            src={user?.profilePicture}
            alt="User Profile"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">{user?.name}</h2>
            <p className="text-gray-600 mb-4">{user?.email}</p>
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
    <ModelUpdateProfile  isOpen={isModalOpen} close={closeModal} user={user} getUserProfile={getUserProfile}/>
    </>
  );
}

export default UserProfileData