import React, {useEffect, useState} from "react";
import {
    Breadcrumb, BreadcrumbItem,
    Container,
    Pagination, PaginationItem, PaginationLink,
    Row,
} from "reactstrap";
// sections for this page/view

import IndexNavbar from "../components/Navbars/IndexNavbar";
import Pikachu from "../assets/img/Pikachu.png";
import Footer from "../components/Footer/Footer";
import DItem from "./Ditem";
import pokebola from "../assets/img/pokebola.png";

export default function Items(props){
    const [ Error, setError ] = useState(false)
    const [ ItemsData, setItemsData ] = useState(false)
    const [Loading, setLoading] = useState(true)
    const [ ItemID, setItemID ] = useState([])
    const [ Url, setUrl ] = useState('https://pokeapi.co/api/v2/item/')



    useEffect(() => {
        setLoading(true)
        const fetchPokemon = async () => {
            try {
                const result = await fetch(`${Url}`)
                const json = await result.json()
                setItemsData(json)
                const Items = json.results
                setItemID(Items);
                setLoading(false)
                setError(false)
            } catch (e) {
                console.log(e)
                setError(true)
                setLoading(false)
            }
        }
        fetchPokemon()
    },[Url])

    return Loading ? (
        <><IndexNavbar/>
            <br/><br/><br/><br/>
            <Breadcrumb>
                <BreadcrumbItem><a href="/">Inicio</a></BreadcrumbItem>
                <BreadcrumbItem active>Items</BreadcrumbItem>
            </Breadcrumb>
            <Container className="align-items-center">
                <p className="h1">Listado de Items</p><img src={pokebola} alt="Logo"
                                                             className={'App-Poke'}/></Container>
            <Footer/></>) : Error ? (<><IndexNavbar/>
        <br/><br/><br/><br/>
        <Breadcrumb>
            <BreadcrumbItem><a href="/">Inicio</a></BreadcrumbItem>
            <BreadcrumbItem active>Items</BreadcrumbItem>
        </Breadcrumb>
        <Container className="align-items-center">
            <p className="h1">Listado de Items</p><img src={Pikachu} alt="Logo" className={'Sad'}/><h1
            className={'App'}>No se encuentra lo que buscas</h1></Container>
        <Footer/></>) : (<>
        <IndexNavbar/>
        <br/><br/><br/><br/><Breadcrumb>
        <BreadcrumbItem><a href="/">Inicio</a></BreadcrumbItem>
        <BreadcrumbItem active>Items</BreadcrumbItem>
    </Breadcrumb>
        <Container className="align-items-center">
            <p className="h1">Listado de Items</p>
            <Row>
                <Pagination>
                    <PaginationItem>
                        <PaginationLink onClick={() => {
                            setUrl(ItemsData.previous)
                        }}>
                            Anteriores
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink onClick={() => {
                            setUrl(ItemsData.next)
                        }}>
                            Siguientes
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
            </Row>
            <br/><br/><br/><br/>
            <Row>
                {(ItemID.map((Item, index) => {
                    return (<DItem url={Item.url} key={index}/>)
                }))}
            </Row>
        </Container>
        <Footer/>
    </>)
}
