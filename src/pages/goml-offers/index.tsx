// material-ui
import { Grid } from '@mui/material';

// project imports
import FormWizard from 'sections/form-wizard';

// ==============================|| FORMS WIZARD ||============================== //

const FormsWizard = () => (
  <Grid container spacing={2.5} justifyContent="center">
    <Grid item xs={12}>
      <FormWizard />
    </Grid>
  </Grid>
);

export default FormsWizard;
