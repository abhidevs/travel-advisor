import React, { createRef, useEffect, useState } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";

import PlaceDetails from "../PlaceDetails/PlaceDetails";
import useStyles from "./styles";

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}) => {
  const classes = useStyles();
  const [placeRefs, setPlaceRefs] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => placeRefs[i] || createRef());
    setPlaceRefs(refs);
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h5">
        Restaurants, Hotels & Attractions around you
      </Typography>

      <FormControl className={classes.formControl} disabled={isLoading}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl} disabled={isLoading}>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={(e) => setRating(e.target.value)}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>

      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <Grid container spacing={3} className={classes.list}>
          {places?.map((place, i) => (
            <Grid ref={placeRefs[i]} item key={i} xs={12}>
              <PlaceDetails
                place={place}
                selected={Number(childClicked) === i}
                refProp={placeRefs[i]}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default List;
