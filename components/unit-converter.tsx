"use client"; // Enables client-side rendering for this component

// Import necessary hooks from React
import { useState, ChangeEvent } from "react";

// Import custom UI components from the UI directory
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Conversion rates for various units categorized by length, weight, and volume
const conversionRates: Record<string, Record<string, number>> = {
  length: {
    "Millimeters (mm)": 1,
    "Centimeters (cm)": 10,
    "Meters (m)": 1000,
    "Kilometers (km)": 1000000,
    "Inches (in)": 25.4,
    "Feet (ft)": 304.8,
    "Yards (yd)": 914.4,
    "Miles (mi)": 1609344,
  },
  weight: {
    "Grams (g)": 1,
    "Kilograms (kg)": 1000,
    "Ounces (oz)": 28.3495,
    "Pounds (lb)": 453.592,
  },
  volume: {
    "Milliliters (ml)": 1,
    "Liters (l)": 1000,
    "Fluid Ounces (fl oz)": 29.5735,
    "Cups (cup)": 240,
    "Pints (pt)": 473.176,
    "Quarts (qt)": 946.353,
    "Gallons (gal)": 3785.41,
  },
};

// Unit types categorized by length, weight, and volume
const unitTypes: Record<string, string[]> = {
  length: [
    "Millimeters (mm)",
    "Centimeters (cm)",
    "Meters (m)",
    "Kilometers (km)",
    "Inches (in)",
    "Feet (ft)",
    "Yards (yd)",
    "Miles (mi)",
  ],
  weight: ["Grams (g)", "Kilograms (kg)", "Ounces (oz)", "Pounds (lb)"],
  volume: [
    "Milliliters (ml)",
    "Liters (l)",
    "Fluid Ounces (fl oz)",
    "Cups (cup)",
    "Pints (pt)",
    "Quarts (qt)",
    "Gallons (gal)",
  ],
};

// Default export of the UnitConverterComponent function
export default function UnitConverter() {
  // State hooks for managing input value, selected units, and the converted value
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [inputUnit, setInputUnit] = useState<string | null>(null);
  const [outputUnit, setOutputUnit] = useState<string | null>(null);
  const [convertedValue, setConvertedValue] = useState<number | null>(null);

  // Handler for updating the input value state on input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(parseFloat(e.target.value));
  };

  // Handler for updating the input unit state on select change
  const handleInputUnitChange = (value: string): void => {
    setInputUnit(value);
  };

  // Handler for updating the output unit state on select change
  const handleOutputUnitChange = (value: string): void => {
    setOutputUnit(value);
  };

  // Function to convert the input value to the selected output unit
  const convertValue = (): void => {
    if (inputValue !== null && inputUnit && outputUnit) {
      let unitCategory: string | null = null;

      // Determine the unit category (length, weight, volume)
      for (const category in unitTypes) {
        if (
          unitTypes[category].includes(inputUnit) &&
          unitTypes[category].includes(outputUnit)
        ) {
          unitCategory = category;
          break;
        }
      }

      // Perform the conversion if the units are compatible
      if (unitCategory) {
        const baseValue = inputValue * conversionRates[unitCategory][inputUnit];
        const result = baseValue / conversionRates[unitCategory][outputUnit];
        setConvertedValue(result);
      } else {
        setConvertedValue(null);
        alert("Incompatible unit types selected."); // Alert if units are incompatible
      }
    } else {
      setConvertedValue(null);
      alert("Please fill all fields."); // Alert if any field is empty
    }
  };

  // JSX return statement rendering the unit converter UI
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200 dark:bg-blue-700">
      {/* Center the unit converter card within the screen */}
      <div className="max-w-md w-full p-5 bg-rose-300 rounded-lg shadow-2xl">
        <h1 className="text-5xl font-bold mb-2 text-center">Unit Converter</h1>
        <p className="text-sm mb-8 text-center bg-black text-white">
          Convert values between different units.
        </p>
        <div className="bg-blue-200 gap-2 p-5">
          {/* Select for input unit */}
          <div className="space-y-1 w-28">
            <Label htmlFor="input-unit" className="font-bold text-base">From:</Label>
            <Select onValueChange={handleInputUnitChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(unitTypes).map(([category, units]) => (
                  <SelectGroup key={category}>
                    <SelectLabel>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectLabel>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Select for output unit */}
          <div className="space-y-1 w-28">
            <Label htmlFor="output-unit" className="font-bold text-base">To:</Label>
            <Select onValueChange={handleOutputUnitChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(unitTypes).map(([category, units]) => (
                  <SelectGroup key={category}>
                    <SelectLabel>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectLabel>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Input for value to convert */}
          <div className="space-y-2 col-span-2 bg-rose-300 p-5 text-center">
            <Label htmlFor="input-value" className="font-bold text-base">Value</Label>
            <Input
              id="input-value"
              type="number"
              placeholder="Enter value"
              value={inputValue || ""}
              onChange={handleInputChange}
              className="text-center  font-bold text-base"
            />
          </div>
          {/* Button to trigger conversion */}
          <Button
            type="button"
            className="w-full bg-blue-500 text-primary-foreground font-bold text-black hover:bg-rose-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            onClick={convertValue}
          >
            Convert
          </Button>
        </div>
        {/* Display the converted value */}
        <div className="mt-6 text-center bg-blue-300 p-6 shadow-2xl">
          <div className="text-5xl font-bold">
            {convertedValue !== null ? convertedValue.toFixed(2) : "0"}
          </div>
          <div className="text-black">
            {outputUnit ? outputUnit : "Unit"}
          </div>
        </div>
      </div>
      <div className="text-sm font-mono">
        <p>Made By <b>MARYAM ANSARI</b></p>
      </div>
    </div>
  );
}