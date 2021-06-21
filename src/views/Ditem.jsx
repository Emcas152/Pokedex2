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
    TabContent,
    TabPane,
    Container,
    Col,
} from "reactstrap";

// core components
import Pikachu from "../assets/img/Pikachu.png";
import pokebola from "../assets/img/pokebola.png";


export default function DItem(props) {
    const [Value, setValue] = useState('');
    const [tabs, setTabs] = useState(1);
    const {url} = props;
    const [Error, setError] = useState(false)
    const [Loading, setLoading] = useState(true)
    const [ItemData,SetItemData]= useState([])
    const [ItemImg,SetItemImg]= useState([])
    const { onEnd = () => {} } = props;
    const [voices, setVoices] = useState([]);
    const [speaking, setSpeaking] = useState(false);
    const [supported, setSupported] = useState(false);
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
    const getVoices = () => {
        // Firefox seems to have voices upfront and never calls the
        // voiceschanged event
        let voiceOptions = window.speechSynthesis.getVoices();
        processVoices(voiceOptions);
        return;

    };
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setSupported(true);

        }
    }, []);
    const speak = (args = {}) => {
        const { voice = null, text = '', rate = 1, pitch = 1, volume = 1 } = args;
        if (!supported) return;
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
            if (navigator.platform.indexOf("Win") > -1) {
                ps = null;
                document.documentElement.className += " perfect-scrollbar-off";
                document.documentElement.classList.remove("perfect-scrollbar-on");
            }
            document.body.classList.toggle("profile-page");
        };
    }, []);
    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const result = await fetch(`${url}`)
                const json = await result.json()
                const descES = await json.flavor_text_entries.filter((e) => e.language.name === "es").map((e) => e.text)
                SetItemData(json)
                setValue(descES[Math.floor(Math.random() * descES.length)])
                SetItemImg(json.sprites.default)
                setLoading(false)
                setError(false)
                getVoices()
            } catch (e) {
                console.log(e)
                setLoading(false)
                setError(true)
            }
        }
        fetchPokemon()
    }, [url])

    return Loading ? (
        <><Container className="align-items-center">
            <p className="h1">Listado de Pokemon</p><img src={pokebola} alt="Logo"
                                                         className={'App-Poke'}/></Container>
        </>) : Error ? (<><Container className="align-items-center">
        <p className="h1">Listado de Pokemon</p><img src={Pikachu} alt="Logo" className={'Sad'}/><h1>
        className={'App'}>No se encuentra lo que buscas</h1></Container>
    </>) : (<>
            <Col className="ml-auto mr-auto" lg="4" md="6">
                <Card className="card-coin card-plain">
                    <CardHeader>
                        <img
                            alt={ItemData.name}
                            className="img-center img-fluid rounded-circle"
                            src={ItemImg}
                        />
                        <h4 className="title">{ItemData.name}</h4>
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
                                        speak({ text: Value, voice})
                                    }}
                                    href="#"
                                >
                                    Información
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent
                            className="tab-subcategories"
                            activeTab={"tab" + tabs}
                        >
                            <TabPane tabId="tab1">
                                <p color="info">{Value}</p>
                            </TabPane>
                        </TabContent>
                    </CardBody>
                </Card>
            </Col>
        </>

    );
}
