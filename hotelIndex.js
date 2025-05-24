const express = require("express");
const app = express();
app.use(express.json());

const { initializeDatabase } = require("./db/db.connect");
const Hotel = require("./models/hotel.models");

initializeDatabase();

//--------------------------------------------------------------------

//Hotel

// const newHotel = {
//   name: "New Hotel",
//   category: "Mid-Range",
//   location: "123 Main Street, Frazer Town",
//   rating: 4.0,
//   reviews: [],
//   website: "https://hotel-example.com",
//   phoneNumber: "+1234567890",
//   checkInTime: "2:00 PM",
//   checkOutTime: "12:00 PM",
//   amenities: ["Laundry", "Room Service"],
//   priceRange: "$$$ (31-60)",
//   reservationsNeeded: true,
//   isParkingAvailable: true,
//   isWifiAvailable: true,
//   isPoolAvailable: false,
//   isSpaAvailable: false,
//   isRestaurantAvailable: true,
//   photos: [
//     "https://example.com/hotel-photo1.jpg",
//     "https://example.com/hotel-photo2.jpg",
//   ],
// };

// const newHotel = {
//   name: "Lake View",
//   category: "Mid-Range",
//   location: "124 Main Street, Anytown",
//   rating: 3.2,
//   reviews: [],
//   website: "https://lake-view-example.com",
//   phoneNumber: "+1234555890",
//   checkInTime: "2:00 PM",
//   checkOutTime: "12:00 PM",
//   amenities: ["Laundry", "Boating"],
//   priceRange: "$$$ (31-60)",
//   reservationsNeeded: true,
//   isParkingAvailable: false,
//   isWifiAvailable: true,
//   isPoolAvailable: false,
//   isSpaAvailable: false,
//   isRestaurantAvailable: false,
//   photos: [
//     "https://example.com/hotel1-photo1.jpg",
//     "https://example.com/hotel1-photo2.jpg",
//   ],
// };

// const newHotel = {
//   name: "Sunset Resort",
//   category: "Resort",
//   location: "12 Main Road, Anytown",
//   rating: 4.0,
//   reviews: [],
//   website: "https://sunset-example.com",
//   phoneNumber: "+1299655890",
//   checkInTime: "2:00 PM",
//   checkOutTime: "11:00 AM",
//   amenities: [
//     "Room Service",
//     "Horse riding",
//     "Boating",
//     "Kids Play Area",
//     "Bar",
//   ],
//   priceRange: "$$$$ (61+)",
//   reservationsNeeded: true,
//   isParkingAvailable: true,
//   isWifiAvailable: true,
//   isPoolAvailable: true,
//   isSpaAvailable: true,
//   isRestaurantAvailable: true,
//   photos: [
//     "https://example.com/hotel2-photo1.jpg",
//     "https://example.com/hotel2-photo2.jpg",
//   ],
// };

async function createHotel(newHotel) {
  try {
    const hotel = new Hotel(newHotel);
    const saveHotel = await hotel.save();
    return saveHotel;
  } catch (error) {
    throw error;
  }
}

app.post("/hotels", async (req, res) => {
  try {
    const savedhotel = await createHotel(req.body);
    res.status(201).json({
      message: "hotel added succussfully.",
      hotel: savedhotel,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to Add hotel." });
  }
});

//createHotel(newHotel);

// read all hotels from the database
async function readAllHotel() {
  try {
    const hotel = await Hotel.find();
    return hotel;
  } catch (error) {
    throw error;
  }
}

app.get("/hotels", async (req, res) => {
  try {
    const hotel = await readAllHotel();
    if (hotel.length != 0) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "No hotel found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotel." });
  }
});

//readAllHotel();

// read a hotel by its name ("Lake View").

async function readHotelByName(hotelName) {
  try {
    const hotel = await Hotel.findOne({ name: hotelName });
    return hotel;
  } catch (error) {
    throw error;
  }
}

app.get("/hotels/:hotelName", async (req, res) => {
  try {
    const hotel = await readHotelByName(req.params.hotelName);
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "No hotel found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotel." });
  }
});

//readHotelByName("Lake View");

//read all hotels which offers parking space.

async function readHotelWithParking(parking) {
  try {
    const hotel = await Hotel.find({ isParkingAvailable: parking });
    console.log(hotel);
  } catch (error) {
    throw error;
  }
}

//readHotelWithParking(true);

//read all hotels which has restaurant available.

async function readHotelWithRestaurant(restaurant) {
  try {
    const hotel = await Hotel.find({ isRestaurantAvailable: restaurant });
    console.log(hotel);
  } catch (error) {
    throw error;
  }
}

