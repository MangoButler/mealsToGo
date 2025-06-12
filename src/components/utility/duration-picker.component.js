import { range } from "../../utils/transformations";
import DropdownSelector from "./dropdown-selector.component";

const DurationPicker = ({
  value,
  onChange,
  maxDuration = 5,
  interval = "h",
  ...props
}) => {
  const durations = range(maxDuration);
  const druationsMap = durations.map((duration) => {
    return {
      value: duration,
      label: `${duration}${duration > 1 ? interval + "s" : interval}`,
    };
  });

  return (
    <DropdownSelector
      data={druationsMap}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default DurationPicker;
