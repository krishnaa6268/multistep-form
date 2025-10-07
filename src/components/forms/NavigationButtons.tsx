import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  next?: () => void;
  prev?: () => void;
  isLastStep?: boolean;
  onSubmit?: () => void;
}

const NavigationButtons: React.FC<Props> = ({ next, prev, isLastStep, onSubmit }) => {
  return (
    <div className="flex justify-between mt-6">
      {prev && (
        <Button
          type="button"
          onClick={prev}
          className="lg:px-8 px-5 py-5 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 
          font-medium rounded-xl shadow-md hover:shadow-lg 
          hover:from-gray-300 hover:to-gray-400 active:scale-95 transition-all duration-300"
        >
          Previous
        </Button>
      )}

      {isLastStep ? (
        <Button
          type="button"
          onClick={onSubmit}
          className="ml-auto lg:px-8 px-5 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 
          text-white font-semibold rounded-xl shadow-md hover:shadow-lg 
          hover:from-emerald-600 hover:to-teal-700 active:scale-95 transition-all duration-300"
        >
          Submit
        </Button>
      ) : (
        next && (
          <Button
            type="button"
            onClick={next}
            className="ml-auto lg:px-8 px-5 py-5 bg-gradient-to-r from-blue-500 to-indigo-600 
            text-white font-semibold rounded-xl shadow-md hover:shadow-lg 
            hover:from-blue-600 hover:to-indigo-700 active:scale-95 transition-all duration-300"
          >
            Next
          </Button>
        )
      )}
    </div>
  );
};

export default NavigationButtons;
