import { Avatar, Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React from 'react'
import Header from '../Components/Header'
import { Form, Formik } from 'formik'
import { useRef } from 'react'
import { useState } from 'react'
import { getDatabase } from "firebase/database"
import { getDownloadURL, ref as ref_storage, uploadBytesResumable } from 'firebase/storage'
import { storage } from "../firebase"
import * as yup from "yup"
import { toast } from 'react-toastify'


const AddCandidate = () => {

  const initialValues = {
    candid_name: "",
    candid_section: "",
    candid_pos: "",
    candid_party:"",
    candid_slogan: ""
  };


  const formikRef = useRef(null)
  const [position, setPosition] = useState("");
  const [image, setImage] = useState("https://www.pngall.com/wp-content/uploads/2/Upload-Transparent.png")
  const db = getDatabase();

  const validation = yup.object().shape({
    candid_name: yup.string().required("This field is required"),
    candid_section: yup.string().required("This field is required"),
    candid_pos: yup.string().required("This field is required"),
    candid_party: yup.string().required("This field is required"),
    candid_slogan: yup.string().required("This field is required"),
  })

 const addCandidate = (balyus) =>{
    console.log(balyus)
 }

 const uploadImage = (nakuha) => {
    toast.info("File uploading...");
    const uploadImage = () => {
      const storageRef = ref_storage(storage, `Candidate Images/${new Date().getFullYear()}/${nakuha.candid_name}`);
      const uploadTask = uploadBytesResumable(storageRef, nakuha);
      uploadTask.on("state_changed", () => {
      }, (error) => {
        toast.error(error)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          toast.success("File uploaded successfully!");
          setImage(downloadUrl)
        })
      })
    }
    uploadImage();
 }

 const handleRadioChange = (pangyayari) =>{
  setPosition(pangyayari.target.value);
 }


  return (
    <Box m="20px">
      <Header title="ADD CANDIDATE" subtitle="This sections allows you to add and edit candidate details for various positions"/>
    
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={addCandidate}
        >

        {({values, errors, touched, handleBlur, handleChange}) =>(
          <Form>
            <Box display="flex" justifyContent="center" m="20px">
                 <input 
                    type="file"
                    style={{display: "none"}}
                    id = "imageUpload"
                    accept="image/*"
                    onChange={(e) => uploadImage(e.target.files[0])}
                  />
                  {/* UPLOAD IMAGE LAYOUT */}
               <Avatar
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    height: "30%",
                    width: "30%",
                    cursor: "pointer"
                  }} 
                  alt="candid-image"
                  src= {image}
                  onClick = {() => {
                    document.getElementById("imageUpload").click();
                  }}  
                />
            </Box>
               {/*TEXT FIELDS  */}
              <Box display="flex" justifyContent="start" m="20px">
                <TextField
                   variant="filled"
                   fullWidth
                   type="text"
                   value={values.candid_name}
                   onBlur={handleBlur}
                   onChange={handleChange}
                   label="Candidate Name"
                   name="candid_name"
                   error={!!touched.candid_name && !!errors.candid_name}
                   helperText={touched.candid_name && errors.candid_name}
                   sx={{maxWidth: "50%", marginRight:"15px"}}/>

                 <TextField
                   variant="filled"
                   fullWidth
                   type="text"
                   value={values.candid_section}
                   onBlur={handleBlur}
                   onChange={handleChange}
                   label="Candidate Section"
                   name="candid_section"
                   error={!!touched.candid_section && !!errors.candid_section}
                   helperText={touched.candid_section && errors.candid_section}
                   sx={{maxWidth: "50%", marginRight:"15px"}}/>
              </Box>
              <Box display="flex" justifyContent="start" m="20px">
                  <TextField
                      variant="filled"
                      fullWidth
                      type="text"
                      value={values.candid_party}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Candidate's Partylist"
                      name="candid_party"
                      error={!!touched.candid_party && !!errors.candid_party}
                      helperText={touched.candid_party && errors.candid_party}
                      sx={{maxWidth: "50%", marginRight:"15px"}}/>

                  <TextField
                      variant="filled"
                      fullWidth
                      type="text"
                      value={values.candid_slogan}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Candidate's Slogan"
                      name="candid_slogan"
                      error={!!touched.candid_slogan && !!errors.candid_slogan}
                      helperText={touched.candid_slogan && errors.candid_slogan}
                      sx={{maxWidth: "50%", marginRight:"15px"}}/>
              </Box>

                  {/* RADIO BUTTONS FOR POSITION */}
              <Box display="flex" justifyContent="center" m="20px">
              <FormControl>
                      <FormLabel id="positon-category" color="success" >Position chosen</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="position-category"
                            name="mga-posisyon"
                            value={position}
                            onChange={handleRadioChange}>

                          <FormControlLabel value="President" control={<Radio color="reddish"/>} label="President"/>
                          <FormControlLabel value="Vice President" control={<Radio color="reddish"/>} label="Vice President"/>
                          <FormControlLabel value="Secretary" control={<Radio color="reddish"/>} label="Secretary"/>
                          <FormControlLabel value="Treasurer" control={<Radio color="reddish"/>} label="Treasurer"/>
                          <FormControlLabel value="Auditor" control={<Radio color="reddish"/>} label="Auditor"/>
                          <FormControlLabel value="Public Information Officer" control={<Radio color="reddish"/>} label="Public Information Officer"/>
                          <FormControlLabel value="Peacekeepers" control={<Radio color="reddish"/>} label="Peacekeepers"/>

                        </RadioGroup>
                  </FormControl>    
              </Box>
              <Box display="flex" justifyContent="center" m="20px">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => addCandidate(values)}>
                      Add Candidate to Database
                    </Button>
                  <Button
                    variant="contained"
                    color="neutral"
                    sx={{ml: "20px"}}
                    onClick={() => addCandidate(values)}>
                      Update Candidate Information
                    </Button>
              </Box>
          </Form>
        )}
        </Formik>
    </Box>
  )
}

export default AddCandidate