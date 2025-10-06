import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/index";
import { updateForm, nextStep } from "@/store/slices/formSlice";
import NavigationButtons from "./NavigationButtons";

import countries from "@/utils/countries_only.json";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema } from "@/utils/validationSchema";
import { z } from "zod";

const Step1BasicInfo: React.FC = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form.data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch(updateForm({ [e.target.name]: e.target.value }));
  };

  return (
    <div className=" bg-white rounded-2xl shadow-lg p-4 lg:p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
        Basic Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="fullname" className="mb-1 text-gray-700 font-medium">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="username" className="mb-1 text-gray-700 font-medium">
            Username <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            name="username"
            placeholder="Choose a username"
            value={formData.username || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="email" className="mb-1 text-gray-700 font-medium">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            type="email"
            name="email"
            placeholder="example@mail.com"
            value={formData.email || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="mobile" className="mb-1 text-gray-700 font-medium">
            Mobile <span className="text-red-500">*</span>
          </Label>
          <Input
            type="number"
            name="number"
            placeholder="10-digit number"
            value={formData.number || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <Label className="mb-2 text-gray-700 font-small lg:font-medium">Gender</Label>
          <div className="flex flex-row gap-3 justify-start mt-2 overflow-hidden">
            {["male", "female", "others"].map((g) => (
              <label
                key={g}
                className={`lg:px-4 lg:py-2 p-2 border rounded-full cursor-pointer transition 
                  ${formData.gender === g ? "bg-cyan-500 text-white border-cyan-500" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}
              >
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleChange}
                  className="hidden"
                />
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <Label htmlFor="country" className="mb-1 text-gray-700 font-medium">
            Country <span className="text-red-500">*</span>
          </Label>
          <select
            name="country"
            value={formData.country || ""}
            onChange={handleChange}
            className="w-full lg:max-w-auto md:w-1/3 border border-gray-300 rounded-lg p-2
             focus:outline-none focus:ring-2 focus:ring-cyan-300
             bg-white text-gray-700 transition-all"
          >
            <option value="" >Select your country</option>
            {countries.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8">
        <NavigationButtons next={() => dispatch(nextStep())} />
      </div>
    </div>
  );
};

export default Step1BasicInfo;
