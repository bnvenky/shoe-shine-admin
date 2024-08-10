import { useState, useEffect } from 'react';
import axios from 'axios';
import { Accordion, AccordionSummary, AccordionDetails, TextField, MenuItem, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ServicePage = () => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [expanded, setExpanded] = useState(false);

  // Fetch data from API
  useEffect(() => {
    axios.get('https://mrv1.indianwelfarefoundation.org.in/servicesall')
      .then(response => {
        setServiceRequests(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="bg-slate-50  p-6 space-y-6">
      {/* Create New Request Button */}
      <div className="flex justify-between">
        <Button variant="contained" color="primary">Create New Request</Button>
        <div className="space-x-4">
          <Button variant="outlined" color="secondary">Booking Request</Button>
          <Button variant="outlined" color="secondary">Call Back Request</Button>
        </div>
      </div>

      {/* Accordion for Service Requests */}
      <div>
        {serviceRequests.map((request, index) => (
          <Accordion key={request.id} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div className="flex justify-between w-full">
                <Typography>Service ID: {request.id}</Typography>
                <Typography>Service Item: {request.serviceItem}</Typography>
                <Typography>Status: {request.status}</Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <form className="space-y-4">
                <TextField fullWidth label="Person's Name" variant="outlined" defaultValue={request.assignedPersonName} />
                <TextField fullWidth type="date" label="Date" variant="outlined" defaultValue={request.serviceDate} InputLabelProps={{ shrink: true }} />
                <TextField fullWidth type="time" label="Time" variant="outlined" defaultValue={request.serviceTime} InputLabelProps={{ shrink: true }} />
                <TextField fullWidth label="Location" variant="outlined" defaultValue={request.serviceLocation} />
                <TextField fullWidth label="Service Type" variant="outlined" defaultValue={request.serviceType} />
                <TextField fullWidth label="Service Person Name" variant="outlined" defaultValue={request.assignedPersonName} />
                <TextField fullWidth label="Service Person Mobile Number" variant="outlined" defaultValue={request.assignedPersonMobile} />
                <TextField
                  select
                  label="Status of the Request"
                  fullWidth
                  variant="outlined"
                  defaultValue={request.status}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in_progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </TextField>
                <Button variant="contained" color="primary">Update State</Button>
              </form>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>

      {/* Call Back Request Form */}
      <div className="p-4 bg-gray-100 rounded shadow-md">
        <Typography variant="h6">Call Back Request</Typography>
        <form className="space-y-4">
          <TextField fullWidth label="Person's Name" variant="outlined" />
          <TextField fullWidth label="Person's Mobile Number" variant="outlined" />
          <TextField fullWidth type="time" label="Time of Call Back" variant="outlined" InputLabelProps={{ shrink: true }} />
          <Button variant="contained" color="primary">Request Call Back</Button>
        </form>
      </div>
    </div>
  );
};

export default ServicePage;
