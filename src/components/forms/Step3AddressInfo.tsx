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
  const [citiesForState, setCitiesForState] = useState<string[]>([]);

  const country = useSelector(
    (state: RootState) => state.form.data?.country || ""
  );

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
    if (form.state) {
      handleCity(form.state);
    }
  }, [form.state]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStateName = e.target.value;
    //  console.log("state:", selectedStateName);
    setForm({ ...form, [e.target.name]: e.target.value });
    handleCity(selectedStateName);
  }
  const handleSelectCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCityName = e.target.value;
    // console.log("city:", selectedCityName);
    setForm({ ...form, [e.target.name]: selectedCityName, });
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

  const handleNext = () => {
    dispatch(updateForm({ address: form }));
    dispatch(nextStep());
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
            className="w-full"
          />
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
            className="w-full"
          />
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
            className="w-full"
          />
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
            className="w-full"
          />
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


        <div className="flex flex-col mb-4">
          <Label htmlFor="state" className="mb-1 text-gray-700 font-medium block">
            State <span className="text-red-500">*</span>
          </Label>
          <select
            name="state"
            value={form.state || ""}
            onChange={handleSelectStateChange}
            className=" border border-gray-300 rounded-lg p-2
                     focus:outline-none focus:ring-2 focus:ring-cyan-300
                     bg-white text-gray-700 transition-all"
          >
            <option value="">Select your state</option>
            {states.filter((state) => state.country_id === 101)
              .map((st) => (
                <option key={st.id} value={st.name}>
                  {st.name}
                </option>
              ))}
          </select>
        </div>


        <div>
          <Label htmlFor="city" className="mb-1 text-gray-700 font-medium block">
            City <span className="text-red-500">*</span>
          </Label>
          <select
            name="city"
            value={form.city || ""}
            onChange={handleSelectCityChange}
            disabled={citiesForState.length === 0}
            className="  border border-gray-300 rounded-lg p-2
                     focus:outline-none focus:ring-2 focus:ring-cyan-300
                     bg-white text-gray-700 transition-all"
          >
            <option value="">Select your city</option>
            {citiesForState.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8">
        <NavigationButtons
          prev={() => dispatch(prevStep())}
          next={handleNext}
        />
      </div>
    </div>
  );
};

export default Step3Address; 
