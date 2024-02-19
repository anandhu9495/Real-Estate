import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ListingItem from '../Components/ListingItem';

export default function Search() {

    const navigate = useNavigate()

    const [sidebaraData,setSidebarData] = useState({

        searchTerm: '',
        type:'all',
        parking:false,
        furnished:false,
        offer:false,
        sort:'created_at',
        order:'desc',



        
        
    })

    const [loading,setLoading] = useState(false)
    const [listings,setListings] = useState([])
    const [showMore,setShowMore]= useState(false)

    // console.log(listings);

    useEffect(()=> {
        const urlParams = new URLSearchParams(location.search)
        const searchTermFomrUrl = urlParams.get('searchTerm')
        const typeformUrl = urlParams.get('type')
        const parkingformUrl = urlParams.get('parking')
        const furnishedformUrl = urlParams.get('furnished')
        const offerformUrl = urlParams.get('offer')
        const sortformUrl = urlParams.get('sort')
        const orderformUrl = urlParams.get('order')


        if(searchTermFomrUrl || typeformUrl || parkingformUrl || furnishedformUrl || offerformUrl || sortformUrl || orderformUrl){
            setSidebarData({
                searchTerm:searchTermFomrUrl || '',
                type:typeformUrl || 'all',
                parking: parkingformUrl === 'true' ? true : false,
                furnished: furnishedformUrl === 'true' ? true : false,
                offer : offerformUrl === 'true' ? true : false,
                sort : sortformUrl || 'created_at',
                order : orderformUrl || 'desc',
            })
        }

        const fectListings = async () => {

            setLoading(true)
            setShowMore(false)
            const searchQuery = urlParams.toString()
            const res = await fetch(`/api/listing/get?${searchQuery}`)
            const data = await res.json()

            if(data.length > 8){
                setShowMore(true)
            }
            else{
                setShowMore(false)
            }


            setListings(data)
            setLoading(false)


 
        }
        fectListings()





    },[location.search])

    // console.log(sidebaraData);

    const handleChange = (e) => {

        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
            setSidebarData({...sidebaraData, type: e.target.id})
        }

        if(e.target.id === 'searchTerm'){
            setSidebarData({...sidebaraData, searchTerm: e.target.value})
        }

        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'  ){
            setSidebarData({...sidebaraData,[e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false,})
        }

        if(e.target.id === 'sort_order'){

            const sort = e.target.value.split('_')[0] || 'created_at'

            const order = e.target.value.split('_')[1] || 'desc'

            setSidebarData({...sidebaraData, sort,order})

        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const urlParams = new URLSearchParams()
        urlParams.set('searchTerm',sidebaraData.searchTerm)
        urlParams.set('type',sidebaraData.type)
        urlParams.set('parking',sidebaraData.parking)
        urlParams.set('furnished',sidebaraData.furnished)
        urlParams.set('offer',sidebaraData.offer)
        urlParams.set('sort',sidebaraData.sort)
        urlParams.set('order',sidebaraData.order)

        const searchQuery = urlParams.toString()

        navigate(`/search?${searchQuery}`)





    }

    const onshowMoreClick = async () => {
        const numberOfListing = listings.length;
        const startIndex = numberOfListing
        const urlParams = new URLSearchParams(location.search)

        urlParams.set('startIndex',startIndex)
        const searchQuery = urlParams.toString()
        const res = await fetch(`/api/listing/get?${searchQuery}`)
        const data = await res.json()

        if(data.length < 9){
            setShowMore(false)
        }
        setListings([...listings, ...data])
    }


  return (
    <div className='flex flex-col md:flex-row'>

        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>

            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>

                <div className='flex items-center gap-2 '>
                    <label className='whitespace-nowrap font-semibold'>Search Term : </label>
                    <input type="text" id='searchTerm' placeholder='Search...' className='border rounded-lg p-3 w-full' value={sidebaraData.searchTerm} onChange={handleChange} />
                </div>

                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Type:</label>

                    <div className='flex gap-2'>
                        <input type="checkbox" id='all' className='w-5' onChange={handleChange} checked={sidebaraData.type === 'all'} />
                        <span>Rent & Sale</span>
                    </div>


                    <div className='flex gap-2'>
                        <input type="checkbox" id='rent' className='w-5' onChange={handleChange} checked={sidebaraData.type === 'rent'} />
                        <span>Rent</span>
                    </div>



                    <div className='flex gap-2'>
                        <input type="checkbox" id='sale' className='w-5' onChange={handleChange} checked={sidebaraData.type === 'sale'} />
                        <span>Sale</span>
                    </div>


                    <div className='flex gap-2'>
                        <input type="checkbox" id='offer' className='w-5' onChange={handleChange} checked={sidebaraData.offer} />
                        <span>Offer</span>
                    </div>


                </div>

                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Amenities:</label>

                    <div className='flex gap-2'>
                        <input type="checkbox" id='parking' className='w-5' onChange={handleChange} checked={sidebaraData.parking} />
                        <span>Parking</span>
                    </div>


                    <div className='flex gap-2'>
                        <input type="checkbox" id='furnished' className='w-5' onChange={handleChange} checked={sidebaraData.furnished} />
                        <span>Furnished</span>
                    </div>


                </div>

                <div className='flex items-center gap-2'>
                    <label className='font-semibold'>Sort:</label>
                    <select onChange={handleChange} defaultValue={'created_at_desc'} className='border rounded-lg p-3' id="sort_order">
                        <option value="regularPrice_desc">Price high to low</option>
                        <option value="regularPrice_asc">Price low to high</option>
                        <option value="createAt_desc">Latest</option>
                        <option value="createAt_asc">Oldest</option>



                    </select>
                </div>

                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>


            </form>

        </div>


        <div className='flex-1'>

            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing Result : </h1>

            <div className='p-7 flex flex-wrap gap-4'> 
                {!loading && listings.length === 0 && (
                    <p className='text-xl text-slate-700'>No Listing Found!</p>
                )}
                {loading && (
                    <p className='text-xl text-slate-700 text-center w-full'>Loading...</p>
                )}

                {
                    !loading && listings && listings.map((listing) => (
                        <ListingItem key={listing._id} listing ={listing}/>
                    ))
                }

                {showMore && (
                    <button className='text-green-700 hover:underline p-7 text-center w-full' onClick={onshowMoreClick}>show More..</button>
                )}
            </div>

        </div>



    </div>
  )
}
