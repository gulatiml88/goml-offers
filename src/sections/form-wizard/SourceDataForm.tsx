// material-ui
import { Button, Autocomplete, Grid, InputLabel, Stack, TextField, Typography, FormHelperText } from '@mui/material';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// project imports
import AnimateButton from 'components/@extended/AnimateButton';
import { wizardData } from 'data/wizardData';

const validationSchema = yup.object({
  primary_data_source: yup.string().required('Primary data source is required').nullable(),
  startDate: yup.string().required('Timeframe start month/year is required').nullable(),
  endDate: yup.string().required('Timeframe end month/year is required').nullable()
});

// ==============================|| VALIDATION WIZARD - SOURCE-DATA ||============================== //

export type SourceData = {
  primary_data_source?: string;
  startDate?: Date;
  endDate?: Date;
  granularity?: string;
  data_quality?: string;
};
interface PaymentFormProps {
  sourceData: SourceData;
  setSourceData: (d: SourceData) => void;
  handleNext: () => void;
  handleBack: () => void;
  setErrorIndex: (i: number | null) => void;
}

export default function SourceDataForm({ sourceData, setSourceData, handleNext, handleBack, setErrorIndex }: PaymentFormProps) {
  const dataSources = wizardData.sourceData;
  const granuralityData = wizardData.granuralityData;
  const qualityData = wizardData.qualityData;

  const formik = useFormik({
    initialValues: {
      primary_data_source: sourceData.primary_data_source || null,
      startDate: sourceData.startDate || null,
      endDate: sourceData.endDate || null,
      granularity: sourceData.granularity || null,
      data_quality: sourceData.data_quality || null
    },
    validationSchema,
    onSubmit: (values) => {
      setSourceData({
        primary_data_source: values.primary_data_source!,
        startDate: values.startDate!,
        endDate: values.endDate!,
        granularity: values.granularity!,
        data_quality: values.data_quality!
      });
      handleNext();
    }
  });

  return (
    <>
      <Typography variant="h5" color="primary" gutterBottom sx={{ mb: 2 }}>
        ABOUT DATA
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={0.5}>
              <InputLabel>Primary Data Source*</InputLabel>
              <Autocomplete
                id="primary_data_source"
                value={formik.values.primary_data_source}
                onChange={(event: any, newValue: string | null) => {
                  formik.setFieldValue('primary_data_source', newValue);
                }}
                options={dataSources}
                renderInput={(params: any) => <TextField name="primary_data_source" {...params} placeholder="Select primary data source" />}
              />
              {formik.touched.primary_data_source && formik.errors.primary_data_source && (
                <FormHelperText error id="helper-text-dataSrc">
                  {formik.errors.primary_data_source}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={0.5}>
              <InputLabel>Timeframes or period of interest within data*</InputLabel>
              <Grid container>
                <Grid item xs={5} className="datePicker">
                  <DatePicker
                    selected={formik.values.startDate}
                    placeholderText="Start date"
                    onChange={(date: any) => formik.setFieldValue('startDate', date)}
                    selectsStart
                    startDate={formik.values.startDate}
                    endDate={formik.values.endDate}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                  />
                </Grid>
                <Grid item xs={5} className="datePicker">
                  <DatePicker
                    selected={formik.values.endDate}
                    placeholderText="End date"
                    onChange={(date: any) => formik.setFieldValue('endDate', date)}
                    selectsEnd
                    startDate={formik.values.startDate}
                    endDate={formik.values.endDate}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                  />
                </Grid>
                <Grid item xs={5}>
                  {formik.touched.startDate && formik.errors.startDate && (
                    <FormHelperText error id="helper-text-timeframe">
                      {formik.errors.startDate}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={5}>
                  {formik.touched.endDate && formik.errors.endDate && (
                    <FormHelperText error id="helper-text-timeframe">
                      {formik.errors.endDate}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={0.5}>
              <InputLabel>Granularity of data</InputLabel>
              <Autocomplete
                id="granularity"
                value={formik.values.granularity}
                onChange={(event: any, newValue: string | null) => {
                  formik.setFieldValue('granularity', newValue);
                }}
                options={granuralityData}
                renderInput={(params: any) => <TextField name="granularity" {...params} placeholder="Select granularity" />}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={0.5}>
              <InputLabel>Quality of data</InputLabel>
              <Autocomplete
                id="data_quality"
                value={formik.values.data_quality}
                onChange={(event: any, newValue: string | null) => {
                  formik.setFieldValue('data_quality', newValue);
                }}
                options={qualityData}
                renderInput={(params: any) => <TextField name="data_quality" {...params} placeholder="Select data_quality" />}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between">
              <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                Back
              </Button>
              <AnimateButton>
                <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }} onClick={() => setErrorIndex(1)}>
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
