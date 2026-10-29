import React, { Component } from 'react';
import {
  AppBar, Toolbar, Typography, Container, Paper, Table, TableHead, TableBody,
  TableRow, TableCell, TableContainer, TextField, Button, Box, CircularProgress, Alert
} from '@mui/material';
import './App.css';

const API = 'http://localhost:8000/api/producto/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      recuperado: false,
      descripcion: '',
      precio: '',
      mensaje: ''
    }
  }

  UNSAFE_componentWillMount() {
    this.cargarProductos();
  }

  cargarProductos() {
    fetch(API)
      .then((response) => {
        return response.json()
      })
      .then((prod) => {
        this.setState({
          productos: prod,
          recuperado: true
        })
      })
  }

  // Evento onChange: guarda en el state lo que escribe el usuario
  manejarCambio = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // Evento onSubmit: envía el nuevo producto al servicio Web (POST)
  agregarProducto = (e) => {
    e.preventDefault();
    const nuevo = {
      descripcion: this.state.descripcion,
      precio: parseFloat(this.state.precio)
    };
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo)
    })
      .then((response) => response.json())
      .then((prod) => {
        this.setState({
          productos: [...this.state.productos, prod],
          descripcion: '',
          precio: '',
          mensaje: 'Producto "' + prod.descripcion + '" agregado'
        })
      })
  }

  mostrarFormulario() {
    return (
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Nuevo producto</Typography>
        <Box component="form" onSubmit={this.agregarProducto}
          sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField label="Descripción" name="descripcion" required
            value={this.state.descripcion} onChange={this.manejarCambio} />
          <TextField label="Precio" name="precio" type="number" required
            slotProps={{ htmlInput: { step: '0.01', min: '0' } }}
            value={this.state.precio} onChange={this.manejarCambio} />
          <Button type="submit" variant="contained">Agregar</Button>
        </Box>
        {this.state.mensaje && <Alert severity="success" sx={{ mt: 2 }}>{this.state.mensaje}</Alert>}
      </Paper>
    );
  }

  mostrarTabla() {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell align="right">Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.productos.map(prod => {
              return (
                <TableRow key={prod.codigo}>
                  <TableCell>{prod.codigo}</TableCell>
                  <TableCell>{prod.descripcion}</TableCell>
                  <TableCell align="right">{prod.precio}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Lab 10 - Productos</Typography>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 3 }}>
          {this.mostrarFormulario()}
          {this.state.recuperado
            ? this.mostrarTabla()
            : <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <CircularProgress size={24} /> recuperando datos...
              </Box>}
        </Container>
      </div>
    );
  }
}

export default App;
