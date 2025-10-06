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
          className="px-4 py-2 bg-green-500 rounded hover:bg-gray-400"
        >
          Previous
        </Button>
      )}

      {isLastStep ? (
        <Button
          type="button"
          onClick={onSubmit}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-red-700"
        >
          Submit
        </Button>
      ) : (
        next && (
          <Button
            type="button"
            onClick={next}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Next
          </Button>
        )
      )}
    </div>
  );
};

export default NavigationButtons;
