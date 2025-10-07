import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { prevStep, setStep } from "@/store/slices/formSlice";
import NavigationButtons from "./NavigationButtons";
import { Pencil } from "lucide-react";

const Step4Preview: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.form.data);
  const [pictureUrl, setPictureUrl] = useState<string | undefined>();

  useEffect(() => {
    if (data.profile?.pictureUrl) {
      setPictureUrl(data.profile.pictureUrl);
    } else if (data.profile?.previewUrl) {
      setPictureUrl(data.profile.previewUrl);
    } else {
      setPictureUrl(undefined);
    }
  }, [data.profile?.pictureUrl, data.profile?.previewUrl]);

  const handleEdit = (step: number) => {
    dispatch(setStep(step));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-gray-100 p-6 lg:p-10 transition-all duration-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
        Review Your Information
      </h2>
      <div className="mb-8 text-sm bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-3">
            Basic Information
          </h3>
          <button
            onClick={() => handleEdit(1)}
            className="flex items-center gap-1 text-blue-600 hover:underline"
          >
            <Pencil size={16} /> Edit
          </button>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800 text-sm">
          <p className="break-words"><span className="font-medium">Full Name:</span> {data.fullName}</p>
          <p className="break-words"><span className="font-medium">Username:</span> {data.username}</p>
          <p className="break-words"><span className="font-medium">Email:</span> {data.email}</p>
          <p className="break-words"><span className="font-medium">Mobile:</span> {data.number}</p>
          <p className="break-words"><span className="font-medium">Gender:</span> {data.gender}</p>
        </div>
      </div>

      <div className="mb-8 text-sm bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4 transition-all duration-300">
        <div className="flex justify-between items-center mb-4 ">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-3">
            Profile Information
          </h3>
          <button
            onClick={() => handleEdit(2)}
            className="flex items-center gap-1 text-blue-600 hover:underline"
          >
            <Pencil size={16} /> Edit
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <span className="block font-medium mb-2 text-gray-800">Profile Picture:</span>
            {pictureUrl ? (
              <img
                src={pictureUrl}
                alt="Profile Preview"
                className="w-32 h-32 object-cover rounded border"
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center border rounded-lg text-gray-400">
                No Image
              </div>
            )}
          </div>

          <div className="flex-1 grid md:grid-cols-2 gap-4 text-gray-800">
            <p><span className="font-medium">Bio:</span> {data.profile?.bio || "-"}</p>
            <p><span className="font-medium">Date of Birth:</span> {data.profile?.dob || "-"}</p>
          </div>
        </div>
      </div>

      <div className="mb-8 text-sm bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-3">
            Address Information
          </h3>
          <button
            onClick={() => handleEdit(3)}
            className="flex items-center gap-1 text-blue-600 hover:underline"
          >
            <Pencil size={16} /> Edit
          </button>
        </div>
        <div className="w-full grid md:grid-cols-2 gap-4 text-gray-800 text-sm">
          <p className="break-words"><span className="font-medium">Address Line1:</span> {data.address?.line1}</p>
          <p className="break-words"><span className="font-medium">Address Line 2:</span> {data.address?.line2}</p>
          <p className="break-words"><span className="font-medium">Landmark:</span> {data.address?.landmark}</p>
          <p><span className="font-medium">City:</span> {data.address?.city}</p>
          <p><span className="font-medium">State:</span> {data.address?.state}</p>
          <p><span className="font-medium">Zip Code:</span> {data.address?.zip}</p>
          <p><span className="font-medium">Country:</span> {data.country}</p>
        </div>
      </div>

      <NavigationButtons
        prev={() => dispatch(prevStep())}
        isLastStep
        onSubmit={() => {
          const combinedData = {
            basicInfo: {
              fullName: data.fullName,
              username: data.username,
              email: data.email,
              number: data.number,
              gender: data.gender,
            },
            profileInfo: {
              bio: data.profile?.bio,
              dob: data.profile?.dob,
              pictureUrl: data.profile?.pictureUrl,
            },
            addressInfo: {
              line1: data.address?.line1,
              line2: data.address?.line2,
              landmark: data.address?.landmark,
              city: data.address?.city,
              state: data.address?.state,
              zip: data.address?.zip,
              country: data.country,
            },
          };
          alert(
            "✅ Form Submitted Successfully!\n\n" +
            JSON.stringify(combinedData, null, 2)
          );

          // sessionStorage.removeItem("formData");
         window.location.reload();
        }}
      />
    </div>
  );
};

export default Step4Preview;