//readHotelWithRestaurant(true);

//read all hotels by category ("Mid-Range")

async function readHotelWithCategory(Hotelcategory) {
  try {
    const hotel = await Hotel.find({ category: Hotelcategory });
    return hotel;
  } catch (error) {
    throw error;
  }
}

app.get("/hotels/category/:hotelCategory", async (req, res) => {
  try {
    const hotel = await readHotelWithCategory(req.params.hotelCategory);
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "No hotel found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotel." });
  }
});

//readHotelWithCategory("Mid-Range");

//read all hotels by price range ("$$$$ (61+)")

async function readHotelWithPrice(HotelPrice) {
  try {
    const hotel = await Hotel.find({ priceRange: HotelPrice });
    console.log(hotel);
  } catch (error) {
    throw error;
  }
}
//readHotelWithPrice("$$$$ (61+)");

//read all hotels with 4.0 rating

async function readHotelWithRating(HotelRating) {
  try {
    const hotel = await Hotel.find({ rating: HotelRating });
    return hotel;
  } catch (error) {
    throw error;
  }
}

app.get("/hotels/rating/:hotelRating", async (req, res) => {
  try {
    const hotel = await readHotelWithRating(req.params.hotelRating);
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "No hotel found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotel." });
  }
});

//readHotelWithRating(4);

//read a hotel by phone number from database

async function readHotelWithPNumber(HotelPhoneNum) {
  try {
    const hotel = await Hotel.find({ phoneNumber: HotelPhoneNum });
    return hotel;
  } catch (error) {
    throw error;
  }
}

app.get("/hotels/directory/:phoneNumber", async (req, res) => {
  try {
    const hotel = await readHotelWithPNumber(req.params.phoneNumber);
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "No hotel found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotel." });
  }
});

//readHotelWithPNumber({ phoneNumber: "+1299655890" });

//find hotel By id and update data

async function updateHotelById(hotelId, dataToUpdate) {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, dataToUpdate, {
      new: true,
    });
    return updatedHotel;
  } catch (error) {
    console.log("error  in changing data:", error);
  }
}

app.post("/hotels/:hotelId", async (req, res) => {
  try {
    const updatedHotel = await updateHotelById(req.params.hotelId, req.body);
    if (updatedHotel) {
      res.status(200).json({
        message: "Hotel  updated succussfully.",
        updatedHotel: updatedHotel,
      });
    } else {
      res.status(404).json({ error: "Hotel not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update Hotel." });
  }
});

//updateHotel("6826c76eb66a4c0f22e4a36a", { checkOutTime: "11:00 AM" });

//find hotel By One and update rating

async function updateHotelDetail(hotelName, dataToUpdate) {
  try {
    const updatedHotel = await Hotel.findOneAndUpdate(
      { name: hotelName },
      dataToUpdate,
      {
        new: true,
      }
    );
    console.log(updatedHotel);
  } catch (error) {
    console.log("error  in changing data:", error);
  }
}

//updateHotelDetail("Sunset Resort", { rating: 4.2 });

//find hotel By One and update phoneNumber

async function updateHotelPhone(hotelNumber, dataToUpdate) {
  try {
    const updatedHotel = await Hotel.findOneAndUpdate(
      { phoneNumber: hotelNumber },
      dataToUpdate,
      {
        new: true,
      }
    );
    console.log(updatedHotel);
  } catch (error) {
    console.log("error  in changing data:", error);
  }
}

//updateHotelPhone("+1299655890", { phoneNumber: "+1997687392" });

//find hotel By id and delete from database

async function deleteHotelById(hotelId) {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
    return deletedHotel;
  } catch (error) {
    console.log("Error in deleting hotel", error);
  }
}

app.delete("/hotels/:hotelId", async (req, res) => {
  try {
    const deletedHotel = await deleteHotelById(req.params.hotelId);
    if (deletedHotel) {
      res.status(200).json({
        message: "hotel  deleted succussfully.",
        deletedHotel: deletedHotel,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete hotel." });
  }
});

//deleteHotelById("6825b27bdebedaf28899463a");

//find hotel By one  and delete from database

async function deleteHotelByPhoneNumber(hotelPNumber) {
  try {
    const deleteHotel = await Hotel.findOneAndDelete({
      phoneNumber: hotelPNumber,
    });
    console.log("deleted hotel ", deleteHotel);
  } catch (error) {
    console.log("Error in deleting hotel", error);
  }
}

//deleteHotelByPhoneNumber("+1997687392");

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
