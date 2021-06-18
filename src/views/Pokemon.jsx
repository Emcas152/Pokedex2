import React, {useEffect, useState} from "react";
// javascript plugin used to create scrollbars on windows
// reactstrap components
// custom css
import "./../assets/css/Customcss.css"
// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";
import {
    Breadcrumb,
    BreadcrumbItem, Button,
    Container,
    Form,
    FormGroup, Input,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row
} from "reactstrap";
import Lpokemon from "./Lpokemon";
// sections for this page/view
import pokebola from "./../assets/img/pokebola.png"
import Pikachu from "./../assets/img/Pikachu.png"
import {Link} from "react-router-dom";

export default function Pokemon() {
    const [Error, setError] = useState(false)
    const [Loading, setLoading] = useState(true)
    const [Pokemons, setPokemons] = useState([])
    const [PokemonID, setPokemonID] = useState('')
    const [ListPokemon, setListPokemon] = useState('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=12')
    const [Resp, setResp] = useState('')

    useEffect(() => {
        document.body.classList.toggle("index-page");
        return function cleanup() {
            document.body.classList.toggle("index-page");
        };
    }, []);
    useEffect(() => {
        setLoading(true)
        async function fetchPokemons() {
            try {
                const Pokemon = await fetch(`${ListPokemon}`)
                const response = await Pokemon.json();
                setResp(response)
                setPokemons(response.results)
                setLoading(false)
                setError(false)
            } catch (e) {
                setLoading(false)
                setError(true)
            }
        }

        setTimeout(() => fetchPokemons(), 3000);
    }, [ListPokemon])

    return Loading ? (
        <><IndexNavbar/>
            <br/><br/><br/><br/>
            <Breadcrumb>
                <BreadcrumbItem><a href="/">Inicio</a></BreadcrumbItem>
                <BreadcrumbItem active>Pokemon</BreadcrumbItem>
            </Breadcrumb>
            <Container className="align-items-center">
                <p className="h1">Listado de Pokemon</p><img src={pokebola} alt="Logo"
                                                             className={'App-Poke'}/></Container>
            <Footer/></>) : Error ? (<><IndexNavbar/>
        <br/><br/><br/><br/>
        <Breadcrumb>
            <BreadcrumbItem><a href="/">Inicio</a></BreadcrumbItem>
            <BreadcrumbItem active>Pokemon</BreadcrumbItem>
        </Breadcrumb>
        <Container className="align-items-center">
            <p className="h1">Listado de Pokemon</p><img src={Pikachu} alt="Logo" className={'Sad'}/><h1
            className={'App'}>No se encuentra lo que buscas</h1></Container>
        <Footer/></>) : (<>
        <IndexNavbar/>
        <br/><br/><br/><br/><Breadcrumb>
        <BreadcrumbItem><a href="/">Inicio</a></BreadcrumbItem>
        <BreadcrumbItem active>Pokemon</BreadcrumbItem>
    </Breadcrumb>
        <Container className="align-items-center">
            <p className="h1">Listado de Pokemon</p>
            <Row>
                <Pagination>
                    <PaginationItem>
                        <PaginationLink onClick={() => {
                            setListPokemon(Resp.previous)
                        }}>
                            Anteriores
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink onClick={() => {
                            setListPokemon(Resp.next)
                        }}>
                            Siguientes
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
                <Form className="form-inline ml-auto">
                    <FormGroup className="no-border">
                        <Input placeholder="Search" type="text" onChange={event => setPokemonID(event.target.value)}/>
                        <Link to={{
                            pathname: "/Detalles-Pokemon",
                            state: { id: {PokemonID} }
                        }} ><Button color="primary" size="sm"><i className="tim-icons icon-badge"></i></Button></Link>
                    </FormGroup>
                </Form>
            </Row>
            <br/><br/><br/><br/>
            <Row>
                {(Pokemons.map((Item, index) => {
                    return (<Lpokemon url={Item.url} key={index}/>)
                }))}
            </Row>
        </Container>
        <Footer/>
    </>)
}