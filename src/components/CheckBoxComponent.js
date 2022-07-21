import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

import { Box, FormControlLabel, Checkbox } from "@mui/material";

const CheckBoxComponent = (props) => {
  const [labelContent, setLabelContent] = useState();

  useEffect(() => {
    labelText();
  }, []);

  const labelText = () => {
    if (props.label === "보통") setLabelContent("사용감 있어요");
    else if (props.label === "좋음") setLabelContent("깨끗해요");
    else if (props.label === "최상") setLabelContent("새 것 같아요");
    else if (props.label === "미사용") setLabelContent("사용하지 않았어요");
  };

  return (
    <Box>
      <FormControlLabel
        control={
          <Controller
            name={props.name}
            control={props.control}
            rules={{ required: true }}
            render={({ field: { value, ...field } }) => (
              <Checkbox
                {...field}
                checkedIcon={
                  <img
                    src="/static/images/products/checkBox.png"
                    alt="checkBox"
                  />
                }
                icon={
                  <img
                    src="/static/images/products/checkBoxRound.png"
                    alt="checkBoxRound"
                  />
                }
                sx={{
                  height: 32,
                  color: "grayscale.200",
                  "&.Mui-checked": {
                    color: "nemoMint.400",
                  },
                }}
                checked={props.optionFiler.some((e) => e.label === props.label)}
                onClick={(e) =>
                  props.handleCheckBox(e, props.id, props.label, props.title)
                }
              />
            )}
          />
        }
        label={
          <Box>
            {props.label}
            <Box sx={{ typography: "body2", color: "grayscale.700" }}>
              {labelContent}
            </Box>
          </Box>
        }
      />
    </Box>
  );
};

export default CheckBoxComponent;
