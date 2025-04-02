import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingForm = () => {
    const navigate = useNavigate();
    const [bookingType, setBookingType] = useState("");
    const [bookingSlot, setBookingSlot] = useState("");
    const [bookingTime, setBookingTime] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [bookingDate, setBookingDate] = useState("");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
        window.location.reload();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("user_id") || "";

        const bookingData = {
            customer_name: customerName,
            customer_email: customerEmail,
            booking_date: bookingDate,
            booking_time: bookingType === "Custom" ? bookingTime : null,
            booking_type: bookingType,
            booking_slot: bookingType === "Half Day" ? bookingSlot : null,
            user_id: userId,
        };

        try {
            const response = await createBooking(bookingData);
            console.log("response456", response);

            if (response.status === 200) {
                setCustomerName("");
                setCustomerEmail("");
                setBookingDate("");
                setBookingType("");
                setBookingSlot("");
                setBookingTime("");
                toast.success(response.data.message || "Booking created successfully");
            }
        } catch (error) {
            console.log("error", error);

            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message || "Booking failed");
            } else {
                toast.error("An error occurred while booking.");
            }
        }
    };

    return (
        <div className="booking-container">
            <div className="booking-box">
                <h2>Booking Form</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Customer Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Customer Email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        required
                    />
                    <select value={bookingType} onChange={(e) => setBookingType(e.target.value)} required>
                        <option value="">Select Booking Type</option>
                        <option value="Full Day">Full Day</option>
                        <option value="Half Day">Half Day</option>
                        <option value="Custom">Custom</option>
                    </select>
                    {bookingType === "Half Day" && (
                        <select value={bookingSlot} onChange={(e) => setBookingSlot(e.target.value)} required>
                            <option value="">Select Booking Slot</option>
                            <option value="First Half">First Half</option>
                            <option value="Second Half">Second Half</option>
                        </select>
                    )}
                    {bookingType === "Custom" && (
                        <input
                            type="time"
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
                            required
                        />
                    )}
                    <button type="submit" className="btn-submit">Submit</button>
                </form>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
                <ToastContainer />
            </div>
        </div>
    );
};

export default BookingForm;
