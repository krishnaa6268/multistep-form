import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateForm, nextStep, prevStep } from "@/store/slices/formSlice";
import NavigationButtons from "./NavigationButtons";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


const Step2Profile: React.FC = () => {
  const BASE_URL: string = "http://192.168.29.28:9001/upload";
  const SERVER_STORE: string = "http://192.168.29.28:9001/storage/";
  let newURL: string;

  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.form.data.profile);

  const [form, setForm] = useState(
    profile || { bio: "", dob: "", picture: null, pictureUrl: "", previewUrl: "" }
  );

  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append("file", file);
      try {
        setIsUploading(true);
        const res = await fetch(BASE_URL, {
          method: "POST",
          body: formData,
        });
        if (!res.ok) {
          throw new Error(`Upload failed: ${res.statusText}`);
        }
        const data = await res.json();

        newURL = SERVER_STORE + data.meta.filename;
        console.log(newURL);

        setForm(prev => ({
          ...prev,
          pictureUrl: newURL,
        }));

        //const previewUrl = URL.createObjectURL(file);
        setForm(prev => ({ ...prev, picture: file, newURL }));
      } catch (err) {
        console.error("Upload failed:", err);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleNext = () => {
    dispatch(updateForm({ profile: form }));
    dispatch(nextStep());
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
        Profile Information
      </h2>

      <div className="space-y-6">
        <div>
          <Label htmlFor="bio" className="mb-1 text-gray-700 font-md">
            Bio <span className="text-red-500">*</span>
          </Label>
          <Textarea
            name="bio"
            value={form.bio || ""}
            onChange={handleChange}
            placeholder="Write something about yourself..."
            rows={4}
            className="w-full"
          />
        </div>

        <div className="flex lg:flex-row flex-col gap-4">
          <div>
            <Label htmlFor="dob" className="mb-1 text-gray-700 font-medium block">
              Date of Birth <span className="text-red-500">*</span>
            </Label>
            <Input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="picture" className="mb-1 text-gray-700 font-medium block">
              Profile Picture
            </Label>
            <Input
              type="file"
              name="picture"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              className="w-full cursor-pointer"
            />

            {isUploading && <p className="text-blue-500 mt-1">Uploading...</p>}

            {form.pictureUrl && (
              <img
                src={form.pictureUrl}
                alt="Preview"
                className="mt-2 h-20 w-20 object-cover rounded-full border"
              />
            )}

            {/* {form.pictureUrl && (
              <p className="text-green-600 text-sm mt-1">
                Uploaded! ({form.pictureUrl})
              </p>
            )} */}
          </div>
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

export default Step2Profile;
