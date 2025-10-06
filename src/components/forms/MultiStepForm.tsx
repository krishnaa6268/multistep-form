import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/index";

import FormHeader from "./FormHeader";
import Step1BasicInfo from "./Step1BasicInfo";
import Step2ProfileInfo from "./Step2ProfileInfo";
import Step3AddressInfo from "./Step3AddressInfo";
import Step4Preview from "./Step4Preview";

const MultiStepForm: React.FC = () => {

  const stepTitles = [
    "Step 1: Basic Information",
    "Step 2: Profile Information",
    "Step 3: Address Information",
    "Step 4: Preview & Submit"
  ];

  const step = useSelector((state: RootState) => state.form.step);

  const steps = [
    <Step1BasicInfo key="1" />,
    <Step2ProfileInfo key="2" />,
    <Step3AddressInfo key="3" />,
    <Step4Preview key="4" />,
  ];

  return <div className="lg:container p-4">
    <FormHeader step={step} />
    {steps[step - 1]}</div>;
};

export default MultiStepForm;
