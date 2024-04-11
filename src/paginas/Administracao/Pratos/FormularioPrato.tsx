import { Box, Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";


const FormularioPrato = () => {

    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tag, setTag] = useState('')
    const [restaurante, setRestaurante] = useState('')
    const [imagem, setImagem] = useState<File | null>(null)

    const [tags, setTags] = useState<ITag[]>([])
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setImagem(evento.target.files[0])
        } else {
            setImagem(null)
        }

    }

    useEffect(() => {
        http.get<{ tags: ITag[] }>(`tags/`)
            .then(resposta => setTags(resposta.data.tags))

        http.get<IRestaurante[]>(`restaurantes/`)
            .then(resposta => setRestaurantes(resposta.data))

    }, [])


    const asoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        const formData = new FormData();

        formData.append('nome', nomePrato);
        formData.append('descricao', descricao);
        formData.append('tag', tag);
        formData.append('restaurante', restaurante);
        if (imagem) { 
            formData.append('imagem', imagem);
        }

        console.log(formData);
        
        // http.request({
        //     url:'pratos/',
        //     method:'POST',
        //     headers:{
        //         'Content-Type':'multipart/form-data'
        //     },
        //     data: formData
        // })
        // .then( ()=>alert("Prato cadastrado com sucesso"))
        // .catch(erro=>console.log(erro));
        

    }

    return (
        <>

            <Box >
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
                            <Typography component="h1" variant="h6">
                                Formulário de Pratos
                            </Typography>
                            <Box component="form" sx={{ width: '100%' }} onSubmit={asoSubmeterForm}>


                                <TextField label="Nome do Prato" variant="standard" fullWidth
                                    margin="dense" required value={nomePrato} onChange={evento => setNomePrato(evento.target.value)} />

                                <TextField label="Descrição do Prato" variant="standard" fullWidth margin="dense" required value={descricao} onChange={evento => setDescricao(evento.target.value)} />

                                <FormControl margin="dense" fullWidth >
                                    <InputLabel id='select-tag'>Tag</InputLabel>
                                    <Select labelId="select-tag" value={tag} onChange={(evento) => setTag(evento.target.value)}>
                                        {
                                            tags.map(tag => <MenuItem key={tag.id} value={tag.value}>{tag.value}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl margin="dense" fullWidth >
                                    <InputLabel id='select-tag'>Restaurantes</InputLabel>
                                    <Select labelId="select-tag" value={restaurante} onChange={(evento) => setRestaurante(evento.target.value)}>
                                        {
                                            restaurantes.map(rest => <MenuItem key={rest.id} value={rest.id}>{rest.nome}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                                <input type="file" onChange={selecionarArquivo} />

                                <Button type="submit" sx={{ marginTop: 1 }} fullWidth variant="outlined">Enviar</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>


        </>
    )
}


export default FormularioPrato;