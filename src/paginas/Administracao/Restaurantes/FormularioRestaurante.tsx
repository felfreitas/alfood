import {  Box, Button, Container,Paper, TextField,Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";


const FormularioRestaurante = () => {

    const parametros = useParams()
    const [nomeRestaurante, setNomeRestaurante] = useState('')


    useEffect(() => {
        if (parametros.id) {
            http.get(`restaurantes/${parametros.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [parametros])

    const asoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()


        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`,
                {
                    nome: nomeRestaurante
                })
                .then(() => {
                    alert('restaurante atualizado com sucesso')
                })
        } else {



            const dados = { nome: nomeRestaurante }
            http.post('restaurantes/', dados)
                .then(() => {
                    alert('restaurante cadastrado com sucesso')
                })
        }



    }

    return (
        <>

            <Box >
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow:1 }}>
                            <Typography component="h1" variant="h6">
                                Formulário de Restaurantes
                            </Typography>
                            <Box component="form" sx={{width:'100%'}} onSubmit={asoSubmeterForm}>


                                <TextField label="Nome" variant="standard" fullWidth required value={nomeRestaurante} onChange={evento => setNomeRestaurante(evento.target.value)} />

                                <Button type="submit" sx={{ marginTop: 1 }} fullWidth variant="outlined">Enviar</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>


        </>
    )
}


export default FormularioRestaurante;