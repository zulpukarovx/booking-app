import { useState } from "react";
import Perks from "../components/Perks"
import { Link } from "react-router-dom";


const AddNewHotels = () => {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [photoLink, setPhotoLink] = useState('');
    const [addeddPhotos, setAddeddPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    const addPhotoByLink = async (e) => {
        e.preventDefault();
        if(!photoLink) {
            return
        }
        try {
            const response = await fetch('http://localhost:4000/upload-by-link', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ link: photoLink })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Uploading photo by link failed: ${errorData.message || response.statusText}`); 
            }

            const data = await response.json();
            setAddeddPhotos(prev => ([...prev, data]));
            setPhotoLink('');
        } catch (error) {
            console.error('Error during uploading:', error);
            throw error; 
        }
    }
    const uploadPhoto = async (e) => {
        const files = e.target.files;
        const formData = new FormData();
        formData.set('photos', files);
        try {
          const response = await fetch('http://localhost:4000/upload', {
              method: "POST",
              headers: { 'Content-Type': 'multipart/form-data' },
              body: JSON.stringify({ formData })
          })
          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(`Failed uploading a photo: ${errorData.message || response.statusText}`); 
          }
          const data = await response.json();
          setAddeddPhotos(prev => ([...prev, data]));
        } catch (error) {
          console.error('Error during uploading:', error);
          throw error; 
        }
    }

  return (
    <section className="pt-10">
        <div className="max-w-xl">
          <Link to='/account/places' className="go-back-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
            </svg>
            Back
          </Link>
          <div className="pt-4">
            <form className="">
              <label htmlFor="title">Title</label>
              <input 
                type="text" name="title" 
                id="title" 
                placeholder="Example: short and catchy"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <label htmlFor="address">Address</label>
              <input 
                type="text" name="address" 
                id="address" 
                placeholder="Address to this place"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
              <label htmlFor="photo">Photo</label>
              <div className="flex gap-2 py-2">
                <input 
                  className="w-full border py-2 px-3 rounded-lg" 
                  type="url" id="photo" name="photo" 
                  placeholder="Add photos using url" 
                  value={photoLink}
                  onChange={e => setPhotoLink(e.target.value)}
                />
                <button onClick={addPhotoByLink} className="text-sm py-2 px-4 bg-gray-200 rounded-lg hover:bg-gray-400 hover:text-white duration-200 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="py-2 grid grid-cols-2 md:grid-cols-3 gap-4">

                {addeddPhotos && addeddPhotos.map(photo => (
                    <div className="transition-all duration-200 h-32 rounded-lg overflow-hidden" key={photo}>
                        <img className="w-full h-full object-cover " src={`http://localhost:4000/uploads/${photo}`} alt={photo}/>
                    </div>
                )) }

                <label className={`${addeddPhotos.length > 0 ? "h-32" : ""} p-4 border text-sm flex gap-2 items-center bg-transparent rounded-lg
                transition-all duration-200 hover:shadow-md`}>
                    <input type="file" className="hidden" onChange={uploadPhoto}/>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                        <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                    </svg>
                    Upload from device
                </label>
              </div>
              <label htmlFor="description">Description</label>
              <textarea 
                name="description" 
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <label htmlFor="perks">Perks</label>
              <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-2">
                <Perks selected={perks} onChange={setPerks} />
              </div>
              <label htmlFor="extrainfo">Extra info</label>
              <textarea 
                name="extrainfo" 
                id="extrainfo"
                value={extraInfo}
                onChange={e => setExtraInfo(e.target.value)}
              />
              <h2 className="font-semibold">Check in & out times</h2>
              <p className="text-gray-500 text-xs">add check in and out times, remember to consider window between the guests</p>
              <div className="grid sm:grid-cols-3 gap-2 py-3">
                <div>
                  <label className="text-gray-500 text-sm" htmlFor="checkin">Check in time</label>
                  <input 
                    type="text" 
                    id="checkin" 
                    placeholder="14:00" 
                    value={checkIn}
                    onChange={e => setCheckIn(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-gray-500 text-sm" htmlFor="checkout">Check out time</label>
                  <input 
                    type="text" 
                    id="checkout" 
                    placeholder="11:00" 
                    value={checkOut}
                    onChange={e => setCheckOut(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-gray-500 text-sm" htmlFor="guestnum">Max guests</label>
                  <input 
                    type="number" 
                    id="guestnum" 
                    placeholder="4" 
                    value={maxGuests}
                    onChange={e => setMaxGuests(e.target.value)}
                  />
                </div>
              </div>
              <button className="bg-primary w-full text-white px-4 py-2 rounded-2xl">Save</button>
            </form>
          </div>
        </div>
    </section>
  )
}

export default AddNewHotels