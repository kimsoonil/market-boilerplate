import React, { useState, useEffect } from "react";

import CheckBoxComponent from "src/components/CheckBoxComponent";
// MUI stuff
import {
  Accordion,
  Box,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const useStyles = makeStyles((theme) => ({
  listHeader: {
    display: "flex",
    borderBottom: "2px solid #0d0d0d",
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
    marginBottom: 12,
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
  optionScroll: {
    overflowY: "auto",
    height: "68vh",
    // "&::-webkit-scrollbar": { display: "none" },
  },

  accordionStyle: {
    boxShadow: "none",
    borderBottom: "1px solid #cfcfcf",
    paddingBottom: theme.spacing(0.5),

    "& .css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root": {
      padding: 0,
    },
    "& .Mui-expanded > .MuiSvgIcon-root": {
      transform: "rotate(135deg)",
    },
    "&:last-of-type": {
      borderRadius: 0,
    },
    "& .MuiAccordion-region": {
      marginBottom: theme.spacing(1),
    },
    "&:before": {
      backgroundColor: theme.palette.grayscale[0],
      position: "static",
    },
    "& .MuiAccordionSummary-contentGutters": {
      margin: 0,
    },
    "& .MuiAccordionSummary-gutters.Mui-expanded": {
      minHeight: 48,
    },
  },
  accordionDetails: {
    padding: "4px 8px",
  },
}));

const OptionContent = (props) => {
  const classes = useStyles();
  const [expandedState, setExpandedState] = useState([]);
  // const [filerState, setFilterState] = useState([]);

  const handleExpanded = (panel) => () => {
    if (expandedState.indexOf(panel) > -1) {
      setExpandedState(expandedState.filter((value) => value !== panel));
    } else {
      setExpandedState([...expandedState, panel]);
    }
  };

  useEffect(() => {
    let filerState = [];
    props.optionState.map((stateItem, index) => {
      props.optionFiler.map((filterItem) => {
        if (stateItem.title === filterItem.title) {
          filerState.push(index + 1);
        }
      });
    });

    const set = new Set(filerState);
    const uniqueArr = [...set];

    setExpandedState([]);
    uniqueArr.map((item) => {
      setExpandedState((expandedState) => [...expandedState, `panel${item}`]);
    });
  }, [props.optionFiler]);
  return (
    <>
      <Box className={classes.listHeader}>
        <Box
          sx={{
            typography: "h5",
            color: "grayscale.1000",
          }}
        >
          옵션 필터링
        </Box>
        <Box
          sx={{
            typography: "button",
            color: "grayscale.600",
            cursor: "pointer",
          }}
          onClick={() => props.resetCheckbox()}
        >
          초기화
        </Box>
      </Box>

      <Box className={classes.optionScroll}>
        {props.optionState.map((item, index) => {
          return (
            <Accordion
              key={index}
              className={classes.accordionStyle}
              onChange={handleExpanded(`panel${index + 1}`)}
              expanded={expandedState.indexOf(`panel${index + 1}`) > -1}
            >
              <AccordionSummary
                expandIcon={<AddOutlinedIcon sx={{ fontSize: 16 }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ m: 0 }}
              >
                <Box
                  sx={{
                    typography: "h6",
                    color: "grayscale.600",
                  }}
                >
                  {item.title}
                </Box>
              </AccordionSummary>
              {item.options.map((optionItem, optionIndex) => {
                return (
                  <AccordionDetails
                    key={optionIndex}
                    className={classes.accordionDetails}
                  >
                    <CheckBoxComponent
                      {...props}
                      label={optionItem.label}
                      title={item.title}
                      id={optionItem.id}
                      name={"someCheckbox" + index + optionIndex}
                    />
                  </AccordionDetails>
                );
              })}
            </Accordion>
          );
        })}
      </Box>
    </>
  );
};

export default OptionContent;
