import React, {useEffect, useState} from "react";
import {
    Badge,
    Breadcrumb, BreadcrumbItem,
    Card,
    CardBody,
    CardHeader,
    Col, Container,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    Table,
    TabPane
} from "reactstrap";
// sections for this page/view

import classnames from "classnames";
import IndexNavbar from "../components/Navbars/IndexNavbar";
import Pikachu from "../assets/img/Pikachu.png";
import Footer from "../components/Footer/Footer";

export default function Lpokemon(props){
    const [tabs, setTabs] = useState(1);
    const [ Error, setError ] = useState(false)
    const [ PokemonID, setPokemonID ] = useState([])
    const [ PokemonImg, setPokemonImg ] = useState([])
    const [ PokemonAbb, setPokemonAbb ] = useState([])
    const [ PokemonStats, setPokemonStats ] = useState([])
    const [ PokemonTyp, setPokemonTyp ] = useState([])

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const result = await fetch(props.url)
                const json = await result.json()
                setPokemonID(json.name);
                setPokemonImg(json.sprites.other["official-artwork"].front_default);
                setPokemonAbb(json.abilities);
                setPokemonStats(json.stats);
                setPokemonTyp(json.types);
                setError(false)
            } catch (e) {
                console.log(e)
                setError(true)
            }
        }
        fetchPokemon()
    },[props.url])
return Error ? (<><IndexNavbar/>
    <br/><br/><br/><br/>
    <Breadcrumb>
        <BreadcrumbItem><a href="/">Inicio</a></BreadcrumbItem>
        <BreadcrumbItem active>Pokemon</BreadcrumbItem>
    </Breadcrumb>
    <Container className="align-items-center">
        <p className="h1">Listado de Pokemon</p><img src={Pikachu} alt="Logo" className={'Sad'}/><h1
        className={'App'}>No se encuentra lo que buscas</h1></Container>
    <Footer/></>) : (<Col className="ml-auto mr-auto" lg="4" md="6">
    <Card className="card-coin card-plain">
        <CardHeader>
            <img
                alt="..."
                className="img-center img-fluid rounded-circle"
                src={`${PokemonImg}`}
            />
            <h4 className="title justify-content-center">{PokemonID}</h4>
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
                        Type
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
                            {PokemonStats.map((item,index)=> {return (<tr key={index}><td key={index+10}>{item.stat.name}</td><td key={index+20}>{item.base_stat}</td></tr>)})}
                        </tbody>
                    </Table>
                </TabPane>
                <TabPane tabId="tab2" key={PokemonID}>
                    <Row>
                        {PokemonAbb.map((item,index)=> { return (<Col sm="6" key={index+30}><Badge color="primary" pill key={index+40}>{item.ability.name}</Badge></Col>)})}
                    </Row>
                    <Row>
                        {PokemonTyp.map((item,index)=> { return (<Col sm="6" key={index+50}><Badge color="danger" pill key={index+60}>{item.type.name}</Badge></Col>)})}
                    </Row>
                </TabPane>
            </TabContent>
        </CardBody>
    </Card>
</Col>)
}
