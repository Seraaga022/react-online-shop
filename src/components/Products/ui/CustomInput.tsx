import { forwardRef } from "react";
import { styled, TextField, TextFieldProps } from "@mui/material";
import Theme from "../../../theme/Theme";

const CustomInput = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const appTheme = Theme();
    const StyledTextField = styled(TextField)({
      width: "100%",
      pb: "55px",
      borderRadius: "10px",
      bgcolor: appTheme === "dark" ? "#141414" : "#f3f3f3",
      "& .MuiInputBase-input": {
        color: appTheme === "dark" ? "white" : "#000",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "1px solid",
        borderRadius: "10px",
        borderColor: appTheme === "dark" ? "#262626" : "#d1d5db",
        mb: "1px",
      },
      "&:hover:not(.Mui-focused)": {
        "& .MuiOutlinedInput-notchedOutline": {
          border: "1px solid #703bf7",
          borderRadius: "10px",
        },
      },
      "& .Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          border: "1px solid #703bf7",
          borderRadius: "10px",
        },
      },
    });

    return <StyledTextField {...props} inputRef={ref} />;
  }
);

export default CustomInput;
