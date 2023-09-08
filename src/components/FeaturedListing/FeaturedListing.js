import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import "./FeaturedListing.css";
import config from "../../config";

export default function FeaturedListing() {
  const [listingData, setListingData] = useState([]);

  async function fetechListing() {
    try {
      const res = await axios.get(`${config.backendEndpoint}/real-estate-data`);
      const data = res.data.listings;

      setListingData(data.slice(0, 8));
    } catch (error) {
      setListingData([]);
      console.log(error);
    }
  }

  useEffect(() => {
    fetechListing();
  }, []);

  return (
    <Box padding={3}>
      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {listingData.length === 0 ? (
          <Grid item>
            <div className="error-message">
              <p>No Featured Listing Found!</p>
            </div>
          </Grid>
        ) : (
          listingData.map((list, idx) => (
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 200 }}
                  image={`/assets/real-estate-${idx}.jpg`}
                  title={list.property_name}
                />
                <CardContent>
                  <Typography
                    className="property-name"
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {list.property_name.slice(0, 6)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <div className="listing-detail">
                    <span className="property-price">Rs {list.price}</span>
                    <span className="property-city">{list.city}</span>
                  </div>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
