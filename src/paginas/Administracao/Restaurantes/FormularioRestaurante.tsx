import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



const FormularioRestaurante = () => {

    const parametros = useParams()
    const [nomeRestaurante, setNomeRestaurante] = useState('')


    useEffect(() => {
        if (parametros.id) {
            axios.get(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [parametros])

    const asoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()


        if (parametros.id) {
            axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`,
                {
                    nome: nomeRestaurante
                })
                .then(() => {
                    alert('restaurante atualizado com sucesso')
                })
        } else {



            const dados = { nome: nomeRestaurante }
            axios.post('http://localhost:8000/api/v2/restaurantes/', dados)
                .then(() => {
                    alert('restaurante cadastrado com sucesso')
                })
        }



    }

    return (
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Typography component="h1" variant="h6">
                Formulário de Restaurantes
            </Typography>
            <Box component="form" onSubmit={asoSubmeterForm}>


                <TextField label="Nome" variant="standard"  fullWidth required value={nomeRestaurante} onChange={evento => setNomeRestaurante(evento.target.value)} />

                <Button type="submit" sx={{marginTop:1}}  fullWidth variant="outlined">Enviar</Button>
            </Box>
        </Box>
    )
}


export default FormularioRestaurante;