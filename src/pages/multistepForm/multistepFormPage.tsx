import React from "react";
import MultiStepForm from "@/components/forms/MultiStepForm";

const MultistepFormPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* <div className="p-6">
      </div> */}
      <div className="m-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Multistep Form</h1>
        <MultiStepForm />
      </div>
    </div>
  );
};

export default MultistepFormPage;
