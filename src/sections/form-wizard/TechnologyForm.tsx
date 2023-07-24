// material-ui
import { Button, Autocomplete, Grid, InputLabel, Stack, TextField, Typography, FormHelperText } from '@mui/material';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';

// project imports
import AnimateButton from 'components/@extended/AnimateButton';
import { wizardData } from 'data/wizardData';

const validationSchema = yup.object({
  technology_preferance: yup.string().required('Technology preference is required').nullable(),
  scalability: yup.string().required('Scalability and performance is required'),
  hosting_ml_solutions: yup.string().required('Technology preference is required').nullable()
});

// ==============================|| VALIDATION WIZARD - TECHNOLOGY ||============================== //

export type TechData = { technology_preferance?: string; scalability?: string; hosting_ml_solutions?: string };
interface TechFormProps {
  techData: TechData;
  setTechData: (d: TechData) => void;
  handleNext: () => void;
  handleBack: () => void;
  setErrorIndex: (i: number | null) => void;
}

export default function TechnologyForm({ techData, setTechData, handleNext, handleBack, setErrorIndex }: TechFormProps) {
  const techPrefList = wizardData.techPrefList;
  const hostingPrefList = wizardData.hostingPrefList;

  const formik = useFormik({
    initialValues: {
      technology_preferance: techData.technology_preferance || null,
      scalability: techData.scalability || '',
      hosting_ml_solutions: techData.hosting_ml_solutions || null
    },
    validationSchema,
    onSubmit: (values) => {
      setTechData({
        technology_preferance: values.technology_preferance!,
        scalability: values.scalability,
        hosting_ml_solutions: values.hosting_ml_solutions!
      });
      handleNext();
    }
  });

  return (
    <>
      <Typography variant="h5" color="primary" gutterBottom sx={{ mb: 2 }}>
        ABOUT TECHNOLOGY
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={0.5}>
              <InputLabel>Technology Preference*</InputLabel>
              <Autocomplete
                id="technology_preferance"
                value={formik.values.technology_preferance}
                onChange={(event: any, newValue: string | null) => {
                  formik.setFieldValue('technology_preferance', newValue);
                }}
                options={techPrefList}
                renderInput={(params: any) => (
                  <TextField name="technology_preferance" {...params} placeholder="Select technology preference" />
                )}
              />
              {formik.touched.technology_preferance && formik.errors.technology_preferance && (
                <FormHelperText error id="helper-text-dataSrc">
                  {formik.errors.technology_preferance}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={0.5}>
              <InputLabel>Scalability and Performance you are looking for*</InputLabel>
              <TextField
                id="scalability"
                name="scalability"
                placeholder="Enter average number request per timeframe"
                value={formik.values.scalability}
                onChange={formik.handleChange}
                error={formik.touched.scalability && Boolean(formik.errors.scalability)}
                helperText={formik.touched.scalability && formik.errors.scalability}
                fullWidth
                autoComplete="scalable-performance"
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={0.5}>
              <InputLabel>Hosting Preference*</InputLabel>
              <Autocomplete
                id="hosting_ml_solutions"
                value={formik.values.hosting_ml_solutions}
                onChange={(event: any, newValue: string | null) => {
                  formik.setFieldValue('hosting_ml_solutions', newValue);
                }}
                options={hostingPrefList}
                renderInput={(params: any) => <TextField name="hosting_ml_solutions" {...params} placeholder="Select hosting preference" />}
              />
              {formik.touched.hosting_ml_solutions && formik.errors.hosting_ml_solutions && (
                <FormHelperText error id="helper-text-dataSrc">
                  {formik.errors.hosting_ml_solutions}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between">
              <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                Back
              </Button>
              <AnimateButton>
                <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }} onClick={() => setErrorIndex(3)}>
                  Next
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
