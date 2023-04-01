import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";

export default function App() {
   // stores the ipaddress, location, time zone and internet service provider
   const [location, setLocation] = useState({
      ipAddress: "",
      location: "",
      timeZone: "",
      isp: "",
      center: null,
   });

   // a function that gets location  using the ip address provided
   const getLocation = async () => {
      const ipAddress = document.getElementById("ipAddress").value;
      const response = await fetch(
         `https://geo.ipify.org/api/v2/country?apiKey=at_kZqIO4d964UjFQ9Hr5XjIbWDrVvhg&ipAddress=${ipAddress}`
      );

      const data = JSON.parse(await response.text());
      const provider = new OpenStreetMapProvider();
      const results = await provider.search({
         query: `${data.location.country}, ${data.location.region}`,
      });
      setLocation({
         ipAddress: data.ip,
         location: `${data.location.country}, ${data.location.region}`,
         timeZone: data.location.timezone,
         isp: data.isp,
         center: [results[0].y, results[0].x],
      });
   };

   // search the users initial location using the ip address when rendering for first time
   useEffect(() => {
      const fun = async () => {
         const response = await fetch(
            "https://geo.ipify.org/api/v2/country?apiKey=at_kZqIO4d964UjFQ9Hr5XjIbWDrVvhg"
         );
         const data = JSON.parse(await response.text());
         const provider = new OpenStreetMapProvider();
         const results = await provider.search({
            query: `${data.location.country}, ${data.location.region}`,
         });

         setLocation({
            ipAddress: data.ip,
            location: `${data.location.country}, ${data.location.region}`,
            timeZone: data.location.timezone,
            isp: data.isp,
            center: [results[0].y, results[0].x],
         });
      };
      fun();
   }, []);

   return (
      <main className='h-screen w-screen'>
         <div className=' bg-mobile bg-cover bg-no-repeat bg-center h-[35%] w-full flex flex-col justify-center items-center relative'>
            <h1 className='font-robik font-bold text-white md:text-3xl text-xl pb-10'>
               Ip Address Tracker
            </h1>
            <div className='flex'>
               <input
                  id='ipAddress'
                  type='text'
                  placeholder='search for any IP address or domain'
                  className='md:w-[450px] w-[200px] h-14 rounded-l-2xl px-4 outline-none md:placeholder:text-[18px] placeholder:text-[14px] text-veryDarkGray font-robik text-[18px]'
               />
               <div
                  className='flex flex-col justify-center px-6  bg-black hover:bg-darkGray rounded-r-2xl cursor-pointer'
                  onClick={() => getLocation()}
               >
                  <img src='icon-arrow.svg' />
               </div>
            </div>
            <div className='bg-white absolute z-10 top-[85%] w-[80%] md:h-32 px-5 py-5 rounded-xl  shadow-2xl flex md:flex-row flex-col md:items-start items-center  md:space-x-3 space-x-0 md:text-left text-center'>
               <div className='md:border-r border-darkGray px-4'>
                  <h1 className='font-robik font-bold md:text-lg text-sm text-darkGray'>
                     IP ADDRESS
                  </h1>
                  <h2 className='font-robik font-bold text-veryDarkGray md:text-2xl text-lg'>
                     {location.ipAddress}
                  </h2>
               </div>
               <div className='md:border-r border-darkGray px-4'>
                  <h1 className='font-robik font-bold md:text-lg text-sm text-darkGray'>
                     LOCATION
                  </h1>
                  <h2 className='font-robik font-bold text-veryDarkGray md:text-2xl text-lg'>
                     {location.location}
                  </h2>
               </div>
               <div className='md:border-r border-darkGray px-4'>
                  <h1 className='font-robik font-bold md:text-lg text-sm text-darkGray'>
                     TIMEZONE
                  </h1>
                  <h2 className='font-robik font-bold text-veryDarkGray md:text-2xl text-lg'>
                     UTC {location.timeZone}
                  </h2>
               </div>
               <div>
                  <h1 className='font-robik font-bold md:text-lg text-sm text-darkGray'>ISP</h1>
                  <h2 className='font-robik font-bold text-veryDarkGray md:text-2xl text-lg'>
                     {location.isp}
                  </h2>
               </div>
            </div>
         </div>
         <div className='h-[65%] w-full'>
            {location.center ? (
               <MapContainer
                  className='h-full w-full z-0'
                  center={location.center}
                  zoom={13}
                  scrollWheelZoom={false}
               >
                  <TileLayer
                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                     url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  />
                  <Marker position={location.center}></Marker>
               </MapContainer>
            ) : (
               <div></div>
            )}
         </div>
      </main>
   );
}
