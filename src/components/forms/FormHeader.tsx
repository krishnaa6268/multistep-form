import React from "react";

interface FormHeaderProps {
  step: number;
}

const FormHeader: React.FC<FormHeaderProps> = ({ step }) => {
  const stepTitles = [1, 2, 3, 4];

  return (
    <div className="mb-8 text-center">
      <div className="flex justify-between items-center relative w-full max-w-lg mx-auto">
        <div className="absolute top-1/2 -translate-y-1/2 h-1 bg-gray-300 left-0 right-0 z-0 mx-4">
          <div className="absolute h-full bg-blue-500 transition-all duration-500 ease-in-out"
            style={{ width: `${((step - 1) / (stepTitles.length - 1)) * 100}%` }}
          />
        </div>

        {stepTitles.map((s) => (
          <div
            key={s}
            className={`
              relative z-10 
              w-10 h-10 rounded-full 
              flex items-center justify-center 
              font-bold text-lg 
              transition-all duration-300 ease-in-out

              ${(s === step) ? "bg-blue-600 text-white shadow-md ring-4 ring-blue-300"
                : (s < step) ? "bg-blue-500 text-white"
                  : "bg-white text-gray-500 border-2 border-gray-300"
              }
            `}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormHeader;