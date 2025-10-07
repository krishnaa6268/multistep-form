import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateForm, nextStep, prevStep } from "@/store/slices/formSlice";
import NavigationButtons from "./NavigationButtons";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useForm } from "react-hook-form";

type ProfileFormValues = {
  bio: string;
  dob: string;
  picture?: File | null;
  pictureUrl?: string;
};

const Step2Profile: React.FC = () => {

  //--------Ravi Lodhi's Server Endpoints----------------
  // const BASE_URL = "http://192.168.29.28:9001/upload";
  //const SERVER_STORE = "http://192.168.29.28:9001/storage/";

  // const BASE_URL = "https://cirrhosed-centesimally-lindsay.ngrok-free.dev/upload";
  // const SERVER_STORE = "https://cirrhosed-centesimally-lindsay.ngrok-free.dev/storage/";

  //--------Vimal's Server Endpoints----------------
  const BASE_URL = "https://9d43c5971bff.ngrok-free.app/upload/"
  const SERVER_STORE = "https://9d43c5971bff.ngrok-free.app/storage/"

  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.form.data.profile);

  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<ProfileFormValues>({
    mode: "onChange",
    defaultValues: {
      bio: profile?.bio || "",
      dob: profile?.dob || "",
      picture: profile?.picture || "",
      pictureUrl: profile?.pictureUrl || "",
    },
  });

  const watchAll = watch();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        setIsUploading(true);
        const res = await fetch(BASE_URL, { method: "POST", body: formData });
        if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);
        const data = await res.json();
        const fileName = data.meta.filename;
        const newUrl = SERVER_STORE + fileName;
        //{ console.log(newUrl, fileName) }

        setValue("picture", fileName);
        setValue("pictureUrl", newUrl);
        dispatch(updateForm({ profile: { ...watchAll, picture: fileName, pictureUrl: newUrl } }));
      } catch (err) {
        console.error("Upload failed:", err);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleReduxChange =
    (field: keyof ProfileFormValues) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(field, e.target.value, { shouldValidate: true });
        dispatch(updateForm({ profile: { ...watchAll, [field]: e.target.value } }));
      };

  const onSubmit = (data: ProfileFormValues) => {
    dispatch(updateForm({ profile: data }));
    dispatch(nextStep());
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-gray-100 p-6 lg:p-10 transition-all duration-300"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
        Profile Information
      </h2>

      <div className="space-y-6">
        <div>
          <Label htmlFor="bio" className="mb-1 text-gray-700 font-md">
            Bio <span className="text-red-500">*</span>
          </Label>
          <Textarea
            placeholder="Write something about yourself..."
            className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all resize-none"
            rows={4}
            {...register("bio", {
              required: "Bio is required",
              minLength: {
                value: 10,
                message: "Bio must be at least 10 characters",
              },
              onChange: handleReduxChange("bio"),
            })}
          />
          {errors.bio && (
            <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
          )}
        </div>

        <div className="flex lg:flex-row flex-col gap-4">
          <div className="flex-1">
            <Label htmlFor="dob" className="mb-1 text-gray-700 font-medium block">
              Date of Birth <span className="text-red-500">*</span>
            </Label>
            <Input
              type="date"
              className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all w-full"
              {...register("dob", {
                required: "Date of Birth is required",
                onChange: handleReduxChange("dob"),
              })}
            />
            {errors.dob && (
              <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
            )}
          </div>

          <div className="flex-1">
            <Label htmlFor="picture" className="mb-1 text-gray-700 font-medium block">
              Profile Picture<span className="text-red-500">*</span>
            </Label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
              <Input
                type="file"
                accept="image/png, image/jpeg"
                id="picture"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="picture" className="text-blue-600 font-medium cursor-pointer">
                {isUploading ? "Uploading..." : "Click to upload"}
              </label>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG up to 2MB
              </p>

              {watchAll.pictureUrl && (
                <div className="mt-4 flex items-center justify-center">
                  <img
                    src={watchAll.pictureUrl}
                    alt="Profile Preview"
                    className="h-24 w-24 rounded-full border-4 border-white shadow-md object-cover ring-2 ring-blue-200 transition-all hover:scale-105"
                  />
                </div>
              )}
            </div>
            {/* {watchAll.pictureUrl && (
              <div className=" mt-3 flex align-center justify-center lg:justify-left ">
                <img
                  src={watchAll.pictureUrl}
                  alt="Preview"
                  className="mt-2 h-20 w-20 object-cover rounded-full border"
                />
              </div>
            )} */}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <NavigationButtons
          prev={() => dispatch(prevStep())}

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

export default Step2Profile;
