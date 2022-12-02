import React, { useState, useEffect } from 'react';
import { Card, CardContent, Stack, TextField, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  alignItems: 'center',
  width: '100%',
}));

function ProjectForm() {
  const [name, setName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [date, setDate] = useState(dayjs());
  const [description, setDescription] = useState('');

  function handleChange(e) {
    switch (e.target.id) {
      case 'name':
        setName(e.target.value);

        break;
      case 'description':
        setDescription(e.target.value);
        break;
    }
  }

  function handleDateChange(date) {
    setDate(date);
  }

  function handleSubmit() {
    console.log(
      `Name: ${name}\nProjectName: ${projectName}\nDate: ${date}\nDescription${description}`
    );
  }

  useEffect(() => {
    setProjectName(name.replace(/[^A-Za-z_0-9]/g, '-'));
  }, [name]);

  return (
    <header className="preview">
      <Card>
        <CardContent>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <h2>Project Information</h2>
            <Item>
              <TextField
                id="name"
                label="Name"
                inputProps={{ maxLength: 100 }}
                onChange={handleChange}
                value={name}
                helperText={`Your project name will be ${projectName}`}
                fullWidth
              />
            </Item>
            <Item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Date"
                  inputFormat="MM/DD/YYYY"
                  value={date}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Item>
            <Item>
              <TextField
                id="description"
                label="Description"
                multiline
                rows={5}
                onChange={handleChange}
                value={description}
                fullWidth
              />
            </Item>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </header>
  );
}

export default ProjectForm;
