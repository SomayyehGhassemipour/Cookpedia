interface Props {
  label: string;
  name: string;
  placeholdertxt: string;
  options: string[];
  defaultValue?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}
export const SelectInput: React.FC<Props> = ({
  label,
  name,
  placeholdertxt,
  options,
  defaultValue,
  onChange,
}) => {
  return (
    <div className="field-set">
      <label>{label}</label>
      <select
        className="input-select"
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {options.map((item) =>
          item === "gender" ? (
            <option hidden disabled selected>
              {" "}
              {placeholdertxt}
            </option>
          ) : (
            <option value={item}>{item} </option>
          )
        )}
      </select>
    </div>
  );
};
