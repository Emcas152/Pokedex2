import React, {useEffect, useState} from "react";
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";
import {
Button,
Card,
    CardBody,
    CardHeader,
    Col, Container, FormGroup, FormText, Input,
    Label,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    Table,
    TabPane
} from "reactstrap";
import Lpokemon from "./Lpokemon";
// sections for this page/view


export default function Pokemon() {
    const [ Error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [ Pokemons, setPokemons ] = useState([])
    const [ PokemonID, setPokemonID ] = useState('')
    const [ ListPokemon, setListPokemon ] = useState('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=12')
    const [ Resp, setResp ] = useState('')

    useEffect(() => {
        document.body.classList.toggle("index-page");
        // Specify how to clean up after this effect:
        return function cleanup() {
            document.body.classList.toggle("index-page");
        };
    },[]);
    useEffect(() => {
        setLoading(true)
        async function fetchPokemons(){
            try{
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

    return (<>
        <IndexNavbar />
            <br /><br /><br /><br />
            <Container className="align-items-center">
                <p className="h1">Listado de Pokemon</p>
                <br /><br /><br /><br />
                <Row>
                    {(Pokemons.map((Item) => {
                        return (<Lpokemon url={Item.url} />)
                    }))}
                </Row>
            </Container>
        <Footer />
        </>)
}