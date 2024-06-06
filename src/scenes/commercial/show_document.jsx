import { useState } from "react";
import { useTheme, Box, Grid, Button, Modal, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header"
import { tokens } from "../../theme";
import axios from 'axios';
import FormData from 'form-data';
import { mockDataDocumentPersonFisica } from "../../data/mockData";
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import Rotate90DegreesCcwOutlinedIcon from '@mui/icons-material/Rotate90DegreesCcwOutlined';
import Rotate90DegreesCwOutlinedIcon from '@mui/icons-material/Rotate90DegreesCwOutlined';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ShowDocument = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);
    const columns = [
        {field: "name", headerName : "Documentos", flex : 1},
        {field: "upload", headerName: "Acción",
            renderCell: ({row: {upload}}) => {
                return (
                    <Button onClick={handleOpenModal}>
                        <BackupOutlinedIcon></BackupOutlinedIcon>
                    </Button>
                );
            }
        }
    ];

    // Formulario
    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');
    const [field4, setField4] = useState('');
    const [field5, setField5] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        let data = new FormData();
        data.append(
          'data',
          JSON.stringify({
            NewIndex: {
              values: [
                { FieldID: 'field1', FieldValue: field1 },
                { FieldID: 'field2', FieldValue: field2 },
                { FieldID: 'field4', FieldValue: field4 },
                { FieldID: 'field5', FieldValue: field5 },
              ],
            },
          })
        );
    
        if (file) {
          data.append('bin', file);
        }
    
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://52.1.16.20/AppEnhancerReST/api/AXDataSources/Tester/AXDocs/3',
          headers: {
            'Authorization': 'Basic c3lzb3A6eHNjbQ==',
          },
          data: data,
        };
    
        try {
          const response = await axios.request(config);
          console.log(JSON.stringify(response.data));
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <Box m="20px">
            <Header title="Comercial" subtitle="Administración de documentos" />


            <Modal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                        Field 1:
                        <input type="text" value={field1} onChange={(e) => setField1(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                        Field 2:
                        <input type="text" value={field2} onChange={(e) => setField2(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                        Field 4:
                        <input type="text" value={field4} onChange={(e) => setField4(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                        Field 5:
                        <input type="text" value={field5} onChange={(e) => setField5(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                        File:
                        <input type="file" onChange={handleFileChange} />
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                    </form>
                </Box>
            </Modal>

            <Box sx={{ flexGrow: 1, padding: 1}}>
                <Grid container spacing={2}> 
                    <Grid item xs={12} md={6}>
                        <Box
                            m="40px 0 150px 0"
                            height="75vh"
                            sx={{
                                "& .MuiDataGrid-root": {
                                border: "none",
                                },
                                "& .MuiDataGrid-cell": {
                                borderBottom: "none",
                                },
                                "& .name-column--cell": {
                                color: colors.greenAccent[300],
                                },
                                "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: colors.blueAccent[700],
                                borderBottom: "none",
                                },
                                "& .MuiDataGrid-virtualScroller": {
                                backgroundColor: colors.primary[400],
                                },
                                "& .MuiDataGrid-footerContainer": {
                                borderTop: "none",
                                backgroundColor: colors.blueAccent[700],
                                },
                                "& .MuiCheckbox-root": {
                                color: `${colors.greenAccent[200]} !important`,
                                },
                                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                color: `${colors.grey[100]} !important`,
                                },
                            }}
                        >
                            <DataGrid  rows={mockDataDocumentPersonFisica} columns={columns} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            width="100%"
                            height="75vh"
                        >
                            <Box display="flex" justifyContent="center" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    <AddOutlinedIcon></AddOutlinedIcon>
                                </Button>
                                <Button type="submit" color="secondary" variant="contained">
                                    <RemoveOutlinedIcon></RemoveOutlinedIcon>
                                </Button>
                                <Button type="submit" color="secondary" variant="contained">
                                    <Rotate90DegreesCcwOutlinedIcon></Rotate90DegreesCcwOutlinedIcon>
                                </Button>
                                <Button type="submit" color="secondary" variant="contained">
                                    <Rotate90DegreesCwOutlinedIcon></Rotate90DegreesCwOutlinedIcon>
                                </Button>
                            </Box>

                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default ShowDocument;