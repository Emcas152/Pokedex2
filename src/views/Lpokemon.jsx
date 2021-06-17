import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,  FormGroup, FormText, Input,
    Label,
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

export default function Lpokemon(props){
    const [tabs, setTabs] = useState(1);
    const [ Error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [ PokemonID, setPokemonID ] = useState([])
    const [ PokemonImg, setPokemonImg ] = useState([])
    const [ PokemonAbb, setPokemonAbb ] = useState([])
    const [ PokemonTyp, setPokemonTyp ] = useState([])

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const result = await fetch(props.url)
                const json = await result.json()
                setPokemonID(json.name);
                setPokemonImg(json.sprites.other["official-artwork"].front_default);
                setPokemonAbb(json.abilities);
                setPokemonTyp(json.types)
                setLoading(false);
                setError(false)
            } catch (e) {
                console.log(e)
                setLoading(false)
                setError(true)
            }
        }
        fetchPokemon()
    },[props.url])
return <Col className="ml-auto mr-auto" lg="4" md="6">
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
                            <th className="header">COIN</th>
                            <th className="header">AMOUNT</th>
                            <th className="header">VALUE</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>BTC</td>
                            <td>7.342</td>
                            <td>48,870.75 USD</td>
                        </tr>
                        <tr>
                            <td>ETH</td>
                            <td>30.737</td>
                            <td>64,53.30 USD</td>
                        </tr>
                        <tr>
                            <td>XRP</td>
                            <td>19.242</td>
                            <td>18,354.96 USD</td>
                        </tr>
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
                                <Input placeholder="1.587" type="text" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button
                        className="btn-simple btn-icon btn-round float-right"
                        color="primary"
                        type="submit"
                    >
                        <i className="tim-icons icon-send" />
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
}
