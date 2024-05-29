import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CssBaseline, Typography, AppBar, Toolbar, Button, Grid, Box, Avatar } from '@mui/material';
import TreeView from './components/TreeView';
import { fetchCompanies } from './features/companiesSlice';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import logo from "../src/assets/LOGO TRACTIAN.png";
import lighting from "../src/assets/Lighting.png";

const App = () => {
  const dispatch = useDispatch();
  const companies = useSelector(state => state.companies.companies);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: '#0D1B2A' }}>
        <Toolbar>
          <img src={logo} alt="Logo" style={{ width: 150, height: 17 }} />
        </Toolbar>
      </AppBar>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ margin: 1, px: 2 }}>
        <Grid item>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography component="h1" gutterBottom sx={{ fontWeight: "bold", fontSize: `19px !important` }}>
              Atvios
            </Typography>
            <Typography component="h1" gutterBottom sx={{ color: 'grey', marginLeft: 1, fontSize: `17px !important` }}>
              / Apex unit
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Button sx={{ border: '1px solid lightgrey', color: 'grey', backgroundColor: 'transparent', mx: 1, textTransform: 'none', px: 2 }}>
            <Avatar src={lighting} alt="Logo" sx={{ marginRight: 0.5, width: 20, height: 18 }} />
            Sensor de Energia
          </Button>
          <Button sx={{ border: '1px solid lightgrey', color: 'grey', backgroundColor: 'transparent', textTransform: 'none', px: 2 }}>
            <ErrorOutlineIcon sx={{ marginRight: 0.5, fontSize: "medium", color: '#ADD8E6' }} />
            Critico
          </Button>
        </Grid>
      </Grid>
      {companies.length > 0 && (
        <TreeView key={companies[0].id} companyId={companies[0].id} companyName={companies[0].name} />
      )}
    </>
  );
};

export default App;
