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
  keyPerformance: yup.string().required('Key performance indicator is required').nullable()
});

// ==============================|| VALIDATION WIZARD - KPI ||============================== //

export type KPIData = { keyPerformance?: string };
interface KPIFormProps {
  kpiData: KPIData;
  setKPIData: (d: KPIData) => void;
  handleSubmit: (d: string) => void;
  handleBack: () => void;
  setErrorIndex: (i: number | null) => void;
}

export default function KPIForm({ kpiData, setKPIData, handleSubmit, handleBack, setErrorIndex }: KPIFormProps) {
  const kpiList = wizardData.kpiList;

  const formik = useFormik({
    initialValues: {
      keyPerformance: kpiData.keyPerformance || null
    },
    validationSchema,
    onSubmit: (values) => {
      setKPIData({
        keyPerformance: values.keyPerformance!
      });
      handleSubmit(values.keyPerformance!);
    }
  });

  return (
    <>
      <Typography variant="h5" color="primary" gutterBottom sx={{ mb: 2 }}>
        ABOUT KPI
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={0.5}>
              <InputLabel>Key performance indicator*</InputLabel>
              <Autocomplete
                id="keyPerformance"
                value={formik.values.keyPerformance}
                onChange={(event: any, newValue: string | null) => {
                  formik.setFieldValue('keyPerformance', newValue);
                }}
                options={kpiList}
                renderInput={(params: any) => <TextField name="keyPerformance" {...params} placeholder="Select performance indicator" />}
              />
              {formik.touched.keyPerformance && formik.errors.keyPerformance && (
                <FormHelperText error id="helper-text-dataSrc">
                  {formik.errors.keyPerformance}
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
                <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }} onClick={() => setErrorIndex(4)}>
                  Submit
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
