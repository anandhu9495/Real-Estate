import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react'
import { Navigation } from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css/bundle'
import ListingItem from '../Components/ListingItem'





export default function Home() {

  const [offerListings,setOfferListings] = useState([])
  const [saleListings,setSaleListings] = useState([])
  const [rentListings,setRentListings]= useState([])

  SwiperCore.use([Navigation])

  console.log(saleListings);


  useEffect(()=> {

    const fetchOfferListing= async  () => {

      try{
        const res = await fetch(`/api/listing/get?offer=true&limit=4`)
        const data = await res.json()
        setOfferListings(data)
        fetchRentListing()



      }
      catch(error){
        console.log(error);

      }


    }

    const fetchRentListing =async () => {
      try{
        const res = await fetch(`/api/listing/get?type=rent&limit=4`)
        const data  = await res.json()
        setRentListings(data)
        fetchSaleListing()

      }
      catch(error){
        console.log(error);
      }

    }

    const fetchSaleListing = async () => {
      try{
        const res = await fetch(`/api/listing/get?type=sale&limit=4`)
        const data = await res.json()
        setSaleListings(data)

      }
      catch(error){
        console.log(error);

      }
    }


    fetchOfferListing()

  },[])


  return (
    <div>

      {/*top*/}

      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find Your next <span className='text-slate-500'>Prefect</span> <br /> place with ease
        </h1>

        <div className='text-gray-400 text-xs sm:text-sm'>
        Discover your perfect home with our innovative real estate app, DreamDwellHub. 
        <br />
        Whether you're in search of a cozy apartment, a spacious house, or a luxurious penthouse.


        </div>

        <Link to={'/search'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>

        Let's Get Started
        
        </Link>




      </div>



      {/*swiper*/}

      <Swiper navigation>
  {offerListings && offerListings.length > 0 && offerListings.map((listing) => (
    <SwiperSlide key={listing._id}>
      {listing.imageUrls && listing.imageUrls.length > 0 ? (
        <div style={{ background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: 'cover' }} className='h-[500px]'></div>
      ) : (
        <div className='h-[500px]'>Image Not Available</div>
      )}
    </SwiperSlide>
  ))}
</Swiper>

     



      {/*listing result for offer sale and rent*/}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>

        {
          offerListings && offerListings.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent Offers</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show More Offers</Link>
              </div>

              <div className='flex  gap-8'>
                {
                  offerListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id}/>

                  ))
                }
              </div>


            </div>
          )
        }


{
          rentListings && rentListings.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent Places For Rent</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show More Places for Rent</Link>
              </div>

              <div className='flex  gap-8'>
                {
                  rentListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id}/>

                  ))
                }
              </div>


            </div>
          )
        }



{
          saleListings && saleListings.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent Places for Sale</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show More places for sale</Link>
              </div>

              <div className='flex  gap-8'>
                {
                  saleListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id}/>

                  ))
                }
              </div>


            </div>
          )
        }



      </div>


    </div>
  )
}