// material-ui
import { Button, Grid, Stack, Typography, TextField, InputLabel } from '@mui/material';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// project imports
import AnimateButton from 'components/@extended/AnimateButton';

const validationSchema = yup.object({
  business_problem: yup.string().required('Business Problem is required')
});

// ==============================|| VALIDATION WIZARD - PROBLEM  ||============================== //

export type ProblemData = {
  business_problem?: string;
};

interface ProblemFormProps {
  problemData: ProblemData;
  setProblemData: (d: ProblemData) => void;
  handleNext: () => void;
  setErrorIndex: (i: number | null) => void;
}

const ProblemForm = ({ problemData, setProblemData, handleNext, setErrorIndex }: ProblemFormProps) => {
  const formik = useFormik({
    initialValues: {
      business_problem: problemData.business_problem
    },
    validationSchema,
    onSubmit: (values) => {
      setProblemData({
        business_problem: values.business_problem
      });
      handleNext();
    }
  });

  return (
    <>
      <Typography variant="h5" color="primary" gutterBottom sx={{ mb: 3 }}>
        ABOUT PROBLEM
      </Typography>
      <form onSubmit={formik.handleSubmit} id="validation-forms">
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ paddingTop: '5px !important' }}>
            <InputLabel>Define your business problem*</InputLabel>
            <TextField
              id="business_problem"
              name="business_problem"
              placeholder="Please enter your business problem here"
              value={formik.values.business_problem}
              onChange={formik.handleChange}
              error={formik.touched.business_problem && Boolean(formik.errors.business_problem)}
              helperText={formik.touched.business_problem && formik.errors.business_problem}
              fullWidth
              autoComplete="business-problem"
              multiline
              autoFocus
              rows={5}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button variant="contained" sx={{ my: 3, ml: 1 }} type="submit" onClick={() => setErrorIndex(0)}>
                  Next
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ProblemForm;
