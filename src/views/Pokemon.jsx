import React from "react";
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
// sections for this page/view


let ps = null;
export default function Pokemon() {
    const [tabs, setTabs] = React.useState(1);
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
    },[]);
    React.useEffect(() => {
        document.body.classList.toggle("index-page");
        // Specify how to clean up after this effect:
        return function cleanup() {
            document.body.classList.toggle("index-page");
        };
    },[]);


    return (<>
            <IndexNavbar />
        <Container className="align-items-center">
            <Row>
                <Col className="ml-auto mr-auto" lg="4" md="6">
                    <Card className="card-coin card-plain">
                        <CardHeader>
                            <img
                                alt="..."
                                className="img-center img-fluid rounded-circle"
                                src={require("assets/img/mike.jpg").default}
                            />
                            <h4 className="title">Transactions</h4>
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
                                        Wallet
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
            </Row>
        </Container>
        <Footer />
        </>)
}