import { useState, ReactNode } from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import { Button, Step, Stepper, StepLabel, Stack, Typography, Grid, Dialog, AlertColor, Divider, Card } from '@mui/material';

// project imports
import ProblemForm, { ProblemData } from './ProblemForm';
import SourceDataForm, { SourceData } from './SourceDataForm';
import BudgetForm, { BudgetData } from './BudgetForm';
import TechnologyForm, { TechData } from './TechnologyForm';
import KPIForm, { KPIData } from './KPIForm';

import AnimateButton from 'components/@extended/AnimateButton';
import { PopupTransition } from 'components/@extended/Transitions';
import { openSnackbar } from 'store/reducers/snackbar';
import ReportDialogContent from './ReportDialogContent';
import Loader from 'components/Loader';
import { GoMLReportService } from '_api/services/goml-report.service';

// assets
import mainLogo from 'assets/images/goml-logo.png';

// step options
const steps = ['Problem', 'Data', 'Stakeholders and Budget', 'Technology', 'KPI'];

const getStepContent = (
  step: number,
  handleNext: () => void,
  handleSubmit: (d: string) => void,
  handleBack: () => void,
  setErrorIndex: (i: number | null) => void,
  problemData: ProblemData,
  setProblemData: (d: ProblemData) => void,
  sourceData: SourceData,
  setSourceData: (d: SourceData) => void,
  budgetData: BudgetData,
  setBudgetData: (d: BudgetData) => void,
  techData: TechData,
  setTechData: (d: TechData) => void,
  kpiData: KPIData,
  setKPIData: (d: KPIData) => void
) => {
  switch (step) {
    case 0:
      return (
        <ProblemForm handleNext={handleNext} setErrorIndex={setErrorIndex} problemData={problemData} setProblemData={setProblemData} />
      );
    case 1:
      return (
        <SourceDataForm
          handleNext={handleNext}
          handleBack={handleBack}
          setErrorIndex={setErrorIndex}
          sourceData={sourceData}
          setSourceData={setSourceData}
        />
      );
    case 2:
      return (
        <BudgetForm
          handleNext={handleNext}
          handleBack={handleBack}
          setErrorIndex={setErrorIndex}
          budgetData={budgetData}
          setBudgetData={setBudgetData}
        />
      );
    case 3:
      return (
        <TechnologyForm
          handleNext={handleNext}
          handleBack={handleBack}
          setErrorIndex={setErrorIndex}
          techData={techData}
          setTechData={setTechData}
        />
      );
    case 4:
      return (
        <KPIForm
          handleSubmit={handleSubmit}
          handleBack={handleBack}
          setErrorIndex={setErrorIndex}
          kpiData={kpiData}
          setKPIData={setKPIData}
        />
      );
    default:
      throw new Error('Unknown step');
  }
};

// ==============================|| FORMS WIZARD - VALIDATION ||============================== //

const FormWizard = () => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [problemData, setProblemData] = useState<any>({});
  const [sourceData, setSourceData] = useState<any>({});
  const [budgetData, setBudgetData] = useState<any>({});
  const [techData, setTechData] = useState<any>({});
  const [kpiData, setKPIData] = useState<any>({});
  const [errorIndex, setErrorIndex] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [questionID, setQuestionID] = useState<number>();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setErrorIndex(null);
  };

  const getTimeFrame = () => {
    return sourceData.startDate.getFullYear() + '-' + sourceData.endDate.getFullYear();
  };

  const getQuestionsDTO = (kpi: string) => {
    return {
      question: {
        primary_data_source: sourceData.primary_data_source,
        granularity: sourceData.granularity,
        timeframe: getTimeFrame(),
        data_quality: sourceData.data_quality,
        key_stakeholders: budgetData.key_stakeholders,
        number_of_stakeholders: Number(budgetData.number_of_stakeholders),
        budget: budgetData.budget,
        technology_preferance: techData.technology_preferance,
        scalability: Number(techData.scalability),
        hosting_ml_solutions: techData.hosting_ml_solutions,
        kpi: kpi
      },
      business_problem: problemData.business_problem
    };
  };

  const handleSubmit = async (data: string) => {
    setErrorIndex(null);
    setShowLoader(true);
    try {
      const questionsDTO = getQuestionsDTO(data);
      console.log(questionsDTO);
      const response = await GoMLReportService.submitQuestions(questionsDTO);
      setQuestionID(response.data.id);
      setShowLoader(false);
    } catch (error) {
      console.log(error);
    }
    showNotification('Form is submitted successfully!', 'success');
    handleOpenDialog();
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleClose = (event: any, reason: string) => {
    if (reason && reason === 'backdropClick') {
      return;
    }
    handleCloseDialog(event);
  };

  const handleCloseDialog = (event: any) => {
    if (event?.message) {
      showNotification(event.message, 'success');
    }
    setOpenDialog(false);
  };

  const showError = (event: any) => {
    showNotification(event.message, 'error');
  };

  const showNotification = (message: string, message_type: AlertColor) => {
    dispatch(
      openSnackbar({
        open: true,
        message: message,
        variant: 'alert',
        alert: {
          color: message_type
        },
        close: true
      })
    );
  };

  const handleOpenDialog = async () => {
    setOpenDialog(true);
  };

  return (
    <Card sx={{ p: 0, borderRadius: 0 }}>
      {showLoader && <Loader />}
      <Grid container sx={{ bgcolor: '#6043a2', p: 1 }}>
        <Grid item xs={2} sx={{ bgColor: '#fff', p: 0 }}>
          <img alt="goml-logo" aria-label="goML-mainLogo" src={mainLogo} style={{ height: '100%', width: '90%' }} />
        </Grid>
        <Grid item xs={10} color="white" display="flex" alignItems="center" sx={{ p: 0 }}>
          <Typography variant="h5">
            {'Enterprise ML Adoption Guide - Detailed guide to define the right ML strategy in <5 minutes'}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mb: 2 }} />
      <Stepper activeStep={activeStep} sx={{ p: 4 }}>
        {steps.map((label, index) => {
          const labelProps: { error?: boolean; optional?: ReactNode } = {};

          if (index === errorIndex) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Error
              </Typography>
            );

            labelProps.error = true;
          }

          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order confirmation, and will send you an update when your order has
              shipped.
            </Typography>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setProblemData({});
                    setSourceData({});
                    setBudgetData({});
                    setTechData({});
                    setKPIData({});
                    setActiveStep(0);
                  }}
                  sx={{ my: 3, ml: 1 }}
                >
                  Reset
                </Button>
              </AnimateButton>
            </Stack>
          </>
        ) : (
          <Grid item sx={{ p: 4 }}>
            {getStepContent(
              activeStep,
              handleNext,
              handleSubmit,
              handleBack,
              setErrorIndex,
              problemData,
              setProblemData,
              sourceData,
              setSourceData,
              budgetData,
              setBudgetData,
              techData,
              setTechData,
              kpiData,
              setKPIData
            )}
            {/*activeStep === steps.length - 1 && (
              <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <AnimateButton>
                  <Button variant="contained" onClick={handleNext} sx={{ my: 3, ml: 1 }}>
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                </AnimateButton>
              </Stack>
            )*/}
          </Grid>
        )}
      </>
      <Grid item xs={12}>
        <Dialog
          open={openDialog}
          onClose={handleClose}
          TransitionComponent={PopupTransition}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <ReportDialogContent questionID={questionID} onError={showError} onClose={handleCloseDialog} />
        </Dialog>
      </Grid>
    </Card>
  );
};

export default FormWizard;
