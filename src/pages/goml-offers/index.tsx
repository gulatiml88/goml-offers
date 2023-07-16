// material-ui
import { Grid } from '@mui/material';

// project imports
import ValidationWizard from 'sections/form-wizard';

// ==============================|| FORMS WIZARD ||============================== //

const FormsWizard = () => (
  <Grid container spacing={2.5} justifyContent="center">
    <Grid item xs={12} md={6} lg={7}>
      <ValidationWizard />
    </Grid>
  </Grid>
);

export default FormsWizard;
