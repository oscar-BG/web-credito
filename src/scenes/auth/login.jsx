import React from 'react';
import { Box, Typography, TextField, Card, CardContent } from '@mui/material';

function CenteredComponent() {
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

        <TextField
          fullWidth
          variant="filled"
          type="email"
          label="Email"
          name="email"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="password"
          label="Contraseña"
          name="password"
          sx={{ mb: 2 }}
        />
      </CardContent>
    </Card>

    </Box>
  );
}

export default CenteredComponent;
