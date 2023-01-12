import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

// style
import "../style/selections.css";

const Selections = ({
  labelInput,
  valueInput,
  handleValueInput,
  checkInput,
  errorMessage,
  gender,
  setGender,
}) => {
  return (
    <div className="selections">
      <div>
        <TextField
          label={labelInput}
          type="text"
          sx={{
            "& label.Mui-focused": {
              color: "#ff6e40",
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#ff6e40",
              },
            },
          }}
          value={valueInput}
          onChange={(event) => {
            handleValueInput(event.target.value);
          }}
        />
        {!checkInput() ? (
          <p>{errorMessage}</p>
        ) : (
          <p>
            <br />
          </p>
        )}
      </div>
      <FormControl>
        <RadioGroup
          row
          value={gender}
          onChange={(event) => {
            setGender(event.target.value);
          }}
        >
          <FormControlLabel
            value="F"
            control={<Radio sx={{ "&.Mui-checked": { color: "#ff6e40" } }} />}
            label="Femme"
          />
          <FormControlLabel
            value="M"
            control={<Radio sx={{ "&.Mui-checked": { color: "#ff6e40" } }} />}
            label="Homme"
          />
          <FormControlLabel
            value=""
            control={<Radio sx={{ "&.Mui-checked": { color: "#ff6e40" } }} />}
            label="Indifférent"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default Selections;
