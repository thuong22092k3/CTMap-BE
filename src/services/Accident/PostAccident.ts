import { Request, Response } from "express";
import AccidentModel from "../../models/Accident";
import openGeocoder from "node-open-geocoder";

const parsePosition = (position: string) => {
  const [lat, lng] = position.split(", ").map(Number);
  return { lat, lng };
};

const getLocationFromLatLng = async (
  lat: number,
  lng: number
): Promise<{ location: string; city: string }> => {
  return new Promise((resolve, reject) => {
    openGeocoder()
      .reverse(lng, lat)
      .end((err: any, res: any) => {
        if (err) {
          console.error("Error getting location from OpenStreetMap:", err);
          return resolve({
            location: "Unknown Location",
            city: "Unknown City",
          });
        }

        console.log("OpenStreetMap Geocoding response:", res);

        if (res && res.address) {
          const location = res.display_name || "Unknown Location";
          const city =
            res.address.city ||
            res.address.town ||
            res.address.county ||
            "Unknown City";

          return resolve({ location, city });
        } else {
          return resolve({
            location: "Unknown Location",
            city: "Unknown City",
          });
        }
      });
  });
};

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

//         console.log("OpenStreetMap Geocoding response:", res);

//         if (res && res.address) {
//           const location = res.display_name || "Unknown Location";
//           console.log(
//             "Full OpenStreetMap Response:",
//             JSON.stringify(res, null, 2)
//           );

//           // Thứ tự ưu tiên lấy giá trị cho city (huyện -> thành phố -> thị trấn -> làng/xã)
//           const city =
//             res.address.county || // Huyện
//             res.address.city || // Thành phố
//             res.address.town || // Thị trấn
//             res.address.village || // Làng/xã
//             "Unknown City"; // Mặc định nếu không có thông tin

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

export const addAccident = async (req: Request, res: Response) => {
  try {
    const {
      date,
      deaths,
      injuries,
      position,
      level,
      cause,
      sophuongtienlienquan,
      link,
      userName,
      showUserName, //Thêm ở đây
    } = req.body;

    if (
      !date ||
      !deaths ||
      !injuries ||
      !position ||
      !level ||
      !cause ||
      !sophuongtienlienquan
    ) {
      return res
        .status(400)
        .send("ERROR ADD ACCIDENT: Missing required fields");
    }

    const { lat, lng } = parsePosition(position);
    const { location, city } = await getLocationFromLatLng(lat, lng);

    const newAccident = await AccidentModel.create({
      ...req.body,
      location,
      city,
      userName: userName || "",
      showUserName: typeof showUserName !== "undefined" ? showUserName : true,
    });

    return res.status(200).json({ accident: newAccident });
  } catch (err) {
    console.error("ERROR ADD ACCIDENT:", err);
    return res.status(500).send("ERROR ADD ACCIDENT: Internal Server Error");
  }
};
