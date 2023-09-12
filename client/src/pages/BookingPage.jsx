import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import { format } from "date-fns";


const BookingPage = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    useEffect(() => {
        if (id) {
            axios.get('https://jerrybnb-deploy-backend.onrender.com/bookings').then(response => {
                const foundBooking = response.data.find(({ _id }) => _id === id);
                if (foundBooking) {
                    setBooking(foundBooking)
                }
            })
        }
    }, [id]);
    if (!booking) {
        return '';
    }

    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.place.title}</h1>

            <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
            <div className="flex justify-between bg-gray-200 p-4 mb-4 rounded-2xl">
                <div>
                    <h2 className="text-xl">Your Booking Information:</h2>
                    <h3>Dates: {format(new Date(booking.checkIn), 'yyyy-MM-dd')} to {format(new Date(booking.checkOut), 'yyyy-MM-dd')}</h3>
                </div>
                <div className="bg-primary text-md p-4 text-white rounded-2xl">
                    Total Price: {booking.price} USD
                </div>
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    )
}

export default BookingPage
