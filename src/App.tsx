import { useState } from "react";
import "./App.css";

interface IMatrixOption {
  combination: string[];
}

const matrix: IMatrixOption["combination"][] = [
  ["T-shirt", "White", "L", "$200"],
  ["T-shirt", "White", "XL", "$250"],
  ["T-shirt", "Black", "L", "$210"],
  ["T-shirt", "Black", "XL", "$260"],
  ["Polo", "White", "XL", "$300"],
  ["Polo", "Black", "XL", "$310"],
  ["Polo", "Black", "XXL", "$320"],
];

const labels = ["Product", "Color", "Size", "Price"];

function App() {
  const [initialOptions, setInitialCombination] = useState<
    IMatrixOption["combination"]
  >(matrix[0]);

  const generateOptions = (
    index: number,
    combination: IMatrixOption["combination"]
  ) => {
    const filteredMatrix = matrix.filter((row) => {
      for (let i = 0; i <= index - 1; i++) {
        if (row[i] !== combination[i]) {
          return false;
        }
      }

      return true;
    });

    return Array.from(new Set(filteredMatrix.map((row) => row[index])));
  };

  const handleSelectChange = (index: number, value: string) => {
    setInitialCombination((prevValues) => {
      const newValues = [...prevValues];
      const selectedOption = matrix.flat().find((option) => option === value);
      const matrixLength = matrix[0].length;

      newValues[index] = selectedOption || value;

      for (let i = index + 1; i < matrixLength; i++) {
        const activeOptions = generateOptions(i, newValues);
        const possibleOptions = generateOptions(i, newValues);

        newValues[i] =
          activeOptions.length > 0 ? activeOptions[0] : possibleOptions[0];
      }

      return newValues;
    });
  };

  return (
    <>
      {initialOptions.map((option, index) => (
        <>
          <label
            htmlFor={labels[index]}
            className={"block mb-2 mt-2 text-sm font-medium text-gray-900"}
          >
            {labels[index]}
          </label>
          <select
            id={labels[index]}
            key={index}
            value={option}
            onChange={(e) => handleSelectChange(index, e.target.value)}
            className={
              "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            }
          >
            {generateOptions(index, initialOptions).map((possibleOption) => (
              <option key={possibleOption} value={possibleOption}>
                {possibleOption}
              </option>
            ))}
          </select>
        </>
      ))}
    </>
  );
}

export default App;
