import * as React from 'react';

import { Select } from '@base-ui-components/react/select';

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
}

export function MenuSelect({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  className = '',
}: SelectProps) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        className={`flex h-[52px] min-w-36 items-center justify-between gap-3 rounded-md px-[16px] py-[14px] text-base text-gray-900 select-none bg-gray-100 hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800 active:bg-gray-100 data-[popup-open]:bg-gray-100 ${className}`}
      >
        <Select.Value placeholder={value ?? placeholder} />
        <Select.Icon className="flex">
          <ChevronUpDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner className="outline-none" sideOffset={8}>
          <Select.Popup className="group rounded-md bg-white py-1 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 dark:shadow-none dark:outline-gray-300">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="grid min-w-[var(--anchor-width)] cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 px-4 text-sm leading-4 select-none data-[highlighted]:bg-gray-900 data-[highlighted]:text-white"
              >
                <Select.ItemIndicator className="col-start-1">
                  {value === option.value && <CheckIcon className="size-3" />}
                </Select.ItemIndicator>
                <Select.ItemText className="col-start-2">
                  {option.label}
                </Select.ItemText>
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

function ChevronUpDownIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M0.5 4.5L4 1.5L7.5 4.5" />
      <path d="M0.5 7.5L4 10.5L7.5 7.5" />
    </svg>
  );
}

function CheckIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...props}>
      <path
        d="M2 6L5 9L10 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
