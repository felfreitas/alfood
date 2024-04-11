import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";



const FormularioRestaurante = () => {


    const [nomeRestaurante, setNomeRestaurante] = useState('')


    const asoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        const dados ={nome:nomeRestaurante}
        axios.post('http://localhost:8000/api/v2/restaurantes/', dados)
        .then(()=>{
            alert('restaurante cadastrado com sucesso')
        })



    }

    return (
        <form onSubmit={asoSubmeterForm}>


            <TextField label="Nome" variant="standard" value={nomeRestaurante} onChange={evento => setNomeRestaurante(evento.target.value)} />

            <Button type="submit" variant="outlined">Enviar</Button>
        </form>
    )
}


export default FormularioRestaurante;