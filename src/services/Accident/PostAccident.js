"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAccident = void 0;
const Accident_1 = __importDefault(require("../../models/Accident"));
const node_open_geocoder_1 = __importDefault(require("node-open-geocoder"));
const parsePosition = (position) => {
    const [lat, lng] = position.split(",").map(Number);
    return { lat, lng };
};
const getLocationFromLatLng = (lat, lng) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        (0, node_open_geocoder_1.default)()
            .reverse(lng, lat)
            .end((err, res) => {
            if (err) {
                console.error("Error getting location from OpenStreetMap:", err);
                return resolve({
                    location: "Unknown Location",
                    city: "Unknown City",
                });
            }
            // Log response for debugging
            console.log("OpenStreetMap Geocoding response:", res);
            if (res && res.address) {
                const location = res.display_name || "Unknown Location";
                const city = res.address.city || res.address.town || "Unknown City";
                return resolve({ location, city });
            }
            else {
                return resolve({
                    location: "Unknown Location",
                    city: "Unknown City",
                });
            }
        });
    });
});
const addAccident = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, deaths, injuries, position, level, cause, sophuongtienlienquan, link, } = req.body;
        if (!date ||
            !deaths ||
            !injuries ||
            !position ||
            !level ||
            !cause ||
            !sophuongtienlienquan) {
            return res
                .status(400)
                .send("ERROR ADD ACCIDENT: Missing required fields");
        }
        const { lat, lng } = parsePosition(position);
        const { location, city } = yield getLocationFromLatLng(lat, lng);
        const newAccident = yield Accident_1.default.create(Object.assign(Object.assign({}, req.body), { location,
            city }));
        return res.status(200).json({ accident: newAccident });
    }
    catch (err) {
        console.error("ERROR ADD ACCIDENT:", err);
        return res.status(500).send("ERROR ADD ACCIDENT: Internal Server Error");
    }
});
exports.addAccident = addAccident;
