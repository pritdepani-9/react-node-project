import Booking from "../models/booking.js";

export const booking = async (req, res) => {
    const { user_id, booking_date, booking_type, booking_slot, booking_time, customer_name, customer_email } = req.body;

    try {
        const firstHalfEnd = 12; 
        const secondHalfStart = 12;

        let mappedSlot = booking_slot;

      
        if (booking_type === "Custom") {
            const bookingHour = new Date(booking_time).getHours();

            if (bookingHour < firstHalfEnd) {
                mappedSlot = "First Half"; 
            } else {
                mappedSlot = "Second Half";
            }
        }

        
        const existingBookings = await Booking.findAll({ where: { booking_date } });

        let isFirstHalfBooked = false;
        let isSecondHalfBooked = false;

  
        for (const existingBooking of existingBookings) {
            if (existingBooking.booking_type === "Full Day") {
                return res.status(400).json({ message: "Full Day booking is already full for this date." });
            }

            if (existingBooking.booking_slot === "First Half") {
                isFirstHalfBooked = true;
            }

            if (existingBooking.booking_slot === "Second Half") {
                isSecondHalfBooked = true;
            }

            if (existingBooking.booking_type === "Custom") {
                const bookedHour = new Date(existingBooking.booking_time).getHours();

                if (bookedHour < firstHalfEnd) {
                    isFirstHalfBooked = true; 
                } else {
                    isSecondHalfBooked = true;
                }
            }
        }

        if (booking_type === "Full Day" && (isFirstHalfBooked || isSecondHalfBooked)) {
            return res.status(400).json({ message: "Cannot book Full Day because a part of the day is already booked." });
        }

        if (mappedSlot === "First Half" && isFirstHalfBooked) {
            return res.status(400).json({ message: "First Half booking is already full for this date." });
        }

        if (mappedSlot === "Second Half" && isSecondHalfBooked) {
            return res.status(400).json({ message: "Second Half booking is already full for this date." });
        }

        const newBooking = await Booking.create({
            user_id,
            booking_date,
            booking_type,
            booking_slot: mappedSlot,
            booking_time,
            customer_name,
            customer_email
        });

        res.status(200).json({ message: "Booking created successfully", booking: newBooking });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


