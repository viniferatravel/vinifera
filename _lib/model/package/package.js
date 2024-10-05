import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    image: String,
    name: String,
});

const itinerarySchema = new mongoose.Schema({
    days: String,
    nights: String,
    cities: String,
    state_description: String
});

const dayPlanSchema = new mongoose.Schema({
    day: String,
    city_name: String,
    description: String,
    extra: String,
    inclusions: Array
});

const hotelsSchema = new mongoose.Schema({
    place: String,
    hotel: String,
    nights: Number,
});

const packageModel = new mongoose.Schema({
    package_id: String,
    package_name: String,
    price: String,
    category: Array,
    sub_category: Array,
    state: String,
    city: String,
    package_image: [String],
    places: [placeSchema],
    highlights: [String],
    tour_itinerary: itinerarySchema,
    days_plan: [dayPlanSchema],
    hotels: [hotelsSchema],
    notes: [String],
    special_notes: [String],
    our_speciality: [String],
    important_notes: [String],
    package_pdf: String,
    status: String,
});

export const Package = mongoose.models.package || mongoose.model("package", packageModel);