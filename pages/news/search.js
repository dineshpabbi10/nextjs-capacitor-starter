import { Button, Grid, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "../../components/Header";

export default function Search() {
  const apiKey = "6a387d914ff74121a26fe94753aadf95";
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  function fetchNews() {
    let apiUrl = `https://newsapi.org/v2/everything?q=${search}&apiKey=${apiKey}`;
    setLoading(true);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setData(data.articles);
        setLoading(false);
      });
  }

  function setSearchValue(event) {
    setSearch(event.target.value);
  }

  return (
    <>
      <Header />
      <br />
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={11} md={3}>
          <TextField
            onChange={setSearchValue}
            style={{ width: "100%" }}
            label="Search News"
            variant="standard"
            focused
          />
        </Grid>
        <Grid item md={1}>
          <Button onClick={fetchNews}>Search </Button>
        </Grid>
      </Grid>
      {isLoading ? (
        <Grid container justifyContent={"center"}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Grid container spacing={2} justifyContent="center">
            {data?.map((article) => {
              return (
                <Grid item xs={11} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        {article?.title}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {article?.description}
                      </Typography>
                      <Typography variant="body2">{data?.fact}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </>
  );
}
