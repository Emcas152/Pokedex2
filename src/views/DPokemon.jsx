import React, {useEffect, useState} from "react";
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Table,
    TabContent,
    TabPane,
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
import Search from "../assets/img/search.png"


export default function Dpokemon(props) {
    const [tabs, setTabs] = React.useState(1);
    const {id} = props.location.state;
    const Pokemon = id.PokemonID.toString().toLowerCase()
    const [Error, setError] = useState(false)
    const [Loading, setLoading] = useState(true)
    const [PokemonData, setPokemonData] = useState([])
    const [PokemonID, setPokemonID] = useState([])
    const [PokemonImg, setPokemonImg] = useState([])
    const [PokemonAbb, setPokemonAbb] = useState([])
    const [PokemonStats, setPokemonStats] = useState([])
    const [PokemonTyp, setPokemonTyp] = useState([])
    const [PokemonInfo, setPokemonInfo] = useState([])
    const [PokemonEvo, setPokemonEvo] = useState([])
    useEffect(() => {
        let ps = null;
        if (navigator.platform.indexOf("Win") < 0) {
            document.documentElement.className += " perfect-scrollbar-on";
            document.documentElement.classList.remove("perfect-scrollbar-off");
            let tables = document.querySelectorAll(".table-responsive");
            for (let i = 0; i < tables.length; i++) {
                ps = new PerfectScrollbar(tables[i]);
            }
        }
        document.body.classList.toggle("profile-page");
        // Specify how to clean up after this effect:
        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                ps.destroy();
                document.documentElement.className += " perfect-scrollbar-off";
                document.documentElement.classList.remove("perfect-scrollbar-on");
            }
            document.body.classList.toggle("profile-page");
        };
    }, []);
    console.log()
    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon}`)
                const json = await result.json()
                setPokemonData(json);
                setPokemonID(json.name);
                setPokemonImg(json.sprites.other["official-artwork"].front_default);
                setPokemonAbb(json.abilities);
                setPokemonStats(json.stats);
                setPokemonTyp(json.types);
                setLoading(false)
                setError(false)
            } catch (e) {
                console.log(e)
                setLoading(false)
                setError(true)
            }
        }
        fetchPokemon()
    }, [Pokemon])

    useEffect(() => {
        const Info = async () => {
            try {
                const result = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${PokemonID}`)
                const InfoJson = await result.json()
                const descES = await InfoJson.flavor_text_entries.filter((e) => e.language.name === "es").map((e) => e.flavor_text)
                setPokemonInfo(descES)
                setPokemonEvo(InfoJson.evolution_chain.url)
                setLoading(false)
                setError(false)
            } catch (e) {
                console.log(e)
                setLoading(false)
                setError(true)
            }
        }
        setTimeout(() => Info(), 5000)
    }, [PokemonID.length])

    useEffect(() => {
        console.log(PokemonEvo)
        const Evolucion = async () => {
            try {
                const result = await fetch(`${PokemonEvo}`)
                const EvoJson = await result.json()
                const first = EvoJson.chain;
                console.log(EvoJson)
                setLoading(false)
                setError(false)
            } catch (e) {
                console.log(e)
                setLoading(false)
                setError(true)
            }
        }
        setTimeout(() => Evolucion(), 5000)
    }, [PokemonEvo.length])

    return Loading ? (
        <><IndexNavbar/>
            <br/><br/><br/><br/>
            <Breadcrumb>
                <BreadcrumbItem><a href="/">Inicio</a></BreadcrumbItem>
                <BreadcrumbItem><a href="/Pokemon">Pokemon</a></BreadcrumbItem>
                <BreadcrumbItem active>Detalle Pokemon</BreadcrumbItem>
            </Breadcrumb>
            <Container className="align-items-center">
                <p className="h1">Listado de Pokemon</p><img src={pokebola} alt="Logo"
                                                             className={'App-Poke'}/></Container>
            <Footer/></>) : Error ? (<><IndexNavbar/>
        <br/><br/><br/><br/>
        <Breadcrumb>
            <BreadcrumbItem><a href="/">Inicio</a></BreadcrumbItem>
            <BreadcrumbItem><a href="/Pokemon">Pokemon</a></BreadcrumbItem>
            <BreadcrumbItem active>Detalle Pokemon</BreadcrumbItem>
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
                        <BreadcrumbItem><a href="/Pokemon">Pokemon</a></BreadcrumbItem>
                        <BreadcrumbItem active>Detalle Pokemon</BreadcrumbItem>
                    </Breadcrumb>

                    <Container className="align-items-center">
                        <Row>
                            <Col lg="6" md="6">
                                <h1 className="profile-title text-left">{PokemonID}</h1>
                                <h5 className="text-on-back">{PokemonData.id}</h5>
                                <div className="profile-description">
                                    {PokemonInfo.length < 1 ? (<><img src={Search} alt="Logo" className={'Sad'}/><h1
                                        className={'App'}>Buscando
                                        información</h1></>) : (<>{PokemonInfo[Math.floor(Math.random() * PokemonInfo.length)]}</>)}
                                </div>
                            </Col>
                            <Col className="ml-auto mr-auto" lg="4" md="6">
                                <Card className="card-coin card-plain">
                                    <CardHeader>
                                        <img
                                            alt={PokemonID.name}
                                            className="img-center img-fluid rounded-circle"
                                            src={PokemonImg}
                                        />
                                        <h4 className="title">Información</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <Nav
                                            className="nav-tabs-primary justify-content-center"
                                            tabs
                                        >
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({
                                                        active: tabs === 1,
                                                    })}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setTabs(1);
                                                    }}
                                                    href="#pablo"
                                                >
                                                    Stats
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({
                                                        active: tabs === 2,
                                                    })}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setTabs(2);
                                                    }}
                                                    href="#"
                                                >
                                                    Tipos
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({
                                                        active: tabs === 3,
                                                    })}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setTabs(3);
                                                    }}
                                                    href="#"
                                                >
                                                    News
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                        <TabContent
                                            className="tab-subcategories"
                                            activeTab={"tab" + tabs}
                                        >
                                            <TabPane tabId="tab1">
                                                <Table className="tablesorter" responsive>
                                                    <thead className="text-primary" key={2}>
                                                    <tr>
                                                        <th>Habilidad</th>
                                                        <th>Puntuación</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {PokemonStats.map((item, index) => {
                                                        return (<tr key={index}>
                                                            <td key={index + 10}>{item.stat.name}</td>
                                                            <td key={index + 20}>{item.base_stat}</td>
                                                        </tr>)
                                                    })}
                                                    </tbody>
                                                </Table>
                                            </TabPane>
                                            <TabPane tabId="tab2">
                                                <Row>
                                                    {PokemonAbb.map((item, index) => {
                                                        return (<Col sm="6" key={index + 30}><Badge color="primary" pill
                                                                                                    key={index + 40}>{item.ability.name}</Badge></Col>)
                                                    })}
                                                </Row>
                                                <Row>
                                                    {PokemonTyp.map((item, index) => {
                                                        return (<Col sm="6" key={index + 50}><Badge color="danger" pill
                                                                                                    key={index + 60}>{item.type.name}</Badge></Col>)
                                                    })}
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="tab3">
                                                <Table className="tablesorter" responsive>
                                                    <thead className="text-primary">
                                                    <tr>
                                                        <th className="header">Latest Crypto News</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>The Daily: Nexo to Pay on Stable...</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Venezuela Begins Public of Nation...</td>
                                                    </tr>
                                                    <tr>
                                                        <td>PR: BitCanna – Dutch Blockchain...</td>
                                                    </tr>
                                                    </tbody>
                                                </Table>
                                            </TabPane>
                                        </TabContent>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            <br/> <br/> <br/> <br/>
        <Footer/>
    </>
    );
}
