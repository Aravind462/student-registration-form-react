import { useEffect, useState } from 'react';
import './App.css'
import { Box, Button, colors, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';

function App() {
  const [formData,setFormData] = useState({name:'', mobile:'', address:'', email:'', course:'default', dob:'', gender:''})
  const [error,setError] = useState({})

  const handleChange = (e)=>{
    const { name, value } = e.target;
    setFormData({...formData,[name]:value})
  }

  const handleSubmit = ()=>{
    if(validate()){
      alert(`Registration Compeleted Successfully
        Name: ${formData.name}
        Address: ${formData.address}
        Mobile: ${formData.mobile}
        Email: ${formData.email}
        Course: ${formData.course}
        DOB: ${formData.dob}
        Gender: ${formData.gender}
      `)
      handleReset()
    }
  }

  const validate = ()=>{
    let tempError = {}
    const nameRegex = /^[a-zA-Z\s]+$/
    const addressRegex = /^[a-zA-Z0-9\s,.\-#/]+$/
    const mobileRegex = /^[0-9]{10}$/
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

    if (!formData.name || !nameRegex.test(formData.name)) {
      tempError.name = "Please enter a valid name. Only letters and spaces are allowed.";
    }
    if (!formData.address || !addressRegex.test(formData.address)) {
      tempError.address = "Please enter a valid address. Use letters, numbers, spaces, commas, and periods.";
    }
    if (!formData.mobile || !mobileRegex.test(formData.mobile)) {
      tempError.mobile = "Please enter a 10-digit mobile number without spaces or special characters.";
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
      tempError.email = "Please enter a valid email address (e.g., example@domain.com).";
    }
    if (formData.course === "default") {
      tempError.course = "Please select a course from the list.";
    }
    if (!formData.dob) {
      tempError.dob = "Please select your date of birth.";
    }
    if (!formData.gender) {
      tempError.gender = "Please select your gender.";
    }    
    
    setError(tempError)

    return Object.keys(tempError).length === 0
  }

  const handleReset = ()=>{
    setFormData({
      name:"",
      address:"",
      mobile:"",
      email:"",
      course:"default",
      dob:"",
      gender:"",
    })
    setError({})
  }
  
  return (
    <>
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Box my={5}>
          <Typography variant="h4" gutterBottom>Student Registration Form</Typography>
          <Typography variant="body1" color="textSecondary">Please fill in the form below</Typography>
        </Box>
        <FormControl fullWidth>
          <Box mb={3}>
            <TextField error={!!error.name} helperText={error.name} value={formData.name} onChange={handleChange} fullWidth name="name" id="name" label="Name" variant="outlined" />
          </Box>
          <Box mb={3}>
            <TextField error={!!error.address} helperText={error.address} value={formData.address} onChange={handleChange} fullWidth name="address" id="address" label="Address" variant="outlined" />
          </Box>
          <Box mb={3}>
            <TextField error={!!error.mobile} helperText={error.mobile} value={formData.mobile} onChange={handleChange} fullWidth name="mobile" id="mobile" label="Mobile" variant="outlined" />
          </Box>
          <Box mb={3}>
            <TextField error={!!error.email} helperText={error.email} value={formData.email} onChange={handleChange} fullWidth name="email" id="email" label="Email" variant="outlined" />
          </Box>
          <Box mb={3}>
            <TextField error={!!error.course} helperText={error.course} value={formData.course} onChange={handleChange} fullWidth name="course" id="course" label="Course" variant="outlined" select SelectProps={{ native: true }}>
              <option value="default" disabled>Select a Course</option>
              <option value="Biology">Biology</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Humanities">Humanities</option>
            </TextField>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField error={!!error.dob} helperText={error.dob} value={formData.dob} onChange={handleChange} name="dob" label="DOB" variant="outlined" type="date" InputLabelProps={{ shrink: true }} sx={{ flexGrow: 1, mr: 2 }}/>
            <FormControl error={!!error.gender} component="fieldset">
              <FormLabel component="legend" sx={{ textAlign:'left' }}>Gender</FormLabel>
              <RadioGroup value={formData.gender} onChange={handleChange} row aria-labelledby="gender-label" name="gender">
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
              {error.gender && <Typography variant='body2' color='error' sx={{ textAlign:'left' }}>{error.gender}</Typography>}
            </FormControl>
          </Box>
          <Box my={3} display="flex" justifyContent="center" gap={2}>
            <Button onClick={handleSubmit} variant="contained" disableElevation>Submit</Button>
            <Button onClick={handleReset} variant="outlined">Reset</Button>
          </Box>
        </FormControl>
      </Container>
    </>
  )
}

export default App
