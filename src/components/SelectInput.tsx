import React from "react";

interface Option {
  // Define the properties of each object in the list
  id: number;
  title: string;
}

interface SelectInputProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  htmlFor: string;
  label: string;
  options: Option[]; // Define the prop for the list of objects
}

const SelectInput: React.FC<SelectInputProps> = ({
  options,
  htmlFor,
  label,
  onChange,
}: SelectInputProps) => {
  return (
    <>
      <label htmlFor={htmlFor}>{label}</label>
      <select
        id={htmlFor}
        onChange={onChange}
        className="bg-gray-50 border px-3 py-2 mt-1 mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        {options.map((option) => (
          <option value={option.id}>{option.title}</option>
        ))}
      </select>
    </>
  );
};

export default SelectInput;
