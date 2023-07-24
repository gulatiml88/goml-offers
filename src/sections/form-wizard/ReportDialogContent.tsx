import { Fragment, useState } from 'react';

// material-ui
import { Button, DialogActions, DialogContent, DialogTitle, Grid, Stack, InputLabel, TextField } from '@mui/material';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { GoMLReportService } from '_api/services/goml-report.service';
import Loader from 'components/Loader';

const ReportDialogContent = (props: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const getReport = async () => {
    if (name.length && email.length && company.length) {
      if (email.match(/^\S+@\S+\.\S+$/)) {
        setShowLoader(true);
        const orgResponse = await GoMLReportService.addOrganization(company);
        const userDTO = {
          org_id: orgResponse.data.id,
          name: name,
          email_id: email
        };
        const userResp = await GoMLReportService.addUser(userDTO);
        const reportDTO = {
          question_id: props.questionID,
          org_id: orgResponse.data.id,
          user_id: userResp.data.id,
          email_id: email
        };
        await GoMLReportService.sendReport(reportDTO);
        props.onClose({ message: 'Report sent to your email successfully!' });

        setShowLoader(false);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        props.onError({ message: 'Please enter valid email' });
      }
    } else {
      props.onError({ message: 'Please enter all required fields' });
    }
  };

  return (
    <Fragment>
      {showLoader && <Loader />}
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item>
          <DialogTitle color="primary">Please fill below inputs to generate report</DialogTitle>
        </Grid>
      </Grid>
      <DialogContent dividers>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel>Name*</InputLabel>
              <TextField
                onChange={(ev) => {
                  setName(ev.target.value);
                }}
                value={name}
                fullWidth
                placeholder="Enter name"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel>Email*</InputLabel>
              <TextField
                onChange={(ev) => {
                  setEmail(ev.target.value);
                }}
                value={email}
                fullWidth
                placeholder="Enter email"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel>Company Name*</InputLabel>
              <TextField
                onChange={(ev) => {
                  setCompany(ev.target.value);
                }}
                value={company}
                fullWidth
                placeholder="Enter company name"
              />
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ m: 1 }}>
        <AnimateButton>
          <Button
            onClick={getReport}
            variant="outlined"
            sx={{
              ':hover': {
                bgcolor: 'primary.main', // theme.palette.primary.main
                color: 'white'
              }
            }}
          >
            Get Report
          </Button>
        </AnimateButton>
      </DialogActions>
    </Fragment>
  );
};

export default ReportDialogContent;
