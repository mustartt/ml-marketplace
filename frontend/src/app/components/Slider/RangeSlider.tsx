import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 250,
  },
});

const valuetext = (value: number) => {
  return `${value}°C`;
};

interface RangeSliderProps {
  value: number[];

  label?: string;

  min?: number;
  max?: number;
  step?: number;

  onChange: (newValue: number[]) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({value, label, onChange, ...props}) => {
  const classes = useStyles();

  const handleChange = (event: any, newValue: number | number[]) => {
    if (newValue instanceof Array) {
      onChange(newValue);
    }
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        {label}
      </Typography>
      <Slider
        {...props}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
};

export default RangeSlider;