import React, {useEffect, useState} from "react";
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Label,
    FormGroup,
    Form,
    Input,
    FormText,
    NavItem,
    NavLink,
    Nav,
    Table,
    TabContent,
    TabPane,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
    UncontrolledCarousel, Breadcrumb, BreadcrumbItem,
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";
import Pikachu from "../assets/img/Pikachu.png";
import pokebola from "../assets/img/pokebola.png";

const carouselItems = [
    {
        src: require("assets/img/denys.jpg").default,
        altText: "Slide 1",
        caption: "Big City Life, United States",
    },
    {
        src: require("assets/img/fabien-bazanegue.jpg").default,
        altText: "Slide 2",
        caption: "Somewhere Beyond, United States",
    },
    {
        src: require("assets/img/mark-finn.jpg").default,
        altText: "Slide 3",
        caption: "Stocks, United States",
    },
];

let ps = null;
export default function Dpokemon(props) {
    const [tabs, setTabs] = React.useState(1);
    const {id}  = props.location.state;
    const  Pokemon = id.PokemonID.toString().toLowerCase()
    const [Error, setError] = useState(false)
    const [Loading, setLoading] = useState(true)
    const [PokemonData, setPokemonData] = useState([])
    const [PokemonID, setPokemonID] = useState([])
    const [PokemonImg, setPokemonImg] = useState([])
    const [PokemonAbb, setPokemonAbb] = useState([])
    const [PokemonStats, setPokemonStats] = useState([])
    const [PokemonTyp, setPokemonTyp] = useState([])
    const [PokemonInfo, setPokemonInfo] = useState([])
    //const info = PokemonInfo.find( text => text.languaje === "es" )
    React.useEffect(() => {
        if (navigator.platform.indexOf("Win") > -1) {
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
            console.log(descES)
            setLoading(false)
            setError(false)
        } catch (e) {
            console.log(e)
            setLoading(false)
            setError(true)
        }
    }
        setTimeout(() =>Info(),5000)
}, [PokemonID])
    //console.log(info)
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
            <BreadcrumbItem style={{zIndex:'9'}} ><a href="/" style={{zIndex:'9'}}>Inicio</a></BreadcrumbItem>
            <BreadcrumbItem style={{zIndex:'9'}}><a href="/Pokemon" style={{zIndex:'9'}}>Pokemon</a></BreadcrumbItem>
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
                                <p className="profile-description">
                                    {PokemonInfo[Math.floor(Math.random()*PokemonInfo.length)]}
                                </p>
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
                                                    href="#pablo"
                                                >
                                                    Send
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
                                                    href="#pablo"
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
                                                    <thead className="text-primary">
                                                    <tr>
                                                        <th>Habilidad</th>
                                                        <th>Puntuación</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {PokemonStats.map((item,index)=> {return (<><tr key={index}><td key={index}>{item.stat.name}</td><td key={index}>{item.base_stat}</td></tr></>)})}
                                                    </tbody>
                                                </Table>
                                            </TabPane>
                                            <TabPane tabId="tab2">
                                                <Row>
                                                    <Label sm="3">Pay to</Label>
                                                    <Col sm="9">
                                                        <FormGroup>
                                                            <Input
                                                                placeholder="e.g. 1Nasd92348hU984353hfid"
                                                                type="text"
                                                            />
                                                            <FormText color="default" tag="span">
                                                                Please enter a valid address.
                                                            </FormText>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Label sm="3">Amount</Label>
                                                    <Col sm="9">
                                                        <FormGroup>
                                                            <Input placeholder="1.587" type="text"/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Button
                                                    className="btn-simple btn-icon btn-round float-right"
                                                    color="primary"
                                                    type="submit"
                                                >
                                                    <i className="tim-icons icon-send"/>
                                                </Button>
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
            <br /> <br /> <br /> <br />
                <Footer/>
            </div>
        </>
    );
}
