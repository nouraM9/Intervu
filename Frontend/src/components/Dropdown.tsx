import { useState } from "react";

interface DropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

function Dropdown({ label, options, value, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mb-6">
      <label className="body-text-1 mb-2 block">{label}</label>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between border border(--border) rounded-xl px-4 py-4"
      >
        <span>{value}</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="absolute w-full bg-white rounded-2xl shadow-xl z-10 mt-2">
          {options.map((option) => (
            <button
              className="block w-full text-left body-text-1 px-4 py-3 hover:bg-(--accent) hover:text-white hover:rounded-2xl"
              key={option}
              type="button"
              value={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
