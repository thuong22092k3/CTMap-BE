import { Request, Response } from "express";
import AccidentModel from "../../models/Accident";
import openGeocoder from "node-open-geocoder";

export const updateAccident = async (req: Request, res: Response) => {
  try {
    const { id, ...body } = req.body;
    const updatedAccident = await AccidentModel.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      { new: true }
    );

    if (!updatedAccident) {
      return res.status(404).send("ERROR UPDATE ACCIDENT: Accident not found");
    }

    res.status(200).json({ updatedAccident });
  } catch (error) {
    console.error("ERROR UPDATE ACCIDENT:", error);
    res.status(500).send("ERROR UPDATE ACCIDENT: Internal Server Error");
  }
};

// const parsePosition = (position: string) => {
//   const [lat, lng] = position.split(", ").map(Number);
//   return { lat, lng };
// };

// const getLocationFromLatLng = async (
//   lat: number,
//   lng: number
// ): Promise<{ location: string; city: string }> => {
//   return new Promise((resolve, reject) => {
//     openGeocoder()
//       .reverse(lng, lat)
//       .end((err: any, res: any) => {
//         if (err) {
//           console.error("Error getting location from OpenStreetMap:", err);
//           return resolve({
//             location: "Unknown Location",
//             city: "Unknown City",
//           });
//         }

//         if (res && res.address) {
//           const location = res.display_name || "Unknown Location";
//           const city =
//             res.address.city ||
//             res.address.town ||
//             res.address.county ||
//             "Unknown City";

//           return resolve({ location, city });
//         } else {
//           return resolve({
//             location: "Unknown Location",
//             city: "Unknown City",
//           });
//         }
//       });
//   });
// };

// export const updateAccident = async (req: Request, res: Response) => {
//   try {
//     const { id, position, ...body } = req.body;

//     let updateData = { ...body };
//     if (position) {
//       const { lat, lng } = parsePosition(position);
//       const { location, city } = await getLocationFromLatLng(lat, lng);
//       updateData = {
//         ...updateData,
//         position,
//         location,
//         city,
//       };
//     }

//     const updatedAccident = await AccidentModel.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true }
//     );

//     if (!updatedAccident) {
//       return res.status(404).send("ERROR UPDATE ACCIDENT: Accident not found");
//     }

//     res.status(200).json({ updatedAccident });
//   } catch (error) {
//     console.error("ERROR UPDATE ACCIDENT:", error);
//     res.status(500).send("ERROR UPDATE ACCIDENT: Internal Server Error");
//   }
// };
