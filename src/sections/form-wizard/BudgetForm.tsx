// material-ui
import { Button, Autocomplete, Grid, InputLabel, Stack, TextField, Typography, FormHelperText } from '@mui/material';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';

// project imports
import AnimateButton from 'components/@extended/AnimateButton';
import { wizardData } from 'data/wizardData';
import './wizard.css';

const validationSchema = yup.object({
  key_stakeholders: yup.string().required('Key stakeholder is required').nullable(),
  budget: yup.string().required('Budget is required').nullable()
});

// ==============================|| VALIDATION WIZARD - STAKEHOLDER_BUDGET ||============================== //

export type BudgetData = { key_stakeholders?: string; number_of_stakeholders?: string; budget?: string };
interface BudgetFormProps {
  budgetData: BudgetData;
  setBudgetData: (d: BudgetData) => void;
  handleNext: () => void;
  handleBack: () => void;
  setErrorIndex: (i: number | null) => void;
}

export default function BudgetForm({ budgetData, setBudgetData, handleNext, handleBack, setErrorIndex }: BudgetFormProps) {
  const stakeholders = wizardData.stakeholders;
  const budgetTypes = wizardData.budgetTypes;

  const formik = useFormik({
    initialValues: {
      key_stakeholders: budgetData.key_stakeholders || null,
      number_of_stakeholders: budgetData.number_of_stakeholders || '',
      budget: budgetData.budget || null
    },
    validationSchema,
    onSubmit: (values) => {
      setBudgetData({
        key_stakeholders: values.key_stakeholders!,
        number_of_stakeholders: values.number_of_stakeholders,
        budget: values.budget!
      });
      handleNext();
    }
  });

  return (
    <>
      <Typography variant="h5" color="primary" gutterBottom sx={{ mb: 2 }}>
        ABOUT STAKEHOLDERS AND BUDGET
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={0.5}>
              <InputLabel>Key Stakeholder*</InputLabel>
              <Autocomplete
                id="primaryDataSrc"
                value={formik.values.key_stakeholders}
                onChange={(event: any, newValue: string | null) => {
                  formik.setFieldValue('key_stakeholders', newValue);
                }}
                options={stakeholders}
                renderInput={(params: any) => <TextField name="primaryDataSrc" {...params} placeholder="Select key stakeholder" />}
              />
              {formik.touched.key_stakeholders && formik.errors.key_stakeholders && (
                <FormHelperText error id="helper-text-dataSrc">
                  {formik.errors.key_stakeholders}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={0.5}>
              <InputLabel>Number of stakeholders</InputLabel>
              <TextField
                id="number_of_stakeholders"
                name="number_of_stakeholders"
                placeholder="Enter number of stakeholders"
                value={formik.values.number_of_stakeholders}
                onChange={formik.handleChange}
                fullWidth
                autoComplete="no-of-stakeholders"
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={0.5}>
              <InputLabel>Budget you are looking for*</InputLabel>
              <Autocomplete
                id="budget"
                value={formik.values.budget}
                onChange={(event: any, newValue: string | null) => {
                  formik.setFieldValue('budget', newValue);
                }}
                options={budgetTypes}
                renderInput={(params: any) => <TextField name="budget" {...params} placeholder="Select budget" />}
              />
              {formik.touched.budget && formik.errors.budget && (
                <FormHelperText error id="helper-text-dataSrc">
                  {formik.errors.budget}
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
                <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }} onClick={() => setErrorIndex(2)}>
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
