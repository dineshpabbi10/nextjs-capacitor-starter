import { Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "../../components/Header";

export default function Topheadlines() {
  const apiKey = "6a387d914ff74121a26fe94753aadf95";
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setData(data.articles);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <br />
      <Grid container justifyContent={"center"}>
        <Typography variant="h5" gutterBottom>
          Top Headlines
        </Typography>
      </Grid>
      {isLoading ? (
        <CircularProgress />
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
