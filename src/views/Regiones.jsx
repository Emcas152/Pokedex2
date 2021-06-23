import React, {useEffect, useState} from "react";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardImg,
    CardTitle,
    Container,
    Row,
    Col, Breadcrumb, BreadcrumbItem,
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";
import pokebola from "../assets/img/pokebola.png";
import Pikachu from "../assets/img/Pikachu.png";
import {Link} from "react-router-dom";

export default function Regiones() {
    const [squares1to6, setSquares1to6] = useState("");
    const [squares7and8, setSquares7and8] = useState("");
    const [Error, setError] = useState(false)
    const [Loading, setLoading] = useState(true)
    const [Regiones, setRegiones] = useState([])
    React.useEffect(() => {
        document.body.classList.toggle("register-page");
        document.documentElement.addEventListener("mousemove", followCursor);
        // Specify how to clean up after this effect:
        return function cleanup() {
            document.body.classList.toggle("register-page");
            document.documentElement.removeEventListener("mousemove", followCursor);
        };
    }, []);
    const followCursor = (event) => {
        let posX = event.clientX - window.innerWidth / 2;
        let posY = event.clientY - window.innerWidth / 6;
        setSquares1to6(
            "perspective(500px) rotateY(" +
            posX * 0.05 +
            "deg) rotateX(" +
            posY * -0.05 +
            "deg)"
        );
        setSquares7and8(
            "perspective(500px) rotateY(" +
            posX * 0.02 +
            "deg) rotateX(" +
            posY * -0.02 +
            "deg)"
        );
    };

    useEffect(() => {
        async function fetchRegiones() {
            try {
                const regiones = await fetch(`https://pokeapi.co/api/v2/region/`)
                const response = await regiones.json();
                setRegiones(response.results)
                setLoading(false)
                setError(false)
            } catch (e) {
                setLoading(false)
                setError(true)
            }
        }

        setTimeout(() => fetchRegiones(), 3000);
    }, [])

    return Loading ? (
        <>
            <IndexNavbar/>
            <br/><br/><br/><br/>
            <Breadcrumb>
                <BreadcrumbItem><a href="/">Inicio</a></BreadcrumbItem>
                <BreadcrumbItem active>Regiones</BreadcrumbItem>
            </Breadcrumb>
            <Container className="align-items-center">
                <p className="h1">Listado de Pokemon</p><img src={pokebola} alt="Logo"
                                                             className={'App-Poke'}/></Container>
            <Footer/></>) : Error ? (<><IndexNavbar/>
        <br/><br/><br/><br/>
        <Breadcrumb>
            <BreadcrumbItem><a href="/">Inicio</a></BreadcrumbItem>
            <BreadcrumbItem active>Regiones</BreadcrumbItem>
        </Breadcrumb>
        <Container className="align-items-center">
            <p className="h1">Listado de Regiones</p><img src={Pikachu} alt="Logo" className={'Sad'}/><h1
            className={'App'}>No se encuentra lo que buscas</h1></Container>
        <Footer/></>) : (
        <>
        <IndexNavbar/>
        <br/><br/><br/><br/>
        <Breadcrumb>
            <BreadcrumbItem><a href="/">Inicio</a></BreadcrumbItem>
            <BreadcrumbItem active>Regiones</BreadcrumbItem>
        </Breadcrumb>
        <Container className="align-items-center">
            <p className="h1">Listado de Regiones</p>
            <Row>
                {Regiones.map((item, index) => {
                    return (
                        <Col className="ml-auto mr-auto" lg="4" md="6" key={index}>
                            <div
                                className="square square-7"
                                id="square7"
                                style={{transform: squares7and8}}
                            />
                            <div
                                className="square square-8"
                                id="square8"
                                style={{transform: squares7and8}}
                            />
                            <Card className="card-register">
                                <CardHeader>
                                    <CardImg
                                        alt={item.name}
                                        src={require(`assets/img/${item.name}.png`).default}
                                    />
                                    <CardTitle tag="h4">{item.name}</CardTitle>
                                </CardHeader>
                                <CardBody>

                                </CardBody>
                                <CardFooter>
                                    <Link to={{
                                        pathname: "/Detalles-Region",
                                        state: {id: item.name}
                                    }}><Button className="btn-round" color="primary" size="lg">
                                        Ver mas
                                    </Button></Link>
                                </CardFooter>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
            <div className="register-bg"/>
            <div
                className="square square-1"
                id="square1"
                style={{transform: squares1to6}}
            />
            <div
                className="square square-2"
                id="square2"
                style={{transform: squares1to6}}
            />
            <div
                className="square square-3"
                id="square3"
                style={{transform: squares1to6}}
            />
            <div
                className="square square-4"
                id="square4"
                style={{transform: squares1to6}}
            />
            <div
                className="square square-5"
                id="square5"
                style={{transform: squares1to6}}
            />
            <div
                className="square square-6"
                id="square6"
                style={{transform: squares1to6}}
            />
        </Container>
    <Footer/>
</>
)
}
