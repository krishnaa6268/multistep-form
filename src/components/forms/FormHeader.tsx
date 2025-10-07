import React from "react";

interface FormHeaderProps {
  step: number;
}

const FormHeader: React.FC<FormHeaderProps> = ({ step }) => {
  const stepTitles = [1, 2, 3, 4];

  return (
    <div className="mb-10 text-center">
      <div className="relative w-full max-w-2xl mx-auto">
        {/* Background line */}
        <div className="absolute top-1/2 -translate-y-1/2 h-1 bg-gray-300 left-5 right-5 rounded-full z-0">
          <div
            className="absolute h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-700 ease-in-out"
            style={{ width: `${((step - 1) / (stepTitles.length - 1)) * 100}%` }}
          />
        </div>

        {/* Step circles */}
        <div className="flex justify-between items-center relative z-10 px-5">
          {stepTitles.map((s) => {
            const isActive = s === step;
            const isCompleted = s < step;

            return (
              <div
                key={s}
                className={`
                  relative w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold
                  transition-all duration-500 ease-in-out
                  cursor-pointer
                  ${isActive ? "bg-blue-600 text-white shadow-lg ring-4 ring-blue-300 scale-110"
                    : isCompleted ? "bg-blue-500 text-white shadow-md"
                      : "bg-white text-gray-400 border-2 border-gray-300"}
                  hover:scale-110
                `}
              >
                {s}
                {isCompleted && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full shadow-md animate-pulse"></span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FormHeader;
