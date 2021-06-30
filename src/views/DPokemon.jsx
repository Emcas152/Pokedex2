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
    const {onEnd = () => {}} = props;
    const [voices, setVoices] = useState([]);
    const [speaking, setSpeaking] = useState(false);
    const [supported, setSupported] = useState(false);
    const [ EvoData, setEvoData ] = useState([])
    const [tabs, setTabs] = React.useState(1);
    const [Value, setValue] = useState('');
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
    const [PokemonEvo, setPokemonEvo] = useState('')
    const voice = voices[5] || null;

    useEffect(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            setSupported(true);
        }
    }, []);
    const handleEnd = () => {
        setSpeaking(false);
        onEnd();
    };
    const processVoices = (voiceOptions) => {
        setVoices(voiceOptions);
    };
    useEffect(() => {
        const getVoices = async () => {
            // Firefox seems to have voices upfront and never calls the
            // voiceschanged event
            let voiceOptions = window.speechSynthesis.getVoices();
            processVoices(voiceOptions);
            return;

        }
        getVoices()
    }, []);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setSupported(true);
            setSpeaking(true);

        }
    }, []);
    const speak = (args = {}) => {
        const {voice = null, text = '', rate = 1, pitch = 1, volume = 1} = args;
        if (!supported && !speaking) return;
        // Firefox won't repeat an utterance that has been
        // spoken, so we need to create a new instance each time
        const utterance = new window.SpeechSynthesisUtterance();
        utterance.text = text;
        utterance.voice = voice;
        utterance.onend = handleEnd;
        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.volume = volume;
        window.speechSynthesis.speak(utterance);
    };

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
            if (navigator.platform.indexOf("Win") > 1) {
                ps.destroy();
                document.documentElement.className += " perfect-scrollbar-off";
                document.documentElement.classList.remove("perfect-scrollbar-on");
            }
            document.body.classList.toggle("profile-page");
        };
    }, []);
    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon}`)
                const json = await result.json()
                setPokemonData(json);
                if (json.name.includes('-')){
                    const name = json.name.split("-")
                    setPokemonID(name[0]);
                } else {
                    setPokemonID(json.name)
                }
                setPokemonAbb(json.abilities);
                setPokemonImg(json.sprites.other["official-artwork"].front_default);
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
                setValue(descES[Math.floor(Math.random() * descES.length)])
                setLoading(false)
                setError(false)
            } catch (e) {
                console.log(e)
                setLoading(false)
                setError(true)
            }
        }
        setTimeout(() => Info(), 3000)
    }, [PokemonID])


    useEffect(() => {
        const evoChain = []
        const Evoluciones = async () => {
            try {
                const result = await fetch(PokemonEvo);
                const json = await result.json();
                const stractIdToUrl = (url) => {
                    const urlToArray = url.split('/')
                    return urlToArray[6]
                }
                console.log(json)
                evoChain.push({
                    Nombre: json.chain.species.name,
                    min_level: !json ? 1 : json.chain.min_level,
                    item: !json ? null : json.item,
                    id: parseInt(stractIdToUrl(json.chain.species.url)),
                    Image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${parseInt(stractIdToUrl(json.chain.species.url))}.png`,
                })
                json.chain.evolves_to.map(({ evolution_details: [{ min_level: minLevel }], species, evolution_details: [{ trigger }], evolution_details: [{ item }], evolves_to: evolvesTo }) => {
                    evolvesTo.map(({ evolution_details: [{ min_level: minLevel }], species, evolution_details: [{ trigger }], evolution_details: [{ item }] }) => (
                        evoChain.push({
                            Nombre: species.name,
                            min_level: minLevel,
                            trigger_name: trigger.name,
                            item: item,
                            id: parseInt(stractIdToUrl(species.url)),
                            Image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${parseInt(stractIdToUrl(item.species.url))}.png`,
                        })
                    ))
                    return evoChain.push({
                        Nombre: species.name,
                        min_level: minLevel,
                        trigger_name: trigger.name,
                        item: item,
                        id: parseInt(stractIdToUrl(species.url)),
                        Image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${parseInt(stractIdToUrl(item.species.url))}.png`,
                    })
                })
                //return evoChain.sort((x, y) => x.id - y.id)
                setEvoData(evoChain)
            } catch (e) {
                console.log(e)
                setLoading(false)
                setError(true)
            }
        }
        console.log(evoChain)
        Evoluciones()
    }, [PokemonEvo])

    return Loading ? (
        <><IndexNavbar/>
            <br/><br/><br/><br/>
            <Breadcrumb>
                <BreadcrumbItem><a href="/">Inicio</a></BreadcrumbItem>
                <BreadcrumbItem><a href="/Pokemon">Pokemon</a></BreadcrumbItem>
                <BreadcrumbItem active>Detalle Pokemon</BreadcrumbItem>
            </Breadcrumb>
            <Container className="align-items-center">
                <p className="h1">Detalle Pokemon</p><img src={pokebola} alt="Logo"
                                                             className={'App-Poke'}/></Container>
            <Footer/></>) : Error ? (<><IndexNavbar/>
        <br/><br/><br/><br/>
        <Breadcrumb>
            <BreadcrumbItem><a href="/">Inicio</a></BreadcrumbItem>
            <BreadcrumbItem><a href="/Pokemon">Pokemon</a></BreadcrumbItem>
            <BreadcrumbItem active>Detalle Pokemon</BreadcrumbItem>
        </Breadcrumb>
        <Container className="align-items-center">
            <p className="h1">Detalle Pokemon</p><img src={Pikachu} alt="Logo" className={'Sad'}/><h1
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
                                <h5 className="text-on-back"
                                    onClick={() => speak({text: Value, voice})}>{PokemonData.id}</h5>
                                <div className="profile-description">
                                    {PokemonInfo.length < 1 ? (<><img src={Search} alt="Logo" className={'Sad'}/><h1
                                        className={'App'}>Buscando
                                        información</h1></>) : (<>{Value}</>)}
                                </div>
                            </Col>
                            <Col className="ml-auto mr-auto" lg="4" md="6">
                                <Card className="card-coin card-plain">
                                    <CardHeader>
                                        <img
                                            alt={PokemonID.name}
                                            className="img-center img-fluid rounded-circle icon"
                                            src={PokemonImg}
                                        />
                                        <h4 className="title">Información</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <Nav
                                            className="nav-tabs-primary justify-content-left"
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
                                                    href="#"
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
                                        </Nav>
                                        <hr/>
                                        <br/><br/>
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
                                                            <td key={item.stat.name}>{item.stat.name}</td>
                                                            <td key={item.base_stat}>{item.base_stat}</td>
                                                        </tr>)
                                                    })}
                                                    </tbody>
                                                </Table>
                                            </TabPane>
                                            <TabPane tabId="tab2" key={PokemonID.name}>
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
                                        </TabContent>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            <div className="section">
                <Container key={"Evolutions"}>
                    <Row>{console.log(EvoData)}
                        {EvoData.map((item, index) => {
                            console.log(item.Nombre)
                            return (
                                <Col key={item.Nombre}>
                                    <h1 className="profile-title text-left" key={`${item.Nombre}${index}`}>{item.Nombre}</h1>
                                    <h5 className="text-on-back">{item.id}</h5>
                                    <Card className="card-coin card-plain" key={index}>
                                    <CardHeader>
                                        <img
                                            alt={item.Nombre}
                                            className="img-center img-fluid rounded-circle"
                                            src={item.Image}
                                        />
                                    </CardHeader>
                                </Card>
                                </Col>)
                        })}
                    </Row>
                </Container>
            </div>
            <br/> <br/> <br/> <br/>
            <Footer/>

        </>

    );
}