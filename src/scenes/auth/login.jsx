import React from 'react';
import { Box, Typography,  Card, CardContent,
  FormControl,
  Button,
  Input
 } from '@mui/material';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import configURL from '../../config';



function CenteredComponent() {

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues : {
      username : '',
      password : ''
    },
    validationSchema: Yup.object({
      username : Yup.mixed().required('Ingrese el nombre del usuario'),
      password : Yup.mixed().required('Ingre la contraseña del usuario')
    }),
    onSubmit: (values) => {

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      fetch(configURL.apiBaseUrl+"/Usuarios/Login", {
        method: "POST",
        body : JSON.stringify({
          "correo" : values.username,
          "password" : values.password
        }),
        headers: myHeaders
      })
      .then((response) => response.text())
      .then((result) => {
        console.log(typeof result );
        console.log(result);
        localStorage.setItem('user', result);
        navigate('/home')
      })
      .catch((error) => console.error(error));

    }

  })
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh" // Para centrar verticalmente en toda la altura de la vista
      bgcolor="background.paper" // Puedes cambiar el color de fondo si lo deseas
    >
        <Card sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: 2 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Iniciar Sesión
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <FormControl error={formik.touched.username && Boolean(formik.errors.username)} fullWidth>

            <Input id='username' 
            name='username' 
            type='text'
            placeholder='usuario@host.com'
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ m: 2}}
            />
          </FormControl>

          <FormControl error={formik.touched.password && Boolean(formik.errors.password)} fullWidth >

            <Input
              id="password"
              name="password"
              type="password"
              placeholder='Contraseña'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ m: 2}}
            />
          </FormControl>

          <Button  sx={{ mt: 3 }} type="submit" variant="contained" color='success' fullWidth>
            Enviar 
          </Button>
        </form>
      </CardContent>
    </Card>

    </Box>
  );
}

export default CenteredComponent;
