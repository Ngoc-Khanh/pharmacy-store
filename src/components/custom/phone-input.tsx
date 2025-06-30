import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, value, ...props }, ref) => {
      return (
        <RPNInput.default
          ref={ref}
          className={cn("flex", className)}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          flagComponent={FlagComponent as any}
          countrySelectComponent={CountrySelect}
          inputComponent={InputComponent}
          smartCaret={false}
          value={value || undefined}
          /**
           * Handles the onChange event.
           *
           * react-phone-number-input might trigger the onChange event as undefined
           * when a valid phone number is not entered. To prevent this,
           * the value is coerced to an empty string.
           *
           * @param {E164Number | undefined} value - The entered value
           */
          onChange={(value) => onChange?.(value || ("" as RPNInput.Value))}
          {...props}
        />
      );
    },
  );
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
  <Input
    className={cn("rounded-e-lg rounded-s-none", className)}
    {...props}
    ref={ref}
  />
));
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

// Memoize country calling codes để tránh tính toán lại
const countryCallingCodes = new Map<RPNInput.Country, string>();

const getCountryCallingCode = (country: RPNInput.Country): string => {
  if (!countryCallingCodes.has(country)) {
    countryCallingCodes.set(country, `+${RPNInput.getCountryCallingCode(country)}`);
  }
  return countryCallingCodes.get(country)!;
};

const CountrySelect = React.memo(({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [displayedSearchValue, setDisplayedSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [visibleCount, setVisibleCount] = React.useState(20);
  const [isFirstOpen, setIsFirstOpen] = React.useState(true);

  // Cache search data để tránh recompute
  const searchDataRef = React.useRef<{ value: RPNInput.Country | undefined; label: string; searchText: string; }[] | null>(null);
  
  const searchData = React.useMemo(() => {
    if (searchDataRef.current) return searchDataRef.current;
    
    const data = countryList.map(({ value, label }) => ({
      value,
      label,
      searchText: `${label.toLowerCase()} ${value ? getCountryCallingCode(value) : ''}`.toLowerCase(),
    }));
    
    searchDataRef.current = data;
    return data;
  }, [countryList]);

  // Get all filtered results (không giới hạn)
  const allFilteredCountries = React.useMemo(() => {
    if (!searchValue.trim()) {
      return countryList;
    }
    
    const searchLower = searchValue.toLowerCase();
    const results = [];
    
    for (const item of searchData) {
      if (item.value && item.searchText.includes(searchLower)) {
        results.push({
          value: item.value,
          label: item.label
        });
      }
    }
    
    return results;
  }, [searchData, searchValue, countryList]);

  // Chỉ hiển thị số lượng items theo visibleCount
  const visibleCountries = React.useMemo(() => {
    return allFilteredCountries.slice(0, visibleCount);
  }, [allFilteredCountries, visibleCount]);

  // Memoize close handler
  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    setSearchValue("");
    setDisplayedSearchValue("");
    setVisibleCount(20); // Reset về 20 items đầu
  }, []);

  // Handle popover open với optimizations
  const handleOpenChange = React.useCallback((open: boolean) => {
    setIsOpen(open);
    
    if (open && isFirstOpen) {
      // Defer heavy operations để UI mở nhanh hơn
      setTimeout(() => {
        setIsFirstOpen(false);
      }, 0);
    }
    
    if (!open) {
      // Cleanup khi đóng
      setSearchValue("");
      setDisplayedSearchValue("");
      setVisibleCount(20);
    }
  }, [isFirstOpen]);

  // Load more countries when scrolling
  const handleLoadMore = React.useCallback(() => {
    setVisibleCount(prev => Math.min(prev + 20, allFilteredCountries.length));
  }, [allFilteredCountries.length]);

  // Scroll handler để detect khi scroll gần tới cuối
  const handleScroll = React.useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const threshold = 100; // Trigger load more khi còn 100px
    
    if (scrollHeight - scrollTop - clientHeight < threshold && visibleCount < allFilteredCountries.length) {
      handleLoadMore();
    }
  }, [visibleCount, allFilteredCountries.length, handleLoadMore]);

  // Immediate search update với throttling
  const searchTimeoutRef = React.useRef<NodeJS.Timeout>();
  
  const handleSearchChange = React.useCallback((value: string) => {
    // Update display ngay lập tức cho responsive UX
    setDisplayedSearchValue(value);
    
    // Throttle actual search
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      setSearchValue(value);
      setVisibleCount(20); // Reset về 20 items khi search mới
      
      // Reset scroll position
      if (scrollAreaRef.current) {
        const viewportElement = scrollAreaRef.current.querySelector(
          "[data-radix-scroll-area-viewport]",
        );
        if (viewportElement) {
          viewportElement.scrollTop = 0;
        }
      }
    }, 50);
  }, []);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Pre-render content để tránh lag khi mở lại
  const contentRef = React.useRef<JSX.Element | null>(null);
  
  const renderContent = React.useMemo(() => {
    if (!isOpen) {
      // Giữ cached content khi đóng để mở lại nhanh hơn
      return contentRef.current;
    }

    const hasMore = visibleCount < allFilteredCountries.length;

    const content = (
      <PopoverContent className="w-[300px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            value={displayedSearchValue}
            onValueChange={handleSearchChange}
            placeholder="Search country..."
          />
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className="h-72" onScrollCapture={handleScroll}>
              <CommandEmpty>Không tìm thấy quốc gia.</CommandEmpty>
              <CommandGroup>
                {visibleCountries.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                      onSelectComplete={handleClose}
                    />
                  ) : null,
                )}
                {hasMore && (
                  <div className="p-2 text-center text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                      Đang tải thêm quốc gia...
                    </div>
                  </div>
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    );

    // Cache content để lần sau mở nhanh hơn
    contentRef.current = content;
    return content;
  }, [isOpen, visibleCountries, allFilteredCountries.length, visibleCount, displayedSearchValue, selectedCountry, onChange, handleClose, handleSearchChange, handleScroll]);

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange} modal>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="flex gap-1 rounded-e-none rounded-s-lg border-r-0 px-3 focus:z-10"
          disabled={disabled}
        >
          <FlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />
          <ChevronsUpDown
            className={cn(
              "-mr-2 size-4 opacity-50",
              disabled ? "hidden" : "opacity-100",
            )}
          />
        </Button>
      </PopoverTrigger>
      {renderContent}
    </Popover>
  );
});

CountrySelect.displayName = "CountrySelect";

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
  onSelectComplete: () => void;
}

const CountrySelectOption = React.memo(({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}: CountrySelectOptionProps) => {
  const handleSelect = React.useCallback(() => {
    onChange(country);
    onSelectComplete();
  }, [country, onChange, onSelectComplete]);

  const callingCode = React.useMemo(() => getCountryCallingCode(country), [country]);

  const isSelected = country === selectedCountry;

  return (
    <CommandItem className="gap-2" onSelect={handleSelect}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-sm text-foreground/50">{callingCode}</span>
      <CheckIcon
        className={`ml-auto size-4 ${isSelected ? "opacity-100" : "opacity-0"}`}
      />
    </CommandItem>
  );
});

CountrySelectOption.displayName = "CountrySelectOption";

// Memoize flag component để tránh re-render flags
const FlagComponent = React.memo(({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
});

FlagComponent.displayName = "FlagComponent";

export { PhoneInput };