import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/index";
import { updateForm, nextStep, prevStep } from "@/store/slices/formSlice";
import NavigationButtons from "./NavigationButtons";

import states from "@/utils/states-cities.json";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Step3Address: React.FC = () => {

  const dispatch = useDispatch();
  const address = useSelector((state: RootState) => state.form.data.address);
  const country = useSelector((state: RootState) => state.form.data?.country || "");

  const [citiesForState, setCitiesForState] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [form, setForm] = useState(
    address || {
      line1: "",
      line2: "",
      landmark: "",
      zip: "",
      state: "",
      city: "",
    }
  );

  useEffect(() => {
    if (form.state) handleCity(form.state);
  }, [form.state]);

  const validateField = (name: string, value: string) => {
    let message = "";

    switch (name) {
      case "line1":
        if (!value.trim()) message = "Address Line 1 is required.";
        break;
      case "line2":
        if (!value.trim()) message = "Address Line 2 is required.";
        break;
      case "landmark":
        if (!value.trim()) message = "Landmark is required.";
        break;
      case "zip":
        if (!value.trim()) message = "Zip Code is required.";
        else if (!/^\d{5,6}$/.test(value)) message = "Zip Code must be 5 or 6 digits.";
        break;
      case "state":
        if (!value) message = "State is required.";
        break;
      case "city":
        if (!value) message = "City is required.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  const handleSelectStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedState = e.target.value;
    setForm({ ...form, state: selectedState, city: "" });
    handleCity(selectedState);
    validateField("state", selectedState); // 
  };

  const handleSelectCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = e.target.value;
    setForm({ ...form, city: selectedCity });
    validateField("city", selectedCity);
  };

  const handleCity = (stateName: string) => {
    const stateObj = states.find((state) => state.name === stateName);
    if (stateObj) {
      const cityNames = stateObj.cities.map((c) => c.name);
      setCitiesForState(cityNames);
    } else {
      setCitiesForState([]);
    }
  };

  const validateAll = () => {
    const fields = ["line1", "line2", "landmark", "zip", "state", "city"] as const;
    fields.forEach((f) => validateField(f, form[f]));
    return fields.every((f) => {
      const val = form[f];
      if (!val.trim && !val) return false;
      return !errors[f];
    });
  };

  const handleNext = () => {
    if (validateAll()) {
      dispatch(updateForm({ address: form }));
      dispatch(nextStep());
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
        Address Information <span className="text-red-500">*</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1 md:col-span-2">
          <Label htmlFor="line1" className="mb-1 text-gray-700 font-medium block">
            Address Line 1 <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            name="line1"
            placeholder="House No, Street"
            value={form.line1}
            onChange={handleChange}
            className={`w-full ${errors.line1 ? "border-red-500" : ""}`}
          />
          {errors.line1 && <p className="text-red-500 text-sm">{errors.line1}</p>}
        </div>

        <div className="col-span-1 md:col-span-2">
          <Label htmlFor="line2" className="mb-1 text-gray-700 font-medium block">
            Address Line 2 <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            name="line2"
            placeholder="Apartment, Floor, Block"
            value={form.line2}
            onChange={handleChange}
            className={`w-full ${errors.line2 ? "border-red-500" : ""}`}
          />
          {errors.line2 && <p className="text-red-500 text-sm">{errors.line2}</p>}
        </div>

        <div>
          <Label htmlFor="landmark" className="mb-1 text-gray-700 font-medium block">
            Landmark <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            name="landmark"
            placeholder="Nearby Landmark"
            value={form.landmark}
            onChange={handleChange}
            className={`w-full ${errors.landmark ? "border-red-500" : ""}`}
          />
          {errors.landmark && <p className="text-red-500 text-sm">{errors.landmark}</p>}
        </div>

        <div>
          <Label htmlFor="zip" className="mb-1 text-gray-700 font-medium block">
            Zip Code <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            name="zip"
            placeholder="Postal / Zip Code"
            value={form.zip}
            onChange={handleChange}
            className={`w-full ${errors.zip ? "border-red-500" : ""}`}
          />
          {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
        </div>

        <div>
          <Label htmlFor="country" className="mb-1 text-gray-700 font-medium block">
            Country <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            value={country}
            disabled
            className="w-full bg-gray-100 text-gray-600"
          />
        </div>

        <div>
          <Label htmlFor="state" className="mb-1 text-gray-700 font-medium block">
            State <span className="text-red-500">*</span>
          </Label>
          <select
            name="state"
            value={form.state}
            onChange={handleSelectStateChange}
            className={`w-full border border-gray-300 rounded-lg p-2 bg-white text-gray-700 
              ${errors.state ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">Select your state</option>
            {states
              .filter((s) => s.country_id === 101)
              .map((st) => (
                <option key={st.id} value={st.name}>
                  {st.name}
                </option>
              ))}
          </select>
          {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
        </div>

        <div>
          <Label htmlFor="city" className="mb-1 text-gray-700 font-medium block">
            City <span className="text-red-500">*</span>
          </Label>
          <select
            name="city"
            value={form.city}
            onChange={handleSelectCityChange}
            disabled={citiesForState.length === 0}
            className={`w-full border border-gray-300 rounded-lg p-2 bg-white text-gray-700 
              ${errors.city ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">Select your city</option>
            {citiesForState.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>
      </div>

      <div className="mt-8">
        <NavigationButtons prev={() => dispatch(prevStep())} next={handleNext} />
      </div>
    </div>
  );
};

export default Step3Address;
