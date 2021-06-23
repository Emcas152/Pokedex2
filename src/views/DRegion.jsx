import React, {useEffect, useState} from "react";
// javascript plugin used to create scrollbars on windows
// reactstrap components
import {
    Container,
    Row,
    Col,
    Breadcrumb, BreadcrumbItem, Badge,
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";
import Pikachu from "../assets/img/Pikachu.png";
import pokebola from "../assets/img/pokebola.png";


export default function DRegion(props) {
    const id = props.location.state.id
    const [ Error, setError ] = useState(false)
    const [ Loading, setLoading ] = useState(true)
    const [ CiudadID, setCiudadID ] = useState([])
    const Colores = ['primary','info','success','danger','warning','default']
    useEffect(() => {
        const fetchDetalleRegion = async () => {
            try {
                const result = await fetch(`https://pokeapi.co/api/v2/region/${id}`)
                const json = await result.json()
                console.log(json)
                setCiudadID(json.locations);
                setLoading(false);
                setError(false)
            } catch (e) {
                console.log(e)
                setLoading(false)
                setError(true)
            }
        }
        setTimeout(() => fetchDetalleRegion(), 3000);
        /*clearTimeout(timer);*/
    },[id])
    return Loading ? (
        <><IndexNavbar/>
            <br/><br/><br/><br/>
            <Breadcrumb>
                <BreadcrumbItem><a href="/">Inicio</a></BreadcrumbItem>
                <BreadcrumbItem><a href="/Region">Regiones</a></BreadcrumbItem>
                <BreadcrumbItem active>Detalle Region</BreadcrumbItem>
            </Breadcrumb>
            <Container className="align-items-center">
                <p className="h1">Listado de Pokemon</p><img src={pokebola} alt="Logo"
                                                             className={'App-Poke'}/></Container>
            <Footer/></>) : Error ? (<><IndexNavbar/>
        <br/><br/><br/><br/>
        <Breadcrumb>
            <BreadcrumbItem><a href="/">Inicio</a></BreadcrumbItem>
            <BreadcrumbItem><a href="/Region">Regiones</a></BreadcrumbItem>
            <BreadcrumbItem active>Detalle Region</BreadcrumbItem>
        </Breadcrumb>
        <Container className="align-items-center">
            <p className="h1">Listado de Pokemon</p><img src={Pikachu} alt="Logo" className={'Sad'}/><h1
            className={'App'}>No se encuentra lo que buscas</h1></Container>
        <Footer/></>) : (
        <>
            <IndexNavbar/>
            <div className="wrapper">
                <div className="page-header">
                    <img
                        alt="..."
                        className="dots"
                        src={require("assets/img/dots.png").default}
                    />
                    <img
                        alt="..."
                        className="path"
                        src={require("assets/img/path4.png").default}
                    />
                    <br/><br/><br/><br/><br/><br/>
                    <Breadcrumb>
                        <BreadcrumbItem><a href="/">Inicio</a></BreadcrumbItem>
                        <BreadcrumbItem><a href="/Region">Regiones</a></BreadcrumbItem>
                        <BreadcrumbItem active>Detalle Region</BreadcrumbItem>
                    </Breadcrumb>

                    <Container className="align-items-center">
                        <p className="h1">Listado de Ciudades</p>
                        <Row>

                                {CiudadID.map((item,index)=>{
                                    return (<Col lg="2" md="2"><Badge color={Colores[Math.floor(Math.random() * Colores.length)]}>{item.name}</Badge></Col>)
                                })
                                }

                        </Row>
                    </Container>
                </div>
            </div>
            <footer />
            </>

            )
            }