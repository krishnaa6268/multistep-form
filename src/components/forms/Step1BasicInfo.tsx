import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateForm, nextStep } from "@/store/slices/formSlice";
import NavigationButtons from "./NavigationButtons";

import countries from "@/utils/countries_only.json";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";

type Step1FormValues = {
  fullName: string;
  username: string;
  email: string;
  number: string;
  gender: string;
  country: string;
};

const Step1BasicInfo: React.FC = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form.data);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Step1FormValues>({
    mode: "onChange",
    defaultValues: {
      fullName: formData.fullName || "",
      username: formData.username || "",
      email: formData.email || "",
      number: formData.number || "",
      gender: formData.gender || "",
      country: formData.country || "",
    },
  });

  const handleReduxUpdate =
    (field: keyof Step1FormValues) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        dispatch(updateForm({ [field]: e.target.value }));
      };

  const onSubmit = (data: Step1FormValues) => {
    console.log("Form submitted:", data);
    dispatch(nextStep());
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow-lg p-4 lg:p-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
        Basic Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="fullName">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            placeholder="Enter your full name"
            {...register("fullName", {
              required: "Full name is required",
              minLength: {
                value: 3,
                message: "Full name must be at least 3 characters",
              },
              maxLength: {
                value: 20,
                message: "Full name must be at most 20 characters",
              },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Full name can only contain letters and spaces",
              },
              onChange: handleReduxUpdate("fullName"),
            })}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
          )}
        </div>


        <div>
          <Label htmlFor="username">Username <span className="text-red-500">*</span></Label>
          <Input
            type="text"
            placeholder="Choose a username"
            {...register("username", {
              required: "Username is required",
              minLength: { value: 3, message: "Min 3 characters" },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: "Only letters, numbers, underscores allowed",
              },
              onChange: handleReduxUpdate("username"),
            })}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
          <Input
            type="email"
            placeholder="example@mail.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
              onChange: handleReduxUpdate("email"),
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="number">Mobile <span className="text-red-500">*</span></Label>
          <Input
            type="text"
            placeholder="10-digit number"
            {...register("number", {
              required: "Mobile number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Must be a 10-digit number",
              },
              onChange: handleReduxUpdate("number"),
            })}
          />
          {errors.number && (
            <p className="text-red-500 text-sm mt-1">{errors.number.message}</p>
          )}
        </div>

        <div className="col-span-1 md:col-span-2">
          <Label>Gender <span className="text-red-500">*</span></Label>
          <div className="flex lg:gap-3 gap-1 mt-2">
            {["male", "female", "others"].map((g) => (
              <label
                key={g}
                className={`px-2 lg:px-3 py-2 border rounded-full cursor-pointer ${watch("gender") === g
                  ? "bg-cyan-500 text-white border-cyan-500"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <input
                  type="radio"
                  value={g}
                  {...register("gender", { required: "Please select your gender", onChange: handleReduxUpdate("gender") })}
                  className="hidden"
                />
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            ))}
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="country">Country <span className="text-red-500">*</span></Label>
          <select
            {...register("country", {
              required: "Please select your country",
              onChange: handleReduxUpdate("country"),
            })}
            className="w-full border border-gray-300 rounded-lg p-2 bg-white text-gray-700"
          >
            <option value="">Select your country</option>
            {countries.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <NavigationButtons
          // next={() => {
          //   if (isValid) handleSubmit(onSubmit)();
          // }}

          next={() => {
            handleSubmit(onSubmit)(); // triggers validation on all fields immediately
          }}
        />
      </div>
    </form>
  );
};

export default Step1BasicInfo;
